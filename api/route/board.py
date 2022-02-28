import sys
sys.path.append('..')
sys.path.append('.')

from fastapi import APIRouter
from config.db import conn
from models.model import users
from pydantic import BaseModel

class Board_add_item(BaseModel):
    etherAddress: str
    title: str
    content: str


class Item(BaseModel):
    name: str
    price: float


router = APIRouter()

@router.get('/api/v0.1/board/{item_id}')
async def board_read_item(item_id: int):
    return conn.execute(
            users.select().where(
                users.columns.id > item_id,
                users.columns.id < item_id+10)).fetchall()

@router.post('/api/v.0.1/board/') 
async def board_add(board_item: Board_add_item):
    conn.execute(users.insert().values(
        title=board_item.title,
        content=board_item.content,
        etherAddress=board_item.etherAddress
    ))
    return conn.execute(users.select()).fetchall()

@router.post("/items/")
async def create_item(item: Item):
    return item
