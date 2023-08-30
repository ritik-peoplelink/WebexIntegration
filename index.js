import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import {authorize,redirect,createMeeting} from './webexHelper.js';

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

const port = process.env.PORT || 8000



app.get('/api/authorize/webex',async(req,res)=>{
    return res.redirect(authorize());
});

app.get('/api/webex/redirect', async(req,res)=>{
    return res.json(redirect(req.query.code));
})

createMeeting();


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})