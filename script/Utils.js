import { TAG_PATH } from "./../constants.js";
import { tags } from "./tags.js";


export default class Utils {
    constructor(page) {
        this.page = page;
    }


    async closeNotificationsModal() {
        const buttonSelector = '.aOOlW.bIiDR';
        this.page.click(buttonSelector);
    }


    getRandomItem(arr) {
        return arr[Math.round((arr.length - 1) * Math.random())]
    }

    async goToRandomTag() {
        await this.goToTag(this.getRandomItem(tags));
    }

    async goToTag(tag) {
        const searchSelector = '.XTCLo.d_djL.DljaH';
        const item = '.-qQT3';
        const page = this.page;

        await page.focus(searchSelector);
        page.evaluate((tag, searchSelector) => {
            document.querySelector(searchSelector).value = tag;
        }, tag, searchSelector);
        await page.type(searchSelector, ' ', {delay: 200});

        const tagItems = await this.waitFor(async () => {
            const items =  await page.$$(item);
            return items.length ? items : false;
        });

        this.getRandomItem(tagItems).click();
    }

    async waitFor(callback, timeAwait = 5000) {
        const page = this.page;
        const interval = 100;
        let timer = timeAwait;

        return await new Promise((resolve, reject) => {
            const intervalId = setInterval(async () => {

                console.log('tick');
                if ((timer-=interval) <= 0) {
                    clearInterval(intervalId);
                    reject(new Error('error from waitFor'));
                };
                const result = await callback();
                if (result) {
                    clearInterval(intervalId);
                    resolve(result);
                };
            }, interval)
        })
    }
}
