const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const axios = require("axios");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function (req, res) {
    var firstName = req.body.fName;
    var lastName = req.body.lName;
    var email = req.body.email;

    var data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    var jsonData = JSON.stringify(data);

    var options = {
        //url: "https://us10.api.mailchimp.com/3.0/lists/6504fdead5",
        method: "POST",
        headers: {
            "Authorization": "paulo1 4d008fe94cc3ac1f5bac1970492c20a0-us10"
        },
        body: jsonData
    };
/*
    request(options, function (error, response, body) {
        if (error) {
            res.sendFile(__dirname + "/failure.html");
        } else {
            if (response.statusCode === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        }
    });
    */


    axios.get("https://us10.api.mailchimp.com/3.0/lists/6504fdead5", options)
        .then(response => {
            console.log("Axios " + response.status);
            //res.send(response.data.status);
            if (response.status === 200) {
                res.sendFile(__dirname + "/success.html");
            } else {
                res.sendFile(__dirname + "/failure.html");
            }
        })
        .catch(error => {
            res.sendFile(__dirname + "/failure.html");
            console.log("Axios " + error);
        });


});

app.post("/failure", function (req, res) {
    res.redirect("/");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running on port 3000");
});


//4d008fe94cc3ac1f5bac1970492c20a0-us10


//list id
//6504fdead5
