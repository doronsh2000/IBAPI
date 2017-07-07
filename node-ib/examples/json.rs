var fs=require("fs");
var  content=fs.readFileSync("json_data.txt");

var content={
             "username":"xyz",
             "password":"xyz@123",
             "email":"xyz@xyz.com",
             "uid": 1100
 };

console.log("typeof content is:" + typeof content);
//var jsonContent=JSON.parse(content);
console.log("username is: " , content.email);
