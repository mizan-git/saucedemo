const { expect } = require('@playwright/test');


exports.CommonPage= class CommonPage{

    constructor(page){
        this.page=page
        //Cart

        //  this.email=page.getByLabel('Email')
        
        
        //assertion

       // this.logo=page.locator('picture').getByRole('img')
       
       // this.title=page.getByRole('heading', { name: 'Home' })

    }

  
   async openURL(url){
    await this.page.goto(url)
    
   }

   

}