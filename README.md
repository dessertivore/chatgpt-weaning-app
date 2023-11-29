# Weaning advice bot
Please note this does not replace advice from a real paediatric dietitian! 

## Functions
Insert your child's age in months, and any dietary requirements
ChatGPT will give you a 1 day meal plan


## Installation

In terminal: 

```shell
make install
```

Minimum Python version 3.10.

## Usage

You will need your own OpenAI key. To insert it into this code, you can either input it in backend/resources, and replace 'key' in line 5 with your key; or alternatively you can create key.py in your backend folder with 1 line of code: 'key = <your OpenAI key>'.

In separate terminals, while in master directory: 

```shell
make backend
```

```shell
make frontend
```

Can then be used via React frontend.