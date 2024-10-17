# Saucedemo
The scripts are designed for end-to-end testing, including adding products to a cart, validating item details, and checking out.

# Prerequisites
Before running the tests, ensure you have the following installed:

1. Node.js (v14.x or later)
2. npm (comes with Node.js)
3. Playwright
4. Allure for reporting

# Install Dependencies
Clone the repository and install the required dependencies using npm:
  1. git clone https://github.com/mizan-git/saucedemo.git
  2. cd saucedemo
  3. npm install

# Run Tests
# Running Tests in Headed Mode
To run all tests in headed mode (with the browser UI), execute the following command:
  1. npm run test
# Running Tests in Headless Mode
To run tests in headless mode (without the browser UI), run the following command:
  1. npx playwright test
# Generate Allure Report
To generate the Allure report after running the tests, use the following script:
 1. npm run generate-report
This command will run the tests and generate an Allure report.
# View Allure Report
After generating the report, you can view it in your browser by running:
  1. npm run view-report

# Project Structure
The project follows a Page Object Model (POM) structure to maintain scalability and reusability.
1. ├── tests/                     # Contains all test scripts
2. ├── pages/                     # Page Object Model files (pages for each section of the web app)
3. ├── playwright.config.js       # Playwright configuration
4. ├── package.json               # NPM configuration and scripts
5. └── README.md                  # Project documentation

