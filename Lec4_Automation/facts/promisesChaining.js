let fs = require("fs");

//facts about promises =>
// 1. you get a Pending Promise initially Promise<Pending>
// 2. Pending Promise can be resolved in two states => success and failed
// 3. then and catch are functions which are called on pending promise
// 4. then also gives you a pending promise known as then ka promise
// 5. then ka promise is always in sync with scb


let f1KaPromise = fs.promises.readFile("./f1.txt");

// 2k.then()
f1KaPromise.then(function (data) {
    console.log(data+"");
    let f2KaPromise = fs.promises.readFile("./f2.txt");
    return f2KaPromise;
})
.then(function(data){
    console.log(data+"");
})
.catch(function (error) {
    console.log(error);
});


