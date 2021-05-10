const express= require("express");
const app=express();
const path=require("path");
const hbs= require("hbs");

require("./db/conn");
const Register= require("./models/registers"); 
const async = require("hbs/lib/async");

const port=process.env.PORT || 2700;

const static_path=path.join(__dirname,"../public");
const template_path=path.join(__dirname,"../templates/views");
const partials_path=path.join(__dirname,"../templates/partials");

app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));

app.set("view engine", "hbs");
app.set("views",template_path);
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{
    res.render("start");
});
app.get("/start",(req,res)=>{
    res.render("start");
});

app.get("/home",(req,res)=>{
    res.render("index");
});

app.get("/register",(req,res)=>{
    res.render("register")
});

app.get("/index",(req,res)=>{
    res.render("index")
});

app.get("/login",(req,res)=>{
    res.render("login") 
});

app.get("/logout",(req,res)=>{
    res.render("start");
});

app.get("/kart",(req,res)=>{
    res.render("cart") 
});

// Food Pages Rendering
app.get("/beverages",(req,res)=>{
    res.render("beverages") 
});
app.get("/cake",(req,res)=>{
    res.render("cake") 
});
app.get("/bread",(req,res)=>{
    res.render("bread") 
});


app.post("/login", async (req,res)=>{
    console.log("Yaha toh pahuch gaye");
    try {
        const email=req.body.email;
        const thispassword= req.body.password;

        const useremail=await Register.findOne({email});
        console.log(useremail);

        if(useremail.password === thispassword){
            res.status(201).render("success");
        }else{
            res.render("fail");
        }

    } catch (error) {
        res.status(400).send("This is a problem");
        console.log(error);
    }
});

app.post("/register", async(req,res)=>{
    try{
        const password=req.body.password;
        const cpassword=req.body.confirmpassword;

        if(password === cpassword){
            const registreEmployee=new Register({
                username: req.body.username,
                email: req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                password: req.body.password, 
                confirmpassword: req.body.confirmpassword
            })
            const registered= await registreEmployee.save();
            res.status(201).render("index");
        }else{
            res.send("password are not matching");
        }
    }
    catch(error){
        res.status(400).send(error);
    }
});

app.listen(port,()=>{
    console.log(`server is running at port no ${port}`);
});