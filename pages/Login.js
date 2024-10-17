const { expect } = require('@playwright/test');


exports.LoginPage= class LoginPage{

    constructor(page){
        this.page=page
        //Login
        this.usernameInput = 'input[data-test="username"]';
        this.passwordInput = 'input[data-test="password"]';
        this.loginButton = 'input[id="login-button"]';
        this.errorMessage = page.locator('[data-test="error"]')
        
        //assertion

        this.logo=page.locator('picture').getByRole('img')
       // this.logo=page.getByRole('link', { name: 'logo' })
       // this.title=page.getByRole('heading', { name: 'Home' })

    }

    async login(username, password) {
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);
        await this.page.click(this.loginButton);
      }

      async assertErrorMessage() {
     //  await expect.soft(this.page.locator('[data-test="error"]')).toContainText('Epic sadface: Username and password do not match any user in this service');
        await expect.soft(this.errorMessage).toContainText('Epic sadface: Username and password do not match any user in this service');
     
    
    }
    

   


}