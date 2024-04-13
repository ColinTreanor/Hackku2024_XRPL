import xrpl
import json

testnet_url = "https://s.devnet.rippletest.net:51234/"


def create_account():
    client = xrpl.clients.JsonRpcClient(testnet_url)
    new_wallet = xrpl.wallet.generate_faucet_wallet(client)
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

def send_xrp(seed, amount, destination):
    sending_wallet = xrpl.wallet.Wallet.from_seed(seed)
    client = xrpl.clients.JsonRpcClient(testnet_url)
    payment = xrpl.models.transactions.Payment(
        account=sending_wallet.address,
        amount=xrpl.utils.xrp_to_drops(int(amount)),
        destination=destination,
    )
    try:	
        response = xrpl.transaction.submit_and_wait(payment, client, sending_wallet)	
    except xrpl.transaction.XRPLReliableSubmissionException as e:	
        response = f"Submit failed: {e}"

    return response

#Uses the seed to get the data of the last transaction
def last_transaction(seed):
    client = xrpl.clients.JsonRpcClient(testnet_url)
    try:
        last_transaction_obj = xrpl.account.get_latest_transaction(seed.address, client) #Gets the data in the form of a "Response" Object
        return parse_transaction_data(last_transaction_obj) 
    except xrpl.asyncio.clients.XRPLRequestFailureException as e:
        return "Failed to fetch last transaction: " + e

#Parses through the Response object and gets the transaction data
def parse_transaction_data(transaction_obj):
    transaction = transaction_obj.result["transactions"][0] #Goes through Response object and pulls Transaction data
    tx = transaction["tx"] #Finds specific last transaction data under "tx"
    transaction_data = { #stores the data in a dictionary
        "Sender" : tx["Account"],
        "Amount" : tx["Amount"],
        "Receiever" : tx["Destination"],
        "Fee" : tx["Fee"],
        "Hash" : tx["hash"]
    }
    return transaction_data

    
def wallet_to_json(wallet):
    return {
        "address": wallet.classic_address,
        "secret": wallet.seed,
        "public_key": wallet.public_key
    }

my_account = get_account("sEdVnyag2smPo1mY6Xxv8Go2L9LWVTg")
# print(my_account)
# print()
# print(get_info(my_account))
print(last_transaction(my_account))