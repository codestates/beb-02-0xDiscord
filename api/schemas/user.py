from pydantic import BaseModel

class Usere(BaseModel):
    title: str
    content: str
    etherAddress: str
