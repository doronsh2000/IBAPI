
var dateformat=require('dateformat');

var now=new Date();
/*
console.log(dateformat(now,"yyyymmdd H:MM:ss"));
var hourago =now.getTime() - (1000*60*60);
console.log(dateformat(hourago,"yyyymmdd H:MM:ss"));
*/
var minutes=now.getMinutes();
if (minutes == '00' || minutes == '35') {
console.log("minutes are: " + minutes);
}




