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

const createMeeting = async()=>
{
    const create_meeting_url = "https://webexapis.com/v1/meetings";
    const accessToken = 'MzY0Y2Y5ZGUtYzRiZC00ZWFlLTg2NTYtNzQ2MjA2OTZlZjFiOWQ5NWZjMmUtZmQ5_P0A1_d753f5ed-fc6f-453b-b80d-9eed175c690b';
    const headers = {
        "Authorization": `Bearer ${accessToken}`
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

export {authorize,redirect,createMeeting};