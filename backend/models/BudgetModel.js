const mongoose=require('mongoose')
const BudgetSchema=new mongoose.Schema({
    category:{
        type:String,
        required:true,
       
    },
    budget:{
        type:Number,
        required:true,
    },
    userData:{
        type:String,
        required:true,
    },
    monthlyBudget:{
        type:String,
        required:true
    },
},{collection:'Budget'})

module.exports = mongoose.model('Budget',BudgetSchema)