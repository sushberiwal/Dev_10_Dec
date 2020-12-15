// top to down and left to right
console.log("Hello world !");

// datatypes => Number , Boolean , undefined , null  , string , object

// variables => ECMA => Specification javascript code syntax

// ES6 => let , const

// let => block scoped variable

let a = 10;
let b = 'Hey i m a string';
let c = true;
let d;
console.log(d);

//const => constant => block scoped
const pi = 3.14;
console.log(pi);


if(true){
    let e = "something";
    if(true){
        e = "new value";
    }
    if(true){
        console.log(e);
    }
}

// arrays
let values = ["Steve" , "Tony" , "Natasha"  ,  {
    "Full Name" : "Steve Rogers",
    age : 77 ,
    movies : ["first avenger" , "winter soldier" , "civil war"],
    skills : ["martial arts" , "taekwondo"]   
},  123 , true , false , [ 1 , 2 , 3 , 4] ];
// pop , push , shift , unshift , splice , slice

// let mKey = "movies"
console.log("movie is "   ,  values[3].movies[1]);


// objects => key value pairs
// keys => unique , values may not be unique
let obj = {
    "Full Name" : "Steve Rogers",
    age : 77 ,
    movies : ["first avenger" , "winter soldier" , "civil war"],
    skills : ["martial arts" , "taekwondo"]   
}
// console.log(obj.movies);
let key = "age";
// dot notation => literal check
// console.log(obj.key);
// bracket notation
console.log(obj[key]);
console.log(  obj["movies"][1] );
console.log(  obj["Full Name"] );

module.exports = values;