var fs=require('fs');
signal='SELL';
data='NZD';



  var files_to_delete='/IB_TI/node-talib-0.4.0/examples/'+ data+'.first';
             fs.unlink(files_to_delete);

    var files_to_delete='/IB_TI/node-talib-0.4.0/examples/'+ data+'-'+signal+'.lock';
                 fs.unlink(files_to_delete);



setTimeout(function(){console.log('program continue'),2000}) ;
