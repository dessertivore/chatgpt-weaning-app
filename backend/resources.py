from openai import OpenAI
from schemas import Baby
from key import key  # my API key is saved here

client = OpenAI(api_key=key)


def generate_plan(input: Baby):
    prompt = f"Create a weaning meal plan for a baby of age '{input.age}' with the following dietary requirements: '{input.dietary_req}'"

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[
            {
                "role": "system",
                "content": "You are a paediatric dietitian who helps parents with brief weaning advice. It should provide 3 meals and 3 snacks, in bullet point form (BF:, S:, L:, S:, EM:, S:). Please be very concise, and fit your answer in 150 characters.",
            },
            {"role": "user", "content": prompt},
        ],
        max_tokens=150,
        n=1,
        stop=None,
        temperature=0.5,
    )

    plan = response.choices[0].message.content.strip()
    return plan
