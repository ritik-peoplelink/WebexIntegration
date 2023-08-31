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
    const accessToken = 'NmRiZjFhNjgtZjZjNi00MjM5LWFmMmItNDQ3YzNhOWYwYmY3MDQyYTg5NjItZDg5_P0A1_342420d7-2b99-440d-92ed-a5be68dea216';
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
        "password": "Admins@1234",
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

export {authorize,redirect,createMeeting,refreshToken};