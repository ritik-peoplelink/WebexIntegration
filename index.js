import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import bodyParser from 'body-parser';
import {authorize,redirect,createMeeting,refreshToken,getUserDetails} from './webexHelper.js';

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

app.get('/api/webex/refresh_token',async(req,res)=>{
    return res.json(refreshToken());
})

app.get('/getUser',async(req,res)=>{
    return res.json(getUser());
})

app.get('/getDetail',async(req,res)=>{
    return res.json(getUserDetails());
})

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error('Error destroying session:', err);
      }
      res.redirect(authorize()); // Redirect to the login page
    });
});
  



// createMeeting();


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})