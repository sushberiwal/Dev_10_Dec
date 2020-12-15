let fs = require("fs");



// promises based functions
let f1KaPendingPromise = fs.promises.readFile("./f1.txt");

// promise
f1KaPendingPromise.then(function(data){
    console.log(""+data);
    let f2KaPendingPromise = fs.promises.readFile("./f2.txt");
    f2KaPendingPromise.then(function(data){
        console.log(""+data);
        let f3KaPendingPromise = fs.promises.readFile("./f3.txt");
        f3KaPendingPromise.then(function(data){
            console.log(""+data);
        });
    });
});

// fcb => failed callback
f1KaPendingPromise.catch(function(error){
    console.log(error);
});