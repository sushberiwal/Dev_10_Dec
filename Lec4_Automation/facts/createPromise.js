let fs = require("fs");


function myFunction(filePath){
    return new Promise( function(resolve , reject){
        fs.readFile( filePath , function(error , data){
            if(error){
                // data nhi ata
                reject(error);
            }
            else{
                // data successfully ajata hai
                resolve(data);
            }
        })
    });
}


// promises based functions
let f1KaPendingPromise = myFunction("./f1.txt");
console.log(f1KaPendingPromise);


// scb => success callback
f1KaPendingPromise.then(function(data){
    console.log(""+data);
});
// fcb => failed callback
f1KaPendingPromise.catch(function(error){
    console.log(error);
});