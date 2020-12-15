let fs = require("fs");


console.log("start");


let f1KaContent = fs.readFileSync("./f1.txt"); // 100gb
console.log(f1KaContent+"");



console.log("end");