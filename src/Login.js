import { useEffect, useState } from 'react';


/* 
Functionality:

Two Options:

1. Create Wallet
    Call a JS function that sends request to backend. create_account()

2. Enter Seed: (already have wallet)
    Cannot submit if:
        Empty
        length is not 31.

    If submitted:

        Call JS function to go to backend. get_account(seed)

Notes:
    HANDLE ERRORS

*/
function Login() {

  return (
    <div className="loginContainer">
    <h1 id="loginHeader">Login</h1>
    </div>

  );
}

export default Login;