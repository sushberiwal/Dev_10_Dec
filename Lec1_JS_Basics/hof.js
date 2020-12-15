// high order functions => function which accept functions as a argument is known as hof
// callback functions => function which is passed in a functions is known as callback function

function getFirstName(fullName){
    // return firstname;
    // "STEVE ROGERS"
    return fullName.split(" ")[0];
    // [ "STEVE" , "ROGERS"  ]
}

function getLastName(fullName){
    // return lastname;
    return fullName.split(" ")[1];
}

function sayHi(  fullName , fun  ){
    let name = fun(fullName);
    console.log(name);
}


sayHi("STEVE ROGERS" , getFirstName);
sayHi("BRUCE BANNERS" , getLastName);