var productTemplate =
'<h3>Name: <%= name %></h3>'+
'<h3>Price: <%= price %></h3>'+
'<h3>Symbol: <%= symbol %></h3>';

var stocks=[];


var makeTemplate=function(data){
   var li=document.createElement('li');
   var prodList=document.querySelector('.food-list');
   var compiled=_.template(productTemplate);
   var prodHtml=compiled(data);
   li.innerHTML=prodHtml;
   prodList.insertBefore(li,prodList.firstChild);
}
var updateProducts=function(){
   var productData=stocks[stocks.length-1];
   makeTemplate(productData);
}

var getValues= function(){
   var name=document.querySelector('input[name=namefood]').value;
   var price=document.querySelector('#price').value;

   var symbol=document.querySelector('#symbol').value;
    // var id=document.querySelector('#id').value;
   return {
       name:name,
       symbol:symbol,
       price:price,
    //    id:id
   };
};
var makeList=function(){
   stocks.forEach(function(product){
       makeTemplate(product);
    //    console.log(product);
   });
};

var getAllProducts= function(){
   fetch('/stock')
   .then(function(resp){
       return resp.json();

   })
   .then(function(data){
       stocks=stocks.concat(data);
    //    console.log(stocks);
       makeList();
   });

};

(function(){
   getAllProducts();
   var form=document.querySelector('form');
   // var btn=document.querySelector('#submit')
   form.addEventListener('submit',function(e){
       e.preventDefault();
    //    console.log(form);
       var values=getValues();
    //    console.log(values);
       fetch('/createStock',{
           method:'post',
           headers:{
               'Accept':'application/json',
               'Content-Type':'application/json'
           },
           body:JSON.stringify(values)
       })
       .then(function(resp){
           return resp.json();
       })
       .then(function(createdProduct){
           stocks.push(createdProduct);
        //    console.log(stocks);
           updateProducts();
       })
       location.reload();
       return false;
   })
   // document.getElementById("btnShow").addEventListener('get',function(e){
   //     e.preventDefault();
   //     getAllProducts();
   //     var values=getValues();
   //     console.log("dfrgh");
   //
   //     var getAllProducts= function(){
   //        fetch('/stock')
   //        .then(function(resp){
   //            return resp.json();
   //
   //        })
   //        .then(function(data){
   //            stocks=stocks.concat(data);
   //            console.log(stocks);
   //            makeList();
   //        });
   //
   //     };
   // });
// document.getElementById("id").addEventListener("DELETE", function(e){
//     e.preventDefault();
//     var values=getValues();
//     fetch('/stock/:id',{
//         method:'delete',
//         headers:{
//             'Accept':'application/json',
//             'Content-Type':'application/json'
//         },
//         body:JSON.stringify(values)
//     })
//     .then(function(deleteStock){
//         stock.remove({
//             _id:req.params.id
//         },function(err,stock){
//             if(err){
//                 res.send(err);
//             }
//             res.json({message:'delete stock'});
//         });
//     });
// });
})();
