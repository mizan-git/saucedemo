const {test,expect}=require('@playwright/test');
const{CommonPage}=require('../pages/CommonPage.js')
const{LoginPage}=require('../pages/Login.js')
const{ProductPage}=require('../pages/Product.js')
const{CartPage}=require('../pages/Cart.js')
const{CheckoutPage}=require('../pages/Checkout.js')
const{readCsv}=require('../utils/csvFileReader.js')

let productsName = [];

test.describe('Verify  url ', () => {
    test('Launch Saucedemo site',async({page})=>{
        const masterpage=new CommonPage(page)
        const csvData = await readCsv('./data/urls.csv');
        const url=csvData[0].url
        await masterpage.openURL(url)
        await expect.soft(page.locator('.login_logo')).toBeVisible();
        
    })
 });

 test.describe('Verify Login page', () => {
   
    test('Login with valid credentials',async({page})=>{
        const masterpage=new CommonPage(page)
        const loginpage=new LoginPage(page)
        const productpage=new ProductPage(page)
        const csvData = await readCsv('./data/urls.csv');
        const url=csvData[0].url
        await masterpage.openURL(url)
        const userData= await readCsv('./data/users.csv');
        await loginpage.login(userData[0].username,userData[0].password)
        await productpage.assertProductPage()
  

    })
    test('Login with invalid credentials',async({page})=>{
        const masterpage=new CommonPage(page)
        const loginpage=new LoginPage(page)
        const csvData = await readCsv('./data/urls.csv');
        const url=csvData[0].url
        await masterpage.openURL(url)
       await loginpage.login('test_user00','test_pass00')
       await loginpage.assertErrorMessage()
      
    })
 });

 test.describe('Verify Product page', () => {
    test.use({storageState:"glogin.json"})
    test('Add product to cart',async({page})=>{
        const masterpage=new CommonPage(page)
        const loginpage=new LoginPage(page)
        const productpage=new ProductPage(page)
        const csvData = await readCsv('./data/urls.csv');
        const url=csvData[0].url
        await masterpage.openURL(url+'/inventory.html')
        await expect.soft(page.locator('#inventory_filter_container')).toContainText('Products');
        productsName=await productpage.addRandomProductInCart()

        for(let x in productsName){
            console.log(productsName[x])
            
        }

    })
    test.skip('Remove product from cart',async({page})=>{
        const masterpage=new CommonPage(page)
        const loginpage=new LoginPage(page)
        const productpage=new ProductPage(page)
       
       
    })
 });
 
test.describe ('Verify Cart page', () => {
    test.use({storageState:"glogin.json"})
    test('Add item from product page and Verify from Cart page',async({page})=>{
        const masterpage=new CommonPage(page)
        const loginpage=new LoginPage(page)
        const productpage=new ProductPage(page)
        const cartpage=new CartPage(page)
        const csvData = await readCsv('./data/urls.csv');
        const url=csvData[0].url
        await masterpage.openURL(url+'/inventory.html')
        // add random product in cart
        productsName=await productpage.addRandomProductInCart()

        await cartpage.gotoCart()
        const cartCount=await cartpage.getCartCount()
        await expect.soft(parseInt(cartCount)).toEqual(productsName.length)

        await cartpage.verifyCartItem(productsName)
        

    })
});


test.describe ('Verify Checkout page', () => {
    test.use({storageState:"glogin.json"})
    test('Verify added item and Checkout',async({page})=>{
        const masterpage=new CommonPage(page)
        const loginpage=new LoginPage(page)
        const productpage=new ProductPage(page)
        const cartpage=new CartPage(page)
        const checkoutpage=new CheckoutPage(page)
        const csvData = await readCsv('./data/urls.csv');
        const userData= await readCsv('./data/users.csv');
        const url=csvData[0].url

        await masterpage.openURL(url+'/inventory.html')
        // add random product in cart
        productsName=await productpage.addRandomProductInCart()

        await cartpage.gotoCart()
        const cartCount=await cartpage.getCartCount()
        // open checkout page
        await checkoutpage.gotoCheckout()
     
        // Insert customer information
        await checkoutpage.clientInformation(userData[0].firstName,userData[0].lastName,userData[0].postalCode)
   

       // verify add product item in checkout
       await cartpage.verifyCartItem(productsName)

        // Verify checkout overview page
       await checkoutpage.assertCheckOutOverviewPage()
        // click finish button
        await checkoutpage.clickFinishButton()
        // verify confirm order
       await checkoutpage.verifyConfirmOrder()


   
    })
    test.use({storageState:"glogin.json"})
    test('Verify Checkout page with empty data',async({page})=>{
        const masterpage=new CommonPage(page)
        const loginpage=new LoginPage(page)
        const productpage=new ProductPage(page)
        const cartpage=new CartPage(page)
        const checkoutpage=new CheckoutPage(page)
        const csvData = await readCsv('./data/urls.csv');
        const userData= await readCsv('./data/users.csv');
        const url=csvData[0].url

        await masterpage.openURL(url+'/inventory.html')
        // add random product in cart
        productsName=await productpage.addRandomProductInCart()

        await cartpage.gotoCart()
        const cartCount=await cartpage.getCartCount()
        // open checkout page
        await checkoutpage.gotoCheckout()

        // Insert customer information
        await checkoutpage.emptyClientInformation()
        await checkoutpage.assertErrorMessage()




    })

});

