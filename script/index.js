import {INSTARGAM_PATH, SESSION_ID} from './../constants.js';
import puppeteer from "puppeteer";


(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    await page.setCookie({
        name: 'sessionid',
        value: SESSION_ID,
        domain: '.instagram.com',
        path: '/'
    });
    await page.goto(INSTARGAM_PATH);
    console.log('test')

})();
