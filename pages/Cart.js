const { expect } = require('@playwright/test');


exports.CartPage= class CartPage{

    constructor(page){
        this.page=page
        //Cart
        this.cartbutton=page.locator('#shopping_cart_container')
        this.cartCount=page.locator('.shopping_cart_badge')
        this.cartItems = page.locator('.inventory_item_name'); 

    }

    async gotoCart(){
        await this.cartbutton.click()
    }
    async getCartCount(){
        return await this.cartCount.innerText()
    }

    async verifyCartItem(productsName){
        const cartItemCount = await this.page.locator('.inventory_item_name').count();
        for (let i = 0; i < cartItemCount; i++) {
            const itemName = await this.cartItems.nth(i).innerText();
            expect.soft(itemName).toContain(productsName[i]);
        }
    }
   


}