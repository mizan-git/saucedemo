const { expect } = require('@playwright/test');


exports.ProductPage= class ProductPage{

    constructor(page){
        this.page=page
        //Product
        this.productFilter=page.locator('#inventory_filter_container')
        this.addToCartButtons= page.locator('.btn_primary.btn_inventory')
        this.productNameElements = page.locator('.inventory_item_name'); 
        this.scrollDownAction= page.getByText('LinkedIn')

        
        
      

    }

    async addRandomProductInCart(){
    
        const addToCartButtons = await this.page.locator('.btn_primary.btn_inventory').count();

        const selectedProductNames = [];

        // Randomly select 3 items to add to the cart
        console.log(addToCartButtons)
        const randomIndexes = await this.getRandomIndexes(addToCartButtons, 3);

       
        for (const index of randomIndexes) {

            //await this.scrollDownAction.scrollIntoViewIfNeeded()
            // Get the product name and save it

            const productName = await this.productNameElements.nth(index).textContent();
            selectedProductNames.push(productName);

            // Add the item to the cart
           await this.addToCartButtons.nth(index).click();
        }

            
    
    return selectedProductNames
    }

    //  Get random Items 
     async getRandomIndexes(max, count) {
        const indexes = new Set();
        while (indexes.size < count) {
        const randomIndex = Math.floor(Math.random() * max);
        indexes.add(randomIndex);
        }
        return Array.from(indexes);
    }

    async scrollDown(){
        await this.scrollDownAction.scrollIntoViewIfNeeded()
      
       }
       async assertProductPage(){
        await expect.soft(this.productFilter).toContainText('Products');
       }
    

}