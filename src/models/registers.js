const mongoose=require("mongoose");

const employeeSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    phone:{
        type:Number,
        required: true,
        unique: true
    },
    address:{
        type:String,
        required: true,
        unoque:true
    },
    password:{
        type:String,
        required: true
    },
    confirmpassword:{
        type:String,
        required: true
    },


})

// creating a collection


const Register=new mongoose.model("Register",employeeSchema);

module.exports=Register;