const express= require("express");
const app=express();
const bodyParser=require("body-parser");
const request=require("request");
const https=require("https");



const { options } = require("request");
const { STATUS_CODES } = require("http");

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));


app.post("/",function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data={
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields: {
                    FNAME:firstName,
                    LNAME:lastName
                }
            }
        ]
    };

    const jSonData = JSON.stringify(data);

    const url="https://us14.api.mailchimp.com/3.0/lists/b9b9ec072b";

    const options={
        method: 'POST',
        auth: "ashu1:ebb620be4f1a4c89d4da0ca1565a344c-us14"
    }

    const request = https.request(url,options,function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }else{
            res.sendFile(__dirname+"/failure.html");
        }
        

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    });

    request.write(jSonData);
    request.end();

    // console.log(firstName,lastName,email);
});



app.post("/failure", function(req,res){
    res.redirect("/")
})


app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("Your server is running on port 3000.");
});




// API key
// ebb620be4f1a4c89d4da0ca1565a344c-us14

// List ID
// b9b9ec072b