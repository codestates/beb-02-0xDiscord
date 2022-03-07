from fastapi import FastAPI
from route.board import router
from fastapi.middleware.cors import CORSMiddleware
from fastapi_utils.tasks import repeat_every
from web3 import Web3

import json, os, time
from datetime import datetime
from urllib.request import urlopen

from config.db import conn
from models.model import reward_t, reward_address


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SECRET_FILE = os.path.join(BASE_DIR, "config", "web3_secrets_tmp.json")
SECRET_FILE_JSON = json.loads(open(SECRET_FILE).read())
SECRET_FILE_WEB3 = SECRET_FILE_JSON["web3"]


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.on_event("startup")
@repeat_every(seconds=60*30)
async def reward_provide() -> None:

    timestamp = time.time()
    cal = timestamp + 60 * 30

    today = datetime.today().strftime("%Y%m%d")
    today_bool = conn.execute(reward_t.select().where(reward_t.columns.today ==today)).fetchall()

    if today_bool :
        conn.execute(reward_t.
                update().
                where(today==today).
                values(rewardEndTime=cal)
                ).fetchall()
        
    else:
        conn.execute(reward_t.insert().values(today=today, rewardEndTime=cal)).fetchall()



    add_array = conn.execute(reward_address.select()).fetchall()
    url = f"https://api-ropsten.etherscan.io/api?module=contract&action=getabi&address={SECRET_FILE_WEB3['CONTRACT_ADDRESS']}&apikey={SECRET_FILE_WEB3['ROSTEN_API_TOKEN_KEY']}"

    res = urlopen(url)
    res_m = res.read().decode('utf-8')

    data = json.loads(res_m)
    abi = data.get('result')


    add_array = conn.execute(reward_address.select()).fetchall()
    address_ar = []
    for i in add_array:
        address_ar.append(i[1])



    w3 = Web3(Web3.HTTPProvider(SECRET_FILE_WEB3['END_POINT']))

    smartContact = w3.toChecksumAddress(f"{SECRET_FILE_WEB3['CONTRACT_ADDRESS']}")
    myContract = w3.eth.contract(address=smartContact, abi=abi)

    nonce = w3.eth.getTransactionCount(SECRET_FILE_WEB3['CONTRACT_OWNER_ADDRESS'])
    tx = myContract.functions.multiTransferToken(address_ar).buildTransaction({
    'from': SECRET_FILE_WEB3["CONTRACT_OWNER_ADDRESS"],
    'nonce': nonce,
    'chainId': 3,
        })
    # a = myContract.encodeABI(fn_name='multiTransferToken', args=[testAddresse])
    signed = w3.eth.account.sign_transaction(tx, SECRET_FILE_WEB3['PRIVATE_KEY'])
    txn_hash = w3.eth.send_raw_transaction(signed.rawTransaction)
    txn_receipt = w3.eth.wait_for_transaction_receipt(txn_hash)
    conn.execute(reward_address.delete()).fetchall()
