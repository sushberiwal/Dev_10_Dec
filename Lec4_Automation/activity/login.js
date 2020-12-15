const puppeteer = require("puppeteer");

// puppeteer functions => pending promises

// browser launch

let launchPromise = puppeteer.launch({headless:false});

launchPromise.then(function(browser){
    let pagesPromise = browser.pages();
    return pagesPromise;
})
.then(function(pages){
    let page = pages[0];
    let gotoPromise = page.goto("https://www.google.com");
    return gotoPromise;
})
.then(function(){
    console.log("Google homepage opened !!");
})
.catch(function(error){

})