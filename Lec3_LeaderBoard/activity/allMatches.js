// get html of all matches
let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");
const getMatch = require("./match");


function getAllMatches(link){
    request(link , cb);
}


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
    let allATags = ch('a[data-hover="Scorecard"]');
    // allATags
    // console.log(allATags);
    for(let i=0 ; i<allATags.length ; i++){
        let link = ch(allATags[i]).attr("href");
        let completeLink = `https://www.espncricinfo.com${link}`;
        // console.log(completeLink);
        getMatch(completeLink);
    }
    
}


module.exports = getAllMatches;