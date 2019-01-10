const express = require('express');
//const request = require('request');
const nodemailer = require('nodemailer')
const morgan = require('morgan')
const bodyParser= require('body-parser')
const transport = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'aitivinayak562@gmail.com',
        pass:'vinayak!1'
    }
})

const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(morgan('dev'))
app.post('/mailsender',(req,res)=>{
    var len = req.body.x.length;
    var mails ='';
    for(i=0;i<len-1;i++)
    {
        mails+=req.body.x[i].email+', ';
    }
    mails+=req.body.x[len-1].email;
    //req.body.groupName
    if(mails.length>0)
    {
        transport.sendMail({
            from:'aiti',
            to:mails,
            html:'<h1>New event created by: <strong style="color:blue">'+ req.body.groupName +'</strong></h1><hr>'+'<a href=\"http://localhost:3030/eventview/'+req.body.eventID +'\">click here to view</a>'
        },function(err,info){ 
            if(err)
            {
                console.error(err);
            }
         res.end('sent... mail')
        })
    }
    else{
        res.end('')
    }
  // res.end('');
  
})
app.listen(3031,(err)=>{
    console.log('Listening to port:',3031)
})