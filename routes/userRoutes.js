const express = require('express');
const User = require('../models/user');
const Item = require('../models/item')
const router = express.Router();

router.get('/users',(req,res)=>{
    res.redirect('./register.html');
})

router.post('/users',(req,res)=>{  //in the form action pointed to this page   
    
    let ename='';
    let eusername='';
    let epassword='';
    let ecpassword='';

    let pwd= /^(?=.*[0-9])(?=.*[!@#$%^&_*])[a-zA-Z0-9!@#$%^&_*]/;
    const letters = /^[A-Za-z/s]*$/;

    if(!(letters.test(req.body.pname)))
    {
        ename ='Please input letters only in Name ';
    }
                        
    if(!(pwd.test(req.body.pword))) 
    { 
        epassword = "Please enter password in the correct format";
    }
    
    if(req.body.cpword!=req.body.pword){      
        ecpassword = "Passwords do not match";
    }

    const uname = req.body.username;
    User.find({username:uname})
        .then((result)=>{
            if(result.length>0){
                eusername='This username already exist. Please try another';
            }
            if(!(ename=='' && epassword=='' && ecpassword=='' && eusername=='' &&ecpassword=='')){
                res.render('register',{tittle:'Register',error_msg_username:eusername,error_msg_name:ename,error_msg_password:epassword,error_msg_cpassword:ecpassword });
            }
            else{
                const user = new User(req.body);
                console.log(req.body);
                user.save()
                    .then((result) => {
                        res.redirect('./login.html');
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
            }
        })
        .catch(function(error){
            console.log("Error authenticating user: ");
            console.log(error);
        });
})  

router.post('/user_login',(req,res)=>{    
    const uname = req.body.username;
    const password = req.body.pword;
    User.find({username:uname,pword:password})
        .then((result)=>{
            if(result.length>0){
                // res.redirect('./menu.html');
                Item.find().sort({name:1})
                    .then((result)=>{
                        res.render('part-menu',{username:uname, tittle:'Menu',items:result })
                    })
                    .catch((err)=>{
                        console.log(err);
                    });
                
            }
            else{
                res.render('login',{tittle:'Login',error:'Please enter valid credentials'});
            }
        })
        .catch(function(error){
            console.log("Error authenticating user: ");
            console.log(error);
        });

});

module.exports = router;