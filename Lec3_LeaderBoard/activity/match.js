let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");

let leaderboard = [];
let count = 0;

// let link = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

function getMatch(link){
    console.log("Sending Request " , count);
    request( link , cb ); // async function
    count++;
}

function cb(error , response , data){
    if(error == null && response.statusCode == 200){
        count--;
        parseData(data);
        console.log("Received Data" , count);
        if(count == 0){
            console.table(leaderboard);
        }
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
    let bothInnings = ch('.card.content-block.match-scorecard-table .Collapsible');
    // fs.writeFileSync("innings.html" , bothInnings);
    for(let i=0 ; i<bothInnings.length ; i++){
        let teamName = ch(bothInnings[i]).find(".header-title.label").text();
        teamName = teamName.split("INNINGS")[0].trim();
        // console.log(teamName);

        let allTrs = ch(bothInnings[i]).find(".table.batsman tbody tr");
        for(let j=0 ; j<allTrs.length-1 ; j++){
            let allTds = ch(allTrs[j]).find("td");
            if(allTds.length  > 1){
                // valid tds
                let batsmanName = ch(allTds[0]).find("a").text().trim();
                let runs = ch(allTds[2]).text().trim();
                let balls = ch(allTds[3]).text().trim();
                let fours = ch(allTds[5]).text().trim();
                let sixes = ch(allTds[6]).text().trim();
                let strikeRate = ch(allTds[7]).text().trim();

                // console.log(`Batsman = ${batsmanName} Runs = ${runs} Balls = ${balls} Fours = ${fours} Sixes = ${sixes} SR = ${strikeRate}`);
                processDetails(teamName,batsmanName , runs , balls , fours , sixes );
            }
        }

        // console.log("#############################################");
    }
}

function processDetails(teamName , batsmanName , runs , balls , fours , sixes ){
    runs = Number(runs);
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);
    for(let i=0 ; i<leaderboard.length ; i++){
        if(leaderboard[i].Team == teamName && leaderboard[i].Batsman == batsmanName){
            leaderboard[i].Runs += runs;
            leaderboard[i].Balls += balls;
            leaderboard[i].Fours += fours;
            leaderboard[i].Sixes += sixes;
            return;
        }
    }
    let batsmanObj = {
        Team : teamName , 
        Batsman : batsmanName ,
        Runs : runs , 
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes
    }
    leaderboard.push(batsmanObj);
}

module.exports = getMatch;

