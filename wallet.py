import xrpl
import json

testnet_url = "https://s.devnet.rippletest.net:51234/"


def create_new_wallet(key=''):
    if key == '':
        client = xrpl.clients.JsonRpcClient(testnet_url)
        new_wallet = xrpl.wallet.generate_faucet_wallet(client)
    else:
        xrpl.wallet.Wallet.from_seed(key)
    return new_wallet