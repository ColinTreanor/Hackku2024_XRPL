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
    seed = data.get('seed')
    public_key = wallet.get_public_key_from_seed(seed)
    if seed:
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
        transaction_list = wallet.send_transaction_data(seed)
        return jsonify(transaction_list)
    else:
        return jsonify({'error' : 'Missing seed parameter'}), 400


if __name__ == '__main__':
    app.run(debug=True)
