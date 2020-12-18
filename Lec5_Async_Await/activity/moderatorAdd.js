const puppeteer = require("puppeteer");
const challenges = require("./challenges");
const id = "teniv28199@94jo.com";
const pw = "123456789";

(async function () {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      defaultViewport: null,
      args: ["--start-maximized"],
    });
    let pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1", id);
    await tab.type("#input-2", pw);

    // waitForNavigation => jb bhi click ho , and navigation ho us click se then apply waitForNavigation parallely with click function
    await Promise.all([
      tab.waitForNavigation({ waitUntil: "networkidle2" }),
      tab.click(
        ".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled"
      ),
    ]); //navigation

    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]', {
      visible: true,
    });
    await tab.click('div[data-analytics="NavBarProfileDropDown"]');
    await tab.waitForSelector(
      'a[data-analytics="NavBarProfileDropDownAdministration"]',
      { visible: true }
    );

    await Promise.all([
      tab.waitForNavigation({ waitUntil: "networkidle2" }),
      tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]'),
    ]); //navigation
    let bothLis = await tab.$$(".nav-tabs.nav.admin-tabbed-nav li");
    let manageChallengeLi = bothLis[1];
    await Promise.all([
      tab.waitForNavigation({ waitUntil: "networkidle2" }),
      manageChallengeLi.click(),
    ]); //navigation

    await addModerators(tab , browser);
    await browser.close();
  } catch (error) {
    console.log(error);
  }
})();



async function addModerators(tab , browser){
    try{
        await tab.waitForSelector('.backbone.block-center' , {visible:true});
        let allQuestions = await tab.$$('.backbone.block-center');
        let allLinks = [];

        for(let i=0 ; i<allQuestions.length ; i++){
            let qLink =await tab.evaluate( function(elem){ return elem.getAttribute("href");  }  , allQuestions[i]);
            qLink = `https://www.hackerrank.com${qLink}`;
            allLinks.push(qLink);
        }
        // parallely open tab for each question
        // and in each function addModerator
        let allModeratorsPromise = [];
        for(let i=0 ; i<allLinks.length ; i++){
           let addModeratorPromise =  addModeratorToASingleQues(allLinks[i] , browser);
           allModeratorsPromise.push(addModeratorPromise);
        }
        await Promise.all(allModeratorsPromise);
        let allLis = await tab.$$(".pagination li");
        let nextBtn = allLis[allLis.length-2];
        let isDisabled = await tab.evaluate( function(elem){ return elem.classList.contains("disabled");  }  , nextBtn);
        if(isDisabled){
            return;
        }
        else{
            await Promise.all(   [ tab.waitForNavigation({waitUntil:"networkidle2"}) , nextBtn.click() ] );
            await addModerators(tab , browser);
        }
    }
    catch(error){
     return error;
    }
}


async function handleConfirmBtn(tab){
    try{
        await tab.waitForSelector('#confirm-modal' ,{visible:true , timeout:5000});
        await tab.click('#confirmBtn');
    }
    catch(error){
        return;
    }
}

async function addModeratorToASingleQues(qLink , browser){
    try{
        let newTab = await browser.newPage();
        await newTab.goto(qLink);
        await handleConfirmBtn(newTab);
        await newTab.waitForSelector('li[data-tab="moderators"]' , {visible:true});
        await Promise.all(  [ newTab.waitForNavigation({waitUntil:"networkidle2"})  , newTab.click('li[data-tab="moderators"]') ] );
        await newTab.waitForSelector('#moderator' , {visible:true});
        await newTab.type('#moderator' , "sushant");
        await newTab.click('.btn.moderator-save');
        await newTab.click('.save-challenge.btn.btn-green');
        await newTab.close();
    }
    catch(error){
        return error;
    }
}