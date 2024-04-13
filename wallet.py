import xrpl
import json

testnet_url = "https://s.devnet.rippletest.net:51234/"

# client = xrpl.clients.JsonRpcClient(testnet_url)
client = xrpl.wallet.generate_faucet_wallet(testnet_url)

print(client)