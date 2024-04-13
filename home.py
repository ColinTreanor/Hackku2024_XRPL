import xrpl
import json

import wallet

def run(seed=''):
    if seed == '':
        user = login_new()
    else:
        user = login_existing(seed)
        
    # if send_request(recipient, amount):
    #     user.send_xrp(seed, amount, recipient)
        
    # if settings_request():
    #     user.get_info(seed)
        
def login_new():
    user_wallet = wallet.create_account()
    return user_wallet

def login_existing(seed):
    user_wallet = wallet.get_account(seed)
    return user_wallet