const mongoose = require('mongoose');
const mongoURI= 'mongodb+srv://fastfood:vibhor17@cluster0.b69pbbc.mongodb.net/fastfood?retryWrites=true&w=majority'
const mongodb =async()=>{
    await mongoose.connect(mongoURI,{useNewUrlParser: true },(err,result)=>{
        if(err)console.log("__",err)
        else{
        console.log("connected");
        const fetch_data = mongoose.connection.db.collection("food_items");
        fetch_data.find({}).toArray(async function(err,data){
            const food_category = await mongoose.connection.db.collection("food_category");
            food_category.find({}).toArray(function(err,catData){
                if(err)console.log(err);
            else{
        global.food_items = data;
            global.food_category = catData;
    }
            })
    //         if(err)console.log("___",err)
    //         else{
    //     global.food_items = data;

    // }
        })
 } });
}

module.exports = mongodb;