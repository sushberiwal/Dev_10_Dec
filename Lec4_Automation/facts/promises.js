let fs = require("fs");



// promises based functions
let f1KaPendingPromise = fs.promises.readFile("./f1.txt");

console.log(f1KaPendingPromise);


// scb => success callback
f1KaPendingPromise.then(function(data){
    console.log(f1KaPendingPromise);
    console.log(""+data);
});


// fcb => failed callback
f1KaPendingPromise.catch(function(error){
    console.log(error);
});