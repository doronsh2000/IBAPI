use forexdb

db.reqHistoryData.update({"forex" : { "reqid" : 5, "name" : "AUD" }},{$pop: {open:1,close:1,low:1,high:1}})
db.reqHistoryData.update({"forex" : { "reqid" : 7, "name" : "NZD" }},{$pop: {open:1,close:1,low:1,high:1}})
 db.reqHistoryData.update({"forex" : { "reqid" : 4, "name" : "JPY" }},{$pop: {open:1,close:1,low:1,high:1}})
 db.reqHistoryData.update({"forex" : { "reqid" : 3, "name" : "CAD" }},{$pop: {open:1,close:1,low:1,high:1}})
 db.reqHistoryData.update({"forex" : { "reqid" : 2, "name" : "EUR" }},{$pop: {open:1,close:1,low:1,high:1}})
 db.reqHistoryData.update({"forex" : { "reqid" : 1, "name" : "GBP" }},{$pop: {open:1,close:1,low:1,high:1}})
 db.reqHistoryData.update({"forex" : { "reqid" : 6, "name" : "CHF" }},{$pop: {open:1,close:1,low:1,high:1}})

