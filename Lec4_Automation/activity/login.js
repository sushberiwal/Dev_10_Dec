const puppeteer = require("puppeteer");
const id ="teniv28199@94jo.com";
const pw = "123456789";
let tab;
let idx;
let gCode;
// puppeteer functions => pending promises
// browser launch
let launchPromise = puppeteer.launch({
  headless: false,
  defaultViewport: null,
  args: ["--start-maximized"],
});
launchPromise
  .then(function (browser) {
    let pagesPromise = browser.pages();
    return pagesPromise;
  })
  .then(function (pages) {
    let page = pages[0];
    tab = page;
    let gotoPromise = page.goto("https://www.hackerrank.com/auth/login");
    return gotoPromise;
  })
  .then(function () {
      let idTypedPromise = tab.type("#input-1" , id);  
      return idTypedPromise;
  })
  .then(function(){
      let pwTypedPromise = tab.type("#input-2" , pw);
      return pwTypedPromise;
  })
  .then(function(){
      let loginBtnPromise = tab.click('.ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled');
      return loginBtnPromise;
  })
  .then(function(){
      let waitAndClickPromise = waitAndClick('#base-card-1-link'); // max 30 seconds wait
      return waitAndClickPromise;
  })
  .then(function(){
    let waitAndClickPromise = waitAndClick('a[data-attr1="warmup"]'); // max 30 seconds wait
    return waitAndClickPromise;
  })
  .then(function(){
      let waitPromise = tab.waitForSelector('.js-track-click.challenge-list-item' , {visible:true});
      return waitPromise;
  })
  .then(function(){
    // document.querySelectorAll();
    let allATagsPromise = tab.$$('.js-track-click.challenge-list-item');
    return allATagsPromise;
  })
  .then(function(allATags){
    // [ <a></a> , <a></a> , <a></a> , <a></a>  ];
    // let allLinksPromise = [ Promise<Pending>,Promise<Pending>,Promise<Pending>,Promise<Pending> ];
    let allLinksPromise = [];
    for(let i=0 ; i<allATags.length ; i++){
    let linkPromise = tab.evaluate(  function(elem){  return elem.getAttribute("href");   }  ,   allATags[i] );
    allLinksPromise.push(linkPromise);
    }
    let pendingPromise = Promise.all(allLinksPromise);
    return pendingPromise;
  })
  .then(function(allLinks){
    let completeLinks = [];
    for(let i=0 ; i<allLinks.length ; i++){
      completeLinks.push( `https://www.hackerrank.com${allLinks[i]}` );
    }

    // console.log(completeLinks);
    let firstQuesSolvePromise = solveQuestion(completeLinks[0]);
    return firstQuesSolvePromise;
  })
  .then(function(){
    console.log("First question solved !!!");
  })
  .catch(function (error) {
      console.log(error);
  });


function waitAndClick(selector){
    return new Promise(  function(resolve ,reject){
      let waitPromise = tab.waitForSelector( selector , {visible:true});
      waitPromise.then(function(){
        let clickPromise = tab.click(selector);
        return clickPromise;
      })
      .then(function(){
        resolve();
      })
      .catch(function(error){
        reject(error);
      })
    })
}

function getCode(){
  return new Promise(function(resolve , reject){
    let waitPromise = tab.waitForSelector('.hackdown-content h3');
    waitPromise.then(function(){
      let allCodeNameTagsPromise = tab.$$('.hackdown-content h3');
      return allCodeNameTagsPromise;
    })
    .then(function(allCodeNameTags){
      // [ <h3>C++</h3> ,<h3>Java</h3> ,<h3>Python</h3>];

      let allCodeNamesPromise = [];
      for(let i=0 ; i<allCodeNameTags.length ;i++){
       let codeNamePromise = tab.evaluate( function(elem){ return elem.textContent;  } , allCodeNameTags[i]   )
       allCodeNamesPromise.push(codeNamePromise);
      }
      // let allCodeNamesPromise = [ Promsie<Pending> , Promsie<Pending> , Promsie<Pending>  ];
      let pendingPromise = Promise.all(allCodeNamesPromise);
      return pendingPromise;
    })
    .then(function(allCodeNames){
      //["C++" , "Java" , "python"];
      for(let i=0 ; i<allCodeNames.length ; i++){
        if(allCodeNames[i] == "C++"){
          idx = i;
          break;
        }
      }

      let allCodeDivPromise = tab.$$('.hackdown-content .highlight');
      return allCodeDivPromise;
    })
    .then(function(allCodeDiv){
      //[ <div class="highlight"> </div>,<div class="highlight"> </div>,<div class="highlight"> </div> ]
      let codeDiv = allCodeDiv[idx];
      let codePromise = tab.evaluate(function(elem){return elem.textContent;} , codeDiv);
      return codePromise;
    })
    .then(function(code){
      gCode = code;
      resolve();
    })
    .catch(function(error){
      reject(error);
    })
  })
}

function pasteCode(){
  return new Promise(function(resolve , reject){
    let waitAndClickPromise = waitAndClick('.custom-input-checkbox');
    waitAndClickPromise.then(function(){
      let codeTypedPromise = tab.type(".custominput" , gCode);
      return codeTypedPromise;
    })
    .then(function(){
      let ctrlKeyDownPromise = tab.keyboard.down("Control");
      return ctrlKeyDownPromise;
    })
    .then(function(){
      let aKeyPressPromise = tab.keyboard.press("A");
      return aKeyPressPromise;
    })
    .then(function(){
      let xKeyPressPromise = tab.keyboard.press("X");
      return xKeyPressPromise;
    })
    .then(function(){
      let codeBoxClickPromise = tab.click('.monaco-scrollable-element.editor-scrollable.vs');
      return codeBoxClickPromise;
    })
    .then(function(){
      let aKeyPressPromise = tab.keyboard.press("A");
      return aKeyPressPromise;
    })
    .then(function(){
      let vKeyPressPromise = tab.keyboard.press("V");
      return vKeyPressPromise;
    })
    .then(function(){
      let ctrlKeyUpPromise = tab.keyboard.up("Control");
      return ctrlKeyUpPromise;
    })
    .then(function(){
      resolve();
    })
    .catch(function(error){
      reject(error);
    })
  })
}

function solveQuestion(quesLink){
  return new Promise( function(resolve ,reject){
    let quesGotoPromise = tab.goto(quesLink);
    quesGotoPromise.then(function(){
      let waitAndClickPromise = waitAndClick('div[data-attr2="Editorial"]');
      return waitAndClickPromise;
    })
    .then(function(){
      let codePromise = getCode();
      return codePromise;
    })
    .then(function(){
      // gCode
      let clickPromise = tab.click('div[data-attr2="Problem"]');
      return clickPromise;
    })
    .then(function(){
      let codePastePromise = pasteCode();
      return codePastePromise;
    })
    .then(function(){
      let submitClickedPromise = tab.click('.pull-right.btn.btn-primary.hr-monaco-submit');
      return submitClickedPromise;
    })
    .then(function(){
      resolve();
    })
    .catch(function(error){
      reject(error);
    })

  });
}