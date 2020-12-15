// FS => file system 
// import
let fs = require("fs");
let cheerio = require("cheerio");



// txt , jpg , img , movie/
let f1KaContent = fs.readFileSync("./f1.txt");
// console.log(f1KaContent + "");


// how create a file
// fs.writeFileSync("./newFile.txt" , "Hii");


let htmlKaData = fs.readFileSync("./index.html");

// jquery se inspired hai cheerio

let ch = cheerio.load(htmlKaData);

let h1Tag = ch("#unique").text();
// <h1>Hii i am h1</h1>

console.log(h1Tag);





