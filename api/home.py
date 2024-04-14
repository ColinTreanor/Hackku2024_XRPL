from flask import Flask, request, jsonify
from flask_cors import CORS 
import json
import wallet
import os 


app = Flask(__name__)
CORS(app)

names_queue = {} #dictionary to keep track of each user's transaction history


# Function to load transaction history from file
NAMES_FILE = "names.json"

def load_names():
    if os.path.exists(NAMES_FILE):
        with open(NAMES_FILE, 'r') as file:
            names_history = json.load(file)
        return names_history
    else:
        # Handle case where file does not exist
        return {}

# Function to save transaction history to file
def save_names(history):
    with open(NAMES_FILE, "w") as file:
        json.dump(history, file)

# Load transaction history from file
names_queue = load_names()

names = {"Colin": "ED190F2BDD7DB80A927182CAFBC82075F97123447A39F9BDC25DE5592AF20025C3", "Kyle":  "ED7F667A6F3944022B53E29370330DA78FD8FA65736E4F14240DFFC00E5F7C76EB", "Alex": "ED2AA9D63B07E2DEE4AE58DB7FAB5D377BCAC5DBAFCA45DF63C4CA0D82916AD110", "Nick": "ED41B8E708DE09D6571EEA591EA397A5A1F136128686BE475E7DA059A0E5C19490"}

# Endpoint for user authentication
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    seed = data.get('seed')
    if seed:
        user_wallet = wallet.get_account(seed)
        return jsonify({'address': user_wallet.classic_address, 'public_key': user_wallet.public_key, 'secret': user_wallet.seed})
    else:
        user_wallet = wallet.create_account()
        return jsonify({'address': user_wallet.classic_address, 'public_key': user_wallet.public_key, 'secret': user_wallet.seed})

# Endpoint for sending XRP
@app.route('/send_xrp', methods=['POST'])
def send_xrp():
    data = request.json
    seed = data.get('seed')
    amount = data.get('amount')
    public_key = data.get('recipient')
    if len(public_key) < 66:
        public_key = names[public_key]
    if seed and amount and public_key:
        response = wallet.send_xrp(seed, amount, public_key)
        return jsonify(response)
    else:
        return jsonify({'error': 'Missing required parameters'}), 400
    
# Endpoint for retrieving account information
@app.route('/account_info', methods=['POST'])
def account_info():
    data = request.json
    seed = data.get('seed')
    if seed:
        account_info = wallet.get_info(seed)
        return jsonify(account_info)
    else:
        return jsonify({'error': 'Missing seed parameter'}), 400
    
@app.route('/account_balance', methods=['POST'])
def account_balance():
    data = request.json
    public_key = data.get('pub_key')
    if public_key:
        account_balance = wallet.get_balance(public_key)
        return jsonify(account_balance)
    else:
        return jsonify({'error': 'Missing seed parameter'}), 400
    
def add_name(name, public_key):
    names_queue[name] = public_key
    save_names(names_queue)
    
@app.route('/send_transaction_info', methods=['POST'])
def send_transaction_info():
    data = request.json
    seed = data.get('seed')
    if seed:
        last_tx = wallet.send_transaction_data(seed)
        return jsonify(last_tx)
    else:
        return jsonify({'error' : 'Missing seed parameter'}), 400


if __name__ == '__main__':
    app.run(debug=True)
    