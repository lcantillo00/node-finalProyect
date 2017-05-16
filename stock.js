 const mongoose=require('mongoose');

const StockSchema=new mongoose.Schema({
    name:{type:String},
    symbol:{type:String},
    price:{type:Number},
    date:{type:Date, default:Date.now}
});

const Stock=mongoose.model('stock',StockSchema);
module.exports=Stock;
