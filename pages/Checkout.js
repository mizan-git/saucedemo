const { expect } = require('@playwright/test');


exports.CheckoutPage= class CheckoutPage{

    constructor(page){
        this.page=page
        //Checkout
        this.chackOut= page.getByRole('link', { name: 'CHECKOUT' });
        this.userFName=page.locator('[data-test="firstName"]')
        this.userLName=page.locator('[data-test="lastName"]')
        this.userZipCode=page.locator('[data-test="postalCode"]')
        this.btnContinue=page.getByRole('button', { name: 'CONTINUE' })
        this.lblPaymentInfo=page.getByText('SauceCard #')
        this.lblItemTotal=page.getByText('Item total: $')
        this.btnFinish=page.getByRole('link', { name: 'FINISH' })
        this.lblConfirmOrder=page.getByText('THANK YOU FOR YOUR ORDER')
        this.image=page.locator('#checkout_complete_container').getByRole('img')
        this.userInfoAlert=page.locator('[data-test="error"]')
      
    
    

    }

   async gotoCheckout(){
    await this.chackOut.click()
   }
   async clientInformation(userFirstName,userLastName,userZipCode){
    await this.userFName.fill(userFirstName);
    await this.userLName.fill(userLastName);
    await this.userZipCode.fill(userZipCode);
    await this.btnContinue.click();
    
   } 
   async emptyClientInformation(){
    await this.btnContinue.click();
   }
   async assertCheckOutOverviewPage(){
    await expect.soft(this.lblPaymentInfo).toBeVisible();
    await expect.soft(this.lblItemTotal).toBeVisible();
   }
   async clickFinishButton() {
    await this.btnFinish.click();
    }

  async verifyConfirmOrder() {
    await expect(this.lblConfirmOrder).toBeVisible();
    await expect(this.image).toBeVisible();
    
    }

   async assertErrorMessage() {
    await expect(this.userInfoAlert).toBeVisible();
    } 
}