// ES6
// functions => functions ko space miljati hai heap me

// function body
let age = 10;

function sayHi(name) {
    // console.log(name + " says Hiii !!");
    // string interpolation
    let st = `${name} ${age} name + " says Hiii !!" `;
    console.log(`${st} says Hiii !!`);
    return 10;
}

function sayHi(name, age) {
    // console.log(name);
    // console.log(age);
    console.log("I am also sayHi");
}


function sayHello() {
  return "Say Hello";
}

// sayHi("Tony Stark");
// function call
// let val = sayHi();
// console.log( val );


// functions are variables

let fun = function(cb){
    cb();
    return 10;
}

// fun();

//variables can be passed in a function
// functions can also be passed in a function


console.log(fun(sayHi));
