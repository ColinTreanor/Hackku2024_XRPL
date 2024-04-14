import xrpl
import json
import os 

testnet_url = "https://s.devnet.rippletest.net:51234/"

# File to store transaction history
TRANSACTION_HISTORY_FILE = "transaction_history.json"

transaction_queue = {} #dictionary to keep track of each user's transaction history


# Function to load transaction history from file
def load_transaction_history():
    TRANSACTION_HISTORY_FILE = 'transaction_history.json'
    if os.path.exists(TRANSACTION_HISTORY_FILE):
        with open(TRANSACTION_HISTORY_FILE, 'r') as file:
            transaction_history = json.load(file)
        return transaction_history
    else:
        # Handle case where file does not exist
        return {}

# Function to save transaction history to file
def save_transaction_history(history):
    with open(TRANSACTION_HISTORY_FILE, "w") as file:
        json.dump(history, file)

# Load transaction history from file
transaction_queue = load_transaction_history()

#Creates a new wallet if a user doesn't have one
def create_account():
    client = xrpl.clients.JsonRpcClient(testnet_url)
    new_wallet = xrpl.wallet.generate_faucet_wallet(client)
    transaction_queue[new_wallet.public_key] = list() #Adds new wallet to transaction_queue
    return new_wallet
    
#Gets a wallet when given a seed
def get_account(seed):
    wallet = xrpl.wallet.Wallet.from_seed(seed)
    return wallet

def get_info(seed):
    info = {
        "public_key" : get_public_key_from_seed(seed),
        "address" : get_account(seed).address,
        "seed" : seed
    }
    return info

def get_address_from_public_key(public_key):
    return xrpl.core.keypairs.derive_classic_address(public_key)

def get_public_key_from_seed(seed):
    wallet = xrpl.wallet.Wallet.from_seed(seed)
    return wallet.public_key

#Sends a specified amount of XRP to another user
def send_xrp(seed, amount, dest_public_key):
    sending_wallet = xrpl.wallet.Wallet.from_seed(seed)
    dest = get_address_from_public_key(dest_public_key)
    client = xrpl.clients.JsonRpcClient(testnet_url)
    payment = xrpl.models.transactions.Payment( #Pays another user
        account=sending_wallet.address,
        amount=xrpl.utils.xrp_to_drops(int(amount)),
        destination=dest,
    )
    try:	
        response = xrpl.transaction.submit_and_wait(payment, client, sending_wallet) #Tries to submit payment
    except xrpl.transaction.XRPLReliableSubmissionException as e:	
        response = f"Submit failed: {e}" #tells user if it failed
        
    if sending_wallet.public_key in transaction_queue: #If the public key is in the queue
        tx_data = { #stores the data in a dictionary in JSON format
        "Sender" : get_public_key_from_seed(seed), #Save our public key for transaction history
        "Amount" : amount,
        "Receiver" : dest_public_key,
        "Hash" : response["hash"] if isinstance(response, dict) else None #Extract hash if available
        }
        transaction_queue[sending_wallet.public_key].append(tx_data)
        transaction_queue[dest_public_key].append(tx_data)

        save_transaction_history(transaction_queue) #Saves transaction_queue to JSON file

    return response

def send_transaction_data(seed):
    user_key = get_public_key_from_seed(seed)
    tx_data = transaction_queue[user_key]
    transaction_list = []
    for transaction in tx_data:
        is_sent = transaction["Sender"] == user_key
        send_data = {
            "Other" : transaction["Receiver"] if transaction["Sender"] == user_key else transaction["Sender"],
            "Amount" : transaction["Amount"],
            "isSentTransaction" : is_sent
        }
        transaction_list.append(send_data)
    return transaction_list

def get_balance(public_key):
    client = xrpl.clients.JsonRpcClient(testnet_url)
    address = get_address_from_public_key(public_key)
    balance = xrpl.account.get_balance(address, client)

    #account_info = xrpl.account.get_account_info(address, client)

    # Convert the balance from drops to XRP (1 XRP = 1,000,000 drops)
    balance = float(balance) / 1_000_000
    
    return balance

account = print(get_account("sEdVLQ9axjHthHAzBrnLqeTRPvxg3q7"))

