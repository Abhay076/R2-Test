const express = require("express");
const path = require("path");
const port = 8000;
const db = require("./config/mongoose");
const Product = require("./models/products");
const app = express();

app.set("view engine", "ejs");

app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded());
app.use(express.static("assets"));

var productList = [
  {
    productId:"123",
    quantity:"10"
  },
  {
    productId:"143",
    quantity:"14"
  },
  {
    productId:"193",
    quantity:"17"
  }
];
app.get('/',function(req,res){
    // Product.find({},function(err,products){
    //     if(err){
    //         console.log('Error in contact')
    //         return;
    //     }
    //     return res.render('home',{
    //         title:"Products",
    //         product_list:productList
    //     })
    // })
    return res.render('home',{
        title:"Products",
        product_list:productList
    });
});
//for substract qty
// handleIncreaseQty=(product)=>{
    
// }

app.get('/subtract-product',function(req,res){
    let id = req.query.id;
    let ProductIndex = productList.findIndex(product=> product.quantity
        == quantity);
    if(ProductIndex!=-1){
        productList.splice(ProductIndex,1);
    }
    Product.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error');
            return;
        }
        return res.redirect('back');
    });
});


//add 

app.post('/add-product', function(req,res){
    productList.push({
        productId: req.body.productId,
        quantity: req.body.quantity
    });
    productList.push(req.body);
    Product.create({
        productId: req.body.productId,
        quantity: req.body.quantity
    }, function(err,newProduct){
        if(err){
            console.log('err');
            return;
        }
        console.log('*******',newProduct);
        return res.redirect('back');
    });
});

app.listen(port, function (err) {
  if (err) {
    console.log("Error", err);
    return;
  }
  console.log("My sever is running on port:", port);
});
