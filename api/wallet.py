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
    transaction_queue[new_wallet.seed] = list() #Adds new wallet to transaction_queue
    return new_wallet
    
#Gets a wallet when given a seed
def get_account(seed):
    wallet = xrpl.wallet.Wallet.from_seed(seed)
    return wallet
    
#Gets an account's information such as public_key, address, etc.
def get_info(seed):
    account_id = seed.address
    client = xrpl.clients.JsonRpcClient(testnet_url)
    acct_info = xrpl.models.requests.account_info.AccountInfo(
        account=account_id,
        ledger_index="validated"
    )
    response = client.request(acct_info)
    return response.result['account_data']

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
        
    if sending_wallet.seed in transaction_queue: #If the seed is in the queue
        transaction_data = { #stores the data in a dictionary in JSON format
        "Sender" : get_public_key_from_seed(seed), #Save our public key for transaction history
        "Amount" : amount,
        "Receiver" : dest_public_key,
        "Hash" : response["hash"] if isinstance(response, dict) else None #Extract hash if available
        }
        transaction_queue[sending_wallet.seed].append(transaction_data)

        save_transaction_history(transaction_queue) #Saves transaction_queue to JSON file

    return response

#Uses the seed to get the data of the last transaction
def last_transaction(seed):
    client = xrpl.clients.JsonRpcClient(testnet_url)
    try:
        last_transaction_obj = xrpl.account.get_latest_transaction(seed.address, client) #Gets the data in the form of a "Response" Object
        parse_data = parse_transaction_data(last_transaction_obj) #Calls to parse response object
        if seed.seed in transaction_queue:
            transaction_queue[seed.seed].append(parse_data)  #Adds transaction to queue
            save_transaction_history(transaction_queue) #saves transaction history
        return parse_data
    except xrpl.asyncio.clients.XRPLRequestFailureException as e:
        return "Failed to fetch last transaction: " + e
    
    
    

#Parses through the Response object and gets the transaction data
def parse_transaction_data(transaction_obj):
    transaction = transaction_obj.result["transactions"][0] #Goes through Response object and pulls Transaction data
    tx = transaction["tx"] #Finds specific last transaction data under "tx"
    transaction_data = { #stores the data in a dictionary
        "Sender" : get_public_key_from_seed(tx["Account"]), #gets public key
        "Amount" : tx["Amount"],
        "Receiver" : get_public_key_from_seed(tx["Destination"]), #gets public key
        "Hash" : tx["hash"]
    }
    return transaction_data
