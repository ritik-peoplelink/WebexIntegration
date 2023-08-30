import axios from 'axios';

const authorize = () => {
    return `https://webexapis.com/v1/authorize?client_id=${process.env.WEBEX_CLIENT_ID}&response_type=code&redirect_uri=${process.env.WEBEX_REDIRECT_URI}&scope=${process.env.WEBEX_SCOPE_LIST}`;
}

const redirect = async(code) => {
    let tokenURL = 'https://webexapis.com/v1/access_token';
    let payload = {
        'code' : code,
        'grant_type' : 'authorization_code',
        'client_id' : process.env.WEBEX_CLIENT_ID,
        'client_secret' : process.env.WEBEX_CLIENT_SECRET,
        'redirect_uri' : process.env.WEBEX_REDIRECT_URI
    }
    const headers = {
        'Content-Type' : 'application/x-www-form-urlencoded',
    }
    const data = await axios.post(tokenURL,payload,{headers}).then(response => {
        return response;
    }).catch(e => {
        return e;
    })
    console.log("Payload ::::::::",payload);
    console.log("Final Data :::::::::::",data);
    return data;
}

export {authorize,redirect};