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
    

def get_info(account_id):
    client = xrpl.clients.JsonRpcClient(testnet_url)
    
def wallet_to_json(wallet):
    return {
        "address": wallet.classic_address,
        "secret": wallet.seed,
        "public_key": wallet.public_key
    }
    
# print(get_account("sEdVnyag2smPo1mY6Xxv8Go2L9LWVTg").private_key)
