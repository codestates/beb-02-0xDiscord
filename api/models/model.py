import sys
sys.path.append('..')
sys.path.append('.')


from sqlalchemy import Column, Integer, String, Float, Boolean, Table
from config.db import meta, engine

users = Table('users', meta,
              Column('id', Integer, primary_key=True),
              Column('title', String(255)),
              Column('content', String(255)),
              Column('etherAddress', String(255)),
              )

statis = Table('statis', meta,
        Column('id', Integer, primary_key=True),

        )


meta.create_all(engine)
