import sys
sys.path.append('..')
sys.path.append('.')


from sqlalchemy import Column, Integer, String, Table, TEXT
from config.db import meta, engine

users = Table('users', meta,
              Column('id', Integer, primary_key=True),
              Column('today', String(255), nullable=False),
              Column('title', String(255), nullable=False),
              Column('content', TEXT,nullable=False),
              Column('up', Integer, default=0), 
              Column('etherAddress', String(255), nullable=False),
)

statis = Table('statis', meta,
        Column('today', String(255), nullable=False, primary_key=True),
        Column('today_site_user', String(255), nullable=False),
        Column('today_new_client', Integer, nullable=False),
        Column('today_activity', Integer, nullable=False),
        Column('total_sales', Integer, nullable=False),
)

client = Table('client', meta,
            Column('id', Integer, primary_key=True),
            Column('etherAddress', String(255), nullable=False)
        )


meta.create_all(engine)
