let fs = require("fs");



// promises based functions
let f1KaPendingPromise = fs.promises.readFile("./f1.txt");
let f2KaPendingPromise = fs.promises.readFile("./f2.txt");
let f3KaPendingPromise = fs.promises.readFile("./f3.txt");


// scb => success callback
f1KaPendingPromise.then(function(data){
    console.log(""+data);
});
// fcb => failed callback
f1KaPendingPromise.catch(function(error){
    console.log(error);
});


// scb => success callback
f2KaPendingPromise.then(function(data){
    console.log(""+data);
});
// fcb => failed callback
f2KaPendingPromise.catch(function(error){
    console.log(error);
});


// scb => success callback
f3KaPendingPromise.then(function(data){
    console.log(""+data);
});
// fcb => failed callback
f3KaPendingPromise.catch(function(error){
    console.log(error);
});