import sys
from datetime import datetime



sys.path.append('..')
sys.path.append('.')

from fastapi import APIRouter
from config.db import conn
from models.model import users, statis, client
from pydantic import BaseModel

class Board_add_item(BaseModel):
    etherAddress: str
    title: str
    content: str


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
            limit(3)
        ).fetchall()

@router.get("/api/v.0.1/board/recent/topic")
async def board_recent_topic():
    return conn.execute(
            users.
            select().
            order_by(users.columns.up.desc()).
            limit(5)
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

@router.post('/api/v.0.1/login')
async def new_get_client(item: Client):
    await get_statis()


    rest_today = datetime.today().strftime("%Y%m%d")

    ether = conn.execute(client.
            select().
            where(client.columns.etherAddress == item.etherAdd)
        ).fetchall()

    if ether == []:

        conn.execute(client.
                insert().
                values(etherAddress=item.etherAdd))

        conn.execute(
                statis.
                update().
                where(statis.columns.today == rest_today).
                values(today_new_client=statis.columns.today_new_client + 1)
                )

    return conn.execute(
            statis.
            select()
            ).fetchall()



    #return conn.execute(users.update().where(statis.columns.today==today).value(today=statis.columns.today+1)).fetchall()
   


