// espn ka home page ki html leke ajuan
let request = require("request");
let cheerio = require("cheerio");
const getAllMatches = require("./allMatches");



let link = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

request( link , cb );

function cb(error , response , data){
    if(error == null && response.statusCode == 200){
        parseData(data);
    }
    else if(response.statusCode == 404){
        console.log("page not found !!");
    }
    else{
        console.log(error);
    }
}


function parseData(html){
    let ch = cheerio.load(html);
    let link = ch(".widget-items.cta-link a").attr("href");
    let completeLink = `https://www.espncricinfo.com${link}`;
    getAllMatches(completeLink);
}

