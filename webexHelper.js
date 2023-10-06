import axios from 'axios';

const authorize = () => {
    return `https://webexapis.com/v1/authorize?client_id=${process.env.WEBEX_CLIENT_ID}&response_type=code&redirect_uri=${process.env.WEBEX_REDIRECT_URI}&scope=${process.env.WEBEX_SCOPE_LIST}`;
}
let data={};
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
    data = await axios.post(tokenURL,payload,{headers}).then(response => {
        return response;
    }).catch(e => {
        return e;
    })
    console.log("Final Data :::::::::::",data);
    return data;
}

const refreshToken = async()=>{
    let tokenUri = 'https://webexapis.com/v1/access_token';
    let payload = {
        'grant_type' : 'refresh_token',
        'client_id' : process.env.WEBEX_CLIENT_ID,
        'client_secret' : process.env.WEBEX_CLIENT_SECRET,
        'refresh_token' : process.env.WEBEX_REFRESH_TOKEN
    }
    const headers = {
        'Content-Type' : 'application/x-www-form-urlencoded',
    }
    data = await axios.post(tokenUri,payload,{headers}).then(response => {
        return response;
    }).catch(e => {
        return e;
    })
    console.log("Refresh Token Data :::::::::::",data);
    return data;
}

const createMeeting = async()=>
{
    const create_meeting_url = "https://webexapis.com/v1/meetings";
    const accessToken = 'OTQ2YzYzMjctNDdlNy00YTEzLWI2M2YtMzczMmYxY2Q4ZDc2MzNlYjM0OTUtMTVi_P0A1_d753f5ed-fc6f-453b-b80d-9eed175c690b';
    const headers = {
        Authorization: `Bearer ${accessToken}`, 
        'Content-Type': 'application/json', 
    }
    const meetingdata = {
        "title": "My Webex Meeting",
        "start": "2023-09-01T12:00:00",
        "end": "2023-09-01T13:00:00",
        "agenda": "Discuss project updates",
        "enabledAutoRecordMeeting": false,
        "allowAnyUserToBeCoHost": false,
        "timezone": "America/New_York"
    }
    const responseData = await axios.post(create_meeting_url,meetingdata,{headers}).then(response => {
        return response;
    }).catch(e => {
        return e;
    })
    console.log("Final Meeting Data :::::::::::",responseData);
    return responseData;
}

const getUserDetails = async() => {
    const webexApiBaseUrl = 'https://api.ciscospark.com/v1';
    const adminAccesToken = 'MWEwMTY4YTAtNWM1NS00M2MzLTgzZWMtZGFmZWM2NzFmNjk1OWQ4YWMyNTgtNzBk_P0A1_d753f5ed-fc6f-453b-b80d-9eed175c690b';
    const headers = {
        Authorization: `Bearer ${adminAccesToken}`
    }
    try{
        const userData = await axios.get(`${webexApiBaseUrl}/people/me`,{headers})
        console.log("Webex User Data ::::",userData);
        return userData;
    }
    catch(e)
    {
        console.log("Error : ",e);
    }
}

export {authorize,redirect,createMeeting,refreshToken,getUserDetails};