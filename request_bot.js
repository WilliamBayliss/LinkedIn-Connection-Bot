const puppeteer = require('puppeteer');
const minimalist = require('minimist') 
var argv = minimalist(process.argv.slice(2));
connectionName = argv['_'][0] + " " + argv['_'][1];

(async function sendRequest() {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setCookie({
      'name': 'li_at',
      'value': process.env.LINKED_IN_TOKEN,
      'domain': '.www.linkedin.com'

  })

  //   Bring up the search bar
  await page.goto('https://linkedin.com');
  await page.click('button[aria-label="Click to start a search"]');
  await page.waitForSelector('input[placeholder="Search"]');
  //   Change value to name from args and press enter to submit   
  await page.$eval('input[placeholder="Search"]', (searchBar, name) => searchBar.value = name, connectionName);
  await page.keyboard.press('Enter')
  await page.waitForNavigation();

//   Check for a button styled primary to view full profile
  try {
    await page.waitForSelector('.artdeco-button--primary')
    await page.click('.artdeco-button--primary')
    await page.waitForNavigation();
    try {
        // Check for a button styled primary for connection request on profile
        await page.waitForSelector('.artdeco-button--primary')
        await page.click('.artdeco-button--primary')
        // Await for another primary styled button to send the request without a message
        await page.waitForSelector('.artdeco-button--primary')
        await page.click('.artdeco-button--primary')
    } catch {
      console.log("Error: No primary button found on profile");
    }
  } catch {
    console.log("Error: View profile button not found");
  }


  browser.close();


})();