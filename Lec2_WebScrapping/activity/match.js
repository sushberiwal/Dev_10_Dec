let request = require("request");
let cheerio = require("cheerio");
let fs = require("fs");



// let link = "https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard";

function getMatch(link){
    request( link , cb );
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
    let bothInnings = ch('.card.content-block.match-scorecard-table .Collapsible');
    // fs.writeFileSync("innings.html" , bothInnings);
    for(let i=0 ; i<bothInnings.length ; i++){
        let teamName = ch(bothInnings[i]).find(".header-title.label").text();
        teamName = teamName.split("INNINGS")[0].trim();
        console.log(teamName);

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
                processDetails(teamName,batsmanName , runs , balls , fours , sixes , strikeRate);
            }
        }

        console.log("#############################################");
    }
}


function checkTeamFolder(teamName){
    // teampath = "./IPL/Mumbai Indians"
    let teamPath = `./IPL/${teamName}`;
    return fs.existsSync(teamPath);
}

function checkBatsmanFile(teamName , batsmanName){
    // javascript object notation => most used 
    // javascript => scripting language => v8 engine => nodejs => browser
    // NodeJs => provides a runtime environment for javascript and have other modules like fs , os , http , can manage backend
    // json => web data exchange between client and server => most cases me json data hai

    let batsmanPath = `./IPL/${teamName}/${batsmanName}.json`;
    return fs.existsSync(batsmanPath);
}

function updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    let batsmanPath = `./IPL/${teamName}/${batsmanName}.json`;
    let batsmanFile = fs.readFileSync(batsmanPath);
    batsmanFile = JSON.parse(batsmanFile);
    let inning = {
        Runs : runs,
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes , 
        SR : strikeRate
    }
    batsmanFile.push(inning);
    fs.writeFileSync(batsmanPath , JSON.stringify(batsmanFile));
}

function createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    let batsmanPath = `./IPL/${teamName}/${batsmanName}.json`;
    let batsmanFile = [];
    let inning = {
        Runs : runs,
        Balls : balls , 
        Fours : fours , 
        Sixes : sixes , 
        SR : strikeRate
    }
    batsmanFile.push(inning);
    fs.writeFileSync(batsmanPath , JSON.stringify(batsmanFile));
}

function createTeamFolder(teamName){
    let teamPath = `./IPL/${teamName}`;
    fs.mkdirSync(teamPath);
}

function processDetails(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
    let teamExist = checkTeamFolder(teamName);
    if(teamExist){
        let batsmanExist = checkBatsmanFile( teamName ,batsmanName);
        if(batsmanExist){
            updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
        }
        else{
            createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
        }
    }
    else{
        createTeamFolder(teamName);
        createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
    }
}

module.exports = getMatch;

