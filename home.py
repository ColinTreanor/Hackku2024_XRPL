import xrpl
import json

import wallet

names_queue = {} #dictionary to keep track of each user's transaction history
NAMES_FILE = "names.json"

# Function to load transaction history from file
def load_names():
    # try:
    with open(NAMES_FILE, "r") as file:
        return json.load(file)

# Function to save transaction history to file
def save_names(history):
    with open(NAMES_FILE, "w") as file:
        json.dump(history, file)

# Load transaction history from file
names_queue = load_names()

def run(seed=''):
    if seed == '':
        user = login_new()
    else:
        user = login_existing(seed)
    
    # if send_request(name, amount):
    #     user.send_xrp(seed, amount, names_queue[name])
        
    # if settings_request():
    #     user.get_info(seed)
    #     if addName(name):
    #         add_name(name, seed)
        
def login_new():
    user_wallet = wallet.create_account()
    return user_wallet

def login_existing(seed):
    user_wallet = wallet.get_account(seed)
    return user_wallet

def add_name(name, seed):
    names_queue[name] = seed
    save_names(names_queue)