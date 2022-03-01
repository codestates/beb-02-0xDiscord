import sys
from datetime import datetime


sys.path.append('..')
sys.path.append('.')

from fastapi import Depends, APIRouter, HTTPException
from config.db import conn
from models.model import users, statis, client
from pydantic import BaseModel
from web3_token import Web3Token

class Board_add_item(BaseModel):
    etherAddress: str
    title: str
    content: str
    token: str


class Item(BaseModel):
    name: str
    price: float

class Client(BaseModel):
    etherAdd: str


router = APIRouter()
today = ""
rest_today = ""

@router.get('/api/v0.1/board/more/{item_id}')
async def board_read_item(item_id: int):
    return conn.execute(
            users.select().where(
                users.columns.id > item_id,
                users.columns.id < item_id+10)).fetchall()

@router.get('/api/v.0.1/board')
async def borad_get():




    return conn.execute(
            users.
            select().
            order_by(users.columns.id.desc()).
            limit(20)
            ).fetchall()

@router.post('/api/v.0.1/board/') 
async def board_add(board_item: Board_add_item):
    try:
        wt = Web3Token(board_item.token);
        signer = wt.get_signer(validate=True)
        token_data = wt.get_data()
    except:
        raise HTTPException(status_code=404, detail="Log in first and get a token!")

    if signer.lower() != board_item.etherAddress.lower() :
        raise HTTPException(status_code=401, detail="Unauthorized")


    rest_today = datetime.today().strftime("%Y%m%d")
    conn.execute(users.insert().values(
        today=rest_today,
        title=board_item.title,
        content=board_item.content,
        up=15,
        etherAddress=board_item.etherAddress
    ))
    return conn.execute(users.select()).fetchall()

@router.get('/api/v.0.1/board/content/{id}')
async def board_content(id: int):
    return conn.execute(
            users.
            select().
            where(users.columns.id == id)
            ).fetchall()

@router.get('/api/v.0.1/board/content/up/{id}')
async def board_up_content(id: int):
    conn.execute(
            users.
            update().
            where(users.columns.id == id).
            values(up=users.columns.up + 1)
            )
    
    return conn.execute(
            users.
            select().
            where(users.columns.id == id)
            ).fetchall()


@router.get("/api/v.0.1/board/hot_topic")
async def board_hot_topic():
    rest_today = datetime.today().strftime("%Y%m%d")
    return conn.execute(
            users.
            select().
            where(users.columns.today == rest_today).
            order_by(users.columns.up.desc()).
            limit(3)).fetchall()


@router.get("/api/v.0.1/board/recent/topic/{id}")
async def board_recent_topic(id: int):
    return conn.execute(
            users.
            select().
            order_by(users.columns.id.desc()).
            limit(id)
            ).fetchall()




# append Today users
@router.get('/api/v0.1/statis')
async def get_statis():
    rest_today = datetime.today().strftime("%Y%m%d")
    
    today_update = conn.execute(statis.select().where(
        statis.columns.today == rest_today
        )).fetchall();

    if today_update == []:
        conn.execute(statis.insert().values(
            today=rest_today,
            today_site_user=0,
            today_new_client=0,
            today_activity=0,
            total_sales=0
            ))

    conn.execute(statis.
            update().
            where(statis.columns.today == rest_today).
            values(today_site_user=statis.columns.today_site_user + 1)
            )

    return conn.execute(statis.
            select().
            where(statis.columns.today == rest_today)
            ).fetchall()


# example data
# eyJzaWduYXR1cmUiOiIweGI5NjRjZWY0YzFjZGI2ZTBlMDA2YzViMWFiMDA5MjkwM2JiMjQ1OTJlMWE5Yzg2MmM3MzYxZGQyYzdmZjQ4OWQwNDQyZTRkYmE1ZDIyMWNlYTk3NDM5NTIxYTBkZjkzZDc4NDZhMTk3N2JhZWY0NjAyYzYyMmU0MGZhNmRkYzI3MWMiLCJib2R5IjoiVVJJOiBodHRwOi8vbG9jYWxob3N0OjMwMDAvXG5XZWIzIFRva2VuIFZlcnNpb246IDJcbk5vbmNlOiA0NTE2MDY4XG5Jc3N1ZWQgQXQ6IDIwMjItMDMtMDFUMTE6MjU6NTIuMjEwWlxuRXhwaXJhdGlvbiBUaW1lOiAyMDIyLTAzLTAyVDExOjI1OjUyLjAwMFoifQ==

@router.get('/api/v.0.1/token')
async def new_get_client(token: str):
    await get_statis()
    
    try:
        wt = Web3Token(token);
        signer = wt.get_signer(validate=True)
        token_data = wt.get_data()
    except:
        raise HTTPException(status_code=404, detail="Log in first and get a token!")



    return {
            "token_data":token_data,
            "signer": signer,
    } 





   


    #return conn.execute(users.update().where(statis.columns.today==today).value(today=statis.columns.today+1)).fetchall()
   


