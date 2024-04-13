from flask import Flask, request, jsonify
import xrpl
import json
import wallet

app = Flask(__name__)

names_queue = {} #dictionary to keep track of each user's transaction history
NAMES_FILE = "names.json"

# Function to load transaction history from file
def load_names():
    with open(NAMES_FILE, "r") as file:
        return json.load(file)

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
    else:
        user_wallet = wallet.create_account()
    return jsonify({'address': user_wallet.classic_address, 'public_key': user_wallet.public_key, 'secret': user_wallet.seed})

# Endpoint for sending XRP
@app.route('/send_xrp', methods=['POST'])
def send_xrp():
    data = request.json
    seed = data.get('seed')
    amount = data.get('amount')
    recipient = data.get('recipient')
    if seed and amount and recipient:
        response = wallet.send_xrp(seed, amount, recipient)
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

if __name__ == '__main__':
    app.run(debug=True)

    
    # if send_request(name, amount):
    #     user.send_xrp(seed, amount, names_queue[name])
        
    # if settings_request():
    #     user.get_info(seed)
    #     if addName(name):
    #         add_name(name, seed)


def add_name(name, seed):
    names_queue[name] = seed
    save_names(names_queue)