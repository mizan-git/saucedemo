// global-login.js
const { chromium } =require('@playwright/test');
const{readCsv}=require('./utils/csvFileReader.js')
module.exports=async()=>{
const browser=await chromium.launch();
const page = await browser.newPage();
const csvData = await readCsv('./data/urls.csv');
const userCSVData = await readCsv('./data/users.csv');
const url=csvData[0].url


await page.goto(url);
const usernameInput = 'input[data-test="username"]';
const passwordInput = 'input[data-test="password"]';
const loginButton = 'input[id="login-button"]';
const username=userCSVData[0].username
const password=userCSVData[0].password

// User name

await page.locator(usernameInput).fill(username);
 
// User password

await page.locator(passwordInput).fill(password);





   // Click on login button
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://www.saucedemo.com/v1/inventory.html' }*/),
    page.click(loginButton)
  ]);

  await page.context().storageState({path:'glogin.json'});
  await browser.close();
  
  
  

};