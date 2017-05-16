const express=require('express');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

var app =express();
const Stock=require('./stock');
const Port=8890;
mongoose.connect('mongodb://stocklily:lily@ds137141.mlab.com:37141/stocklily');



app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.post('/createStock',function(req,res){

     const stockObj=new Stock({
        name:req.body.name,
        symbol:req.body.symbol,
        price:req.body.price,

    });

stockObj.save((err)=>{
    if(err){res.send(err);}
    res.json({message:"created stock"});

});

});
app.get('/stock',function(req,res){
    Stock.find((err,stocks)=>{
    if(err){
        res.send(err);
    }
    res.json(stocks);
});
});

app.get('/stock/:id',function(req,res){
    Stock.findById(req.params.id,(err,stock)=>{
     if(err){
         res.send(err);
     }
     res.json(stock);
 })
});

app.put('/stock/:id',function(req,res){
    Stock.findById(req.params.id,(err,stock)=>{
        if(err){
            res.send();
        }
        if(req.body.name){
            stock.name=req.body.name;
        }
        if(req.body.age){
            stock.age=req.body.age;
        }
        if(req.body.pride){
            stock.pride=req.body.pride;
        }
        if(req.body.gender){
            stock.gender=req.body.gender;
        }
        stock.save((err)=>{
            if(err){
                res.send(err)
            }
            res.json({message:"update stock"});
        });
    });
});

app.delete('/stock/:id',function(req,res){
  Stock.remove({_id:req.params.id},(err,stock)=>{
      if(err){
          res.send(err);
      }
      res.json({message:"delete stock"});
  })
});
app.listen(8890);
