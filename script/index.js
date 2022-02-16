import {INSTARGAM_PATH, SESSION_ID} from './../constants.js';
import Utils from './Utils.js';
import puppeteer from "puppeteer";




(async () => {
    const browser = await puppeteer.launch({
        headless: false
    });
    const page = await browser.newPage();
    const utils = new Utils(page);
    await page.setCookie({
        name: 'sessionid',
        value: SESSION_ID,
        domain: '.instagram.com',
        path: '/'
    });

    // await page.goto("https://www.instagram.com/");
    await page.goto("https://www.instagram.com/explore/tags/maroconoil/");
    // await utils.closeNotificationsModal();
    //

    await utils.getActivePostsFromTag();

})();
