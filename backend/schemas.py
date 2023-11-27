from pydantic import BaseModel


class Order(BaseModel):
    product: str
    units: int


class Baby(BaseModel):
    age: int
    dietary_req: str
