var a=1;

setInterval(function(){
if (a==1){
   console.log("exiting!");
   process.exit(50);
}
},5000);

console.log('after intervl!');
