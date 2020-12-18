// async keyword => function ke prefix pe lagate ho 
// async function => always returns a promise 
// await keyword => await keyword can only be used inside async function
let fs = require("fs");


console.log("start");
//IIFE => Immediately invoked function expressions

// self invoking function

(async function(){
    try{
        let f1Promise = fs.promises.readFile("./f1.txt"); // wait till file reads
        let f2Promise = fs.promises.readFile("./f2.txt");
        let bothData = await Promise.all(  [f1Promise , f2Promise ]);
        console.log(bothData);
        // await will wait until the pending promise is resolved or rejected
    }
    catch(error){
        console.log("inside catch");
        console.log(error);
    }
})();



console.log("end");





