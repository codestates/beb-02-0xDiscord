from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import MetaData
import json
import os


# 현재 폴더
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# DB 설정 파일 받아오기
SECRET_FILE = os.path.join(BASE_DIR, 'secrets.json')

# DB 설정 json 읽기
secrets = json.loads(open(SECRET_FILE).read())

# DB 접속 URL
DB = secrets["DB"]
DB_URL = f"mysql+pymysql://{DB['user']}:{DB['password']}@{DB['host']}:{DB['port']}/{DB['database']}"
engine = create_engine(DB_URL)


# meta

meta = MetaData()

# engine = create_engine(DB_URL, encoding = 'utf-8')
conn = engine.connect()
