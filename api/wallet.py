import xrpl
import json
import os 

testnet_url = "https://s.devnet.rippletest.net:51234/"



#Creates a new wallet if a user doesn't have one
def create_account():
    client = xrpl.clients.JsonRpcClient(testnet_url)
    new_wallet = xrpl.wallet.generate_faucet_wallet(client)
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

    return response

def last_transaction(seed):
    client = xrpl.clients.JsonRpcClient(testnet_url)
    public_key = get_public_key_from_seed(seed)
    address = get_address_from_public_key(public_key)
    try:
        last_transaction_obj = xrpl.account.get_latest_transaction(address, client) #Gets the data in the form of a "Response" Object
        parse_data = parse_transaction_data(last_transaction_obj) #Calls to parse response object
        return parse_data
    except xrpl.asyncio.clients.XRPLRequestFailureException as e:
        return "Failed to fetch last transaction: " + e
    
#Parses through the Response object and gets the transaction data
def parse_transaction_data(transaction_obj):
    transaction = transaction_obj.result["transactions"][0] #Goes through Response object and pulls Transaction data
    tx = transaction["tx"] #Finds specific last transaction data under "tx"
    transaction_data = { #stores the data in a dictionary
        "Sender" : tx["Account"], #gets public key
        "Amount" : tx["Amount"],
        "Receiver" : tx["Destination"], #gets public key
        "Hash" : tx["hash"]
    }
    return transaction_data

def send_transaction_data(seed):
    last_tx = last_transaction(seed)
    is_sent = last_tx["Sender"] == seed
    send_data = {
        "Other" : last_tx["Receiver"] if last_tx["Sender"] == seed else last_tx["Sender"],
        "Amount" : last_tx["Amount"],
        "isSentTransaction" : is_sent
    }
    return send_data


def get_balance(public_key):
    client = xrpl.clients.JsonRpcClient(testnet_url)
    address = get_address_from_public_key(public_key)
    balance = xrpl.account.get_balance(address, client)

    #account_info = xrpl.account.get_account_info(address, client)

    # Convert the balance from drops to XRP (1 XRP = 1,000,000 drops)
    balance = float(balance) / 1_000_000
    
    return balance

account1 = create_account()
account2 = create_account()

send_xrp(account1.seed, 500, account2.public_key)

print(last_transaction(account1.seed))