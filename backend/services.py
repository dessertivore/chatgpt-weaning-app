from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from schemas import Order, Baby
from resources import generate_plan

app = FastAPI()

# accept requests from React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/weaningbot")
async def weaning_bot(input: Baby):
    description = generate_plan(input)
    return {description}
