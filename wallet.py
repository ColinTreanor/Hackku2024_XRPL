import xrpl
import json

testnet_url = "https://s.devnet.rippletest.net:51234/"

transaction_queue = {} #dictionary to keep track of each user's transaction history

def create_account():
    client = xrpl.clients.JsonRpcClient(testnet_url)
    new_wallet = xrpl.wallet.generate_faucet_wallet(client)
    transaction_queue[new_wallet.seed] = list()
    return new_wallet
    

def get_account(seed):
    wallet = xrpl.wallet.Wallet.from_seed(seed)
    return wallet
    

def get_info(seed):
    account_id = seed.address
    client = xrpl.clients.JsonRpcClient(testnet_url)
    acct_info = xrpl.models.requests.account_info.AccountInfo(
        account=account_id,
        ledger_index="validated"
    )
    response = client.request(acct_info)
    return response.result['account_data']

def send_xrp(seed, amount, dest):
    sending_wallet = xrpl.wallet.Wallet.from_seed(seed)
    destination = xrpl.wallet.Wallet.from_seed(dest)
    client = xrpl.clients.JsonRpcClient(testnet_url)
    payment = xrpl.models.transactions.Payment(
        account=sending_wallet.address,
        amount=xrpl.utils.xrp_to_drops(int(amount)),
        destination=destination.address,
    )
    try:	
        response = xrpl.transaction.submit_and_wait(payment, client, sending_wallet)	
    except xrpl.transaction.XRPLReliableSubmissionException as e:	
        response = f"Submit failed: {e}"
        
    if sending_wallet.seed in transaction_queue:
        transaction_data = { #stores the data in a dictionary
        "Sender" : seed,
        "Amount" : amount,
        "Receiver" : destination.seed,
        "Hash" : response["hash"] if isinstance(response, dict) else None #Extract hash if available
        }
        transaction_queue[sending_wallet.seed].append(transaction_data)

    return response

#Uses the seed to get the data of the last transaction
def last_transaction(seed):
    client = xrpl.clients.JsonRpcClient(testnet_url)
    try:
        last_transaction_obj = xrpl.account.get_latest_transaction(seed.address, client) #Gets the data in the form of a "Response" Object
        parse_data = parse_transaction_data(last_transaction_obj)
        if seed.seed in transaction_queue:
            transaction_queue[seed.seed].append(parse_data)
        return parse_data
    except xrpl.asyncio.clients.XRPLRequestFailureException as e:
        return "Failed to fetch last transaction: " + e
    
    
    

#Parses through the Response object and gets the transaction data
def parse_transaction_data(transaction_obj):
    transaction = transaction_obj.result["transactions"][0] #Goes through Response object and pulls Transaction data
    tx = transaction["tx"] #Finds specific last transaction data under "tx"
    transaction_data = { #stores the data in a dictionary
        "Sender" : tx["Account"],
        "Amount" : tx["Amount"],
        "Receiver" : tx["Destination"],
        "Hash" : tx["hash"]
    }
    return transaction_data
    
    
def wallet_to_json(wallet):
    return {
        "address": wallet.classic_address,
        "secret": wallet.seed,
        "public_key": wallet.public_key
    }
#acc1 = get_account("sEdVnyag2smPo1mY6Xxv8Go2L9LWVTg")
#acc2 = get_account("sEd7Wri652hHHVDCZsotvZTCGEb4SqB")
account1 = create_account()
account2 = create_account()

send_xrp(account1.seed, 500, account2.seed)

print(transaction_queue[account1.seed])