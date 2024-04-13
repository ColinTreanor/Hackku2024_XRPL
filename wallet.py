import xrpl
import json

testnet_url = "https://s.devnet.rippletest.net:51234/"


def create_account():
    client = xrpl.clients.JsonRpcClient(testnet_url)
    new_wallet = xrpl.wallet.generate_faucet_wallet(client)
    return new_wallet

def get_account(key):
    wallet = xrpl.wallet.Wallet.from_seed(key)
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

def last_transaction(seed):
    client = xrpl.clients.JsonRpcClient(testnet_url)
    try:
        last_transaction_obj = xrpl.account.get_latest_transaction(seed.address)
    except xrpl.XRPLRequestFailureException:
        print("ERROR: Transaction failed")
    return last_transaction_obj
    
def wallet_to_json(wallet):
    return {
        "address": wallet.classic_address,
        "secret": wallet.seed,
        "public_key": wallet.public_key
    }
    
# print(get_account("sEdVnyag2smPo1mY6Xxv8Go2L9LWVTg"))
# print()
# print(get_info(get_account("sEdVnyag2smPo1mY6Xxv8Go2L9LWVTg")))
print(last_transaction("sEdVnyag2smPo1mY6Xxv8Go2L9LWVTg"))