import xrpl
import json
import os 

# XRPL provided test server used to access xrpl clients
testnet_url = "https://s.devnet.rippletest.net:51234/" 

# Creates a new wallet if a user doesn't have one
def create_account():
    client = xrpl.clients.JsonRpcClient(testnet_url)
    new_wallet = xrpl.wallet.generate_faucet_wallet(client)
    return new_wallet
    
# Gets a wallet when given a seed
def get_account(seed):
    wallet = xrpl.wallet.Wallet.from_seed(seed)
    return wallet

# Return the public key, address, and seed of a wallet
def get_info(seed):
    info = {
        "public_key" : get_public_key_from_seed(seed),
        "address" : get_account(seed).address,
        "seed" : seed
    }
    return info

# Function used to return a wallet address when you have the public key 
def get_address_from_public_key(public_key):
    return xrpl.core.keypairs.derive_classic_address(public_key)

# Function that returns the wallet public key when you have the wallet seed 
def get_public_key_from_seed(seed):
    wallet = xrpl.wallet.Wallet.from_seed(seed)
    return wallet.public_key

# Sends a specified amount of XRP to another user
def send_xrp(seed, amount, dest_public_key):
    sending_wallet = xrpl.wallet.Wallet.from_seed(seed)
    dest = get_address_from_public_key(dest_public_key)
    client = xrpl.clients.JsonRpcClient(testnet_url)
    
    # Pays another user
    payment = xrpl.models.transactions.Payment( 
        account=sending_wallet.address,
        amount=xrpl.utils.xrp_to_drops(int(amount)),
        destination=dest,
    )
    try:	 
        # Try to submit payment
        response = xrpl.transaction.submit_and_wait(payment, client, sending_wallet)
    except xrpl.transaction.XRPLReliableSubmissionException as e:	
        # Tell user if it failed
        response = f"Submit failed: {e}" 

    return response

# Function to return the most recent transaction of a user (can be xrp sent or recieved)
def last_transaction(seed):
    client = xrpl.clients.JsonRpcClient(testnet_url)
    public_key = get_public_key_from_seed(seed)
    address = get_address_from_public_key(public_key)
    try:
        # Get data in the form of a "Response" Object
        last_transaction_obj = xrpl.account.get_latest_transaction(address, client) 
        # Calls to parse Response object
        parse_data = parse_transaction_data(last_transaction_obj)
        return parse_data
    except xrpl.asyncio.clients.XRPLRequestFailureException as e:
        return "Failed to fetch last transaction: " + e
    
# Parse through the Response object and gets the transaction data
def parse_transaction_data(transaction_obj):
    # Goes through Response object and pulls Transaction data
    transaction = transaction_obj.result["transactions"][0] 
    tx = transaction["tx"] # Find specific last transaction data under "tx"
    transaction_data = { # Store the data in a dictionary
        "Sender" : tx["Account"], # Get address
        "Amount" : tx["Amount"],
        "Receiver" : tx["Destination"], # Get address
        "Hash" : tx["hash"]
    }
    return transaction_data

# Function to send transaction information in a more compact form
def send_transaction_data(seed):
    last_tx = last_transaction(seed)
    address = get_info(seed)['address']
    is_sent = last_tx["Sender"] == address
    send_data = {
        "Other" : last_tx["Receiver"] if last_tx["Sender"] == seed else last_tx["Sender"],
        "Amount" : last_tx["Amount"],
        "isSentTransaction" : is_sent
    }
    return send_data

# return the balance of a wallet 
def get_balance(public_key):
    client = xrpl.clients.JsonRpcClient(testnet_url)
    address = get_address_from_public_key(public_key)
    balance = xrpl.account.get_balance(address, client)

    # Convert the balance from drops to XRP (1 XRP = 1,000,000 drops)
    balance = float(balance) / 1_000_000
    
    return balance
