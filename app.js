const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const fs = require('fs');
const userRoutes = require('./routes/userRoutes');
const Item = require('./models/item');
const My_cart = require('./models/my_cart');
const Order = require('./models/order');
const User= require('./models/user');

//connect to MongoDB
const dbURI = 'mongodb+srv://eat_your_fill:test@eatyourfill.rfebuxv.mongodb.net/eat_your_fill';
mongoose.connect(dbURI)
    .then((result)=>{
        fs.readFile('./menu_list.json', 'utf-8', (err, jsonString)=>{
            if(err){
                console.log(err);
            }
            else{
                try{
                    const data = JSON.parse(jsonString);
                    for (var i = 0; i<data.foodItems.length; i++){
                        let vimage = data.foodItems[i].image;
                        let vname = data.foodItems[i].name;
                        let vprice = data.foodItems[i].price;
                        Item.find({name:vname,price:vprice,image:vimage})
                            .then((result)=>{
                                if(result.length==0){
                                    const item = new Item(data.foodItems[i]);
                                    item.save()
                                        .then((result) => {
                                            console.log('Saving_the file');
                                        })
                                        .catch((err)=>{
                                            console.log(err);
                                        })
                                }
                                else{
                                    console.log('Already exist');
                                }
                            
                            })
                            .catch(function(error){
                                console.log(error);
                            });
                        
                    }       
                }catch(err){
                    console.log('Error parsing JSON and saving data',err);
                }
            }
        });
        app.listen(3010);
    })
    .catch((err)=>console.log(err))

const app = express();
app.set('view engine','ejs'); 

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));//passing data in the usable format on passing form
app.use(morgan('dev')); //Third party middleware


app.get('/', (req, res)=>{
    res.render('index',{tittle:'Home'});  
});

app.get('/index.html',(req,res)=>{    
    res.render('index',{tittle:'Home'});
});

app.get('/login.html',(req,res)=>{    
    res.render('login',{tittle:'Login', error:''});
});

app.get('/register.html',(req,res)=>{   
    res.render('register',{tittle:'Sign Up',error_msg_username:'',error_msg_name:'',error_msg_password:'',error_msg_cpassword:''});
});


app.post('/my_cart',(req,res)=>{
    const uname = req.body.username;
    My_cart.find({username:uname}).sort({createdAt: -1})
        .then((result)=>{
            res.render('mycart',{items:result, username:uname, tittle:'My Cart'})
        })
        .catch((err)=>{
            console.log(err);
        });
})


app.post('/searchItems',(req,res)=>{
    const item_name = req.body.isearch;
    console.log(req.body);
    Item.find({name:{$regex:item_name,$options:'i'}}).sort({name: 1})
        .then((result)=>{            
            res.render('part-menu',{items:result, tittle:'Menu',username:req.body.username});            
        })
        .catch(function(error){
            console.log(error);
        });
})



app.post('/my_profile',(req,res)=>{
    const uname = req.body.username;
    let name='';
    let email='';
    User.find({username:uname})
        .then((result)=>{   
        
            result.forEach(userf => {
                name = userf.pname;
                email = userf.email;
                console.log(name);
            })
            
            Order.find({username:uname}).sort({createdAt: -1})
                .then((result)=>{
                    console.log(result);  
                    res.render('profile',{username:uname,name:name,email:email,tittle:'My Profile',items:result })
                })
                .catch((err)=>{
                    console.log(err);
                })
        })
        .catch((err)=>{
            console.log(err);
        });
    
})

app.post('/add_to_cart',(req,res)=>{
    console.log(req.body);
    const uname = req.body.username;
    if(req.body.quantity<=0){
        Item.find().sort({name: 1})
                .then((result)=>{
                        res.render('part-menu',{username:uname, tittle:'Menu',items:result })
                })
                .catch((err)=>{
                    console.log(err);
                });
    }
    else{
        const cart = new My_cart(req.body);
        cart.save()
            .then((result) => {
                console.log('data saved');
                Item.find().sort({name: 1})
                    .then((result)=>{
                            res.render('part-menu',{username:uname, tittle:'Menu',items:result })
                    })
                    .catch((err)=>{
                        console.log(err);
                    });
                
            })
            .catch((err)=>{
                console.log(err);
            })
    }
    

})

app.post('/delete_in_cart',(req,res)=>{
    console.log('Request for deletion is: ');
    console.log(req.body);
    const uname = req.body.username;

    My_cart.findOneAndDelete({username:uname,item_name:req.body.item_name,quantity:req.body.quantity})
        .then((result) => {
            console.log('item deleted');
            My_cart.find({username:uname})
                .then((result)=>{
                        res.render('mycart',{username:uname, tittle:'My cart',items:result });
                })
                .catch((err)=>{
                    console.log(err);
                });           
        })
        .catch((err)=>{
            console.log(err);
        })
})

app.post('/replace_in_cart',(req,res)=>{
    console.log('Request for updation is: ');
    console.log(req.body);
    const uname = req.body.username;

    if(req.body.new_quant >0){
        My_cart.findOneAndReplace({username:uname,item_name:req.body.item_name,quantity:req.body.in_quant},{username:uname,item_name:req.body.item_name,item_price:req.body.item_price,quantity:req.body.new_quant},{returnNewDocument:true})
        .then((result) => {
            console.log('item replaced');
            My_cart.find({username:uname}).sort({createdAt: -1})
                .then((result)=>{
                        res.render('mycart',{username:uname, tittle:'My cart',items:result });
                })
                .catch((err)=>{
                    console.log(err);
                });           
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else{
        My_cart.find({username:uname}).sort({createdAt: -1})
                .then((result)=>{
                        res.render('mycart',{username:uname, tittle:'My cart',items:result });
                })
                .catch((err)=>{
                    console.log(err);
                });  
    }

    
})

app.post(('/to_menu'),(req,res)=>{
    console.log(req.body);
    const uname = req.body.username;
    Item.find().sort({name: 1})
        .then((result)=>{
            res.render('part-menu',{username:uname, tittle:'Menu',items:result })
        })
        .catch((err)=>{
            console.log(err);
        });
})

app.post(('/place_order'),(req,res)=>{
    const uname = req.body.username;
    My_cart.find({username:uname})
        .then((result)=>{
            console.log(result);
            Order.insertMany(result)
                .then((result)=>{
                    console.log('Saving into order collection');
                    My_cart.deleteMany({username:uname})
                    .then((result) => {
                        console.log('item deleted from the original file');
                        res.render('confirmation_page',{tittle:'Confirmation Page'})
                    })
                    .catch((err)=>{
                        console.log(err);
                    })
                })
        })
        .catch((err)=>{
            console.log(err);
        });
})

//user Routes
app.use(userRoutes);


//404 Error
app.use((req,res)=>{
    res.status(404).render('404'); 
});   