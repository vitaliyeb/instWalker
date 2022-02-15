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


    async scrollPaginations(countScrol, selector) {
        const page = this.page;
        for await (let value of {
            async *[Symbol.asyncIterator]() {
                while (countScrol-- <= 0) {
                    await page.evaluate((selector) => {
                        console.log(Array.from(document.querySelectorAll(selector)));
                        Array.from(document.querySelectorAll(selector)).at(-1).scrollIntoView();
                    }, selector);
                    // await this.waitFor(async () => !page.$('.By4nA'), 100_000);
                    yield countScrol;
                }
            }
        }) {
            console.log('countScrol', value);

        };
    }

    async goToTag(tag) {
        const searchSelector = '.XTCLo.d_djL.DljaH';
        const item = '.-qQT3';
        const tagItemSelector = '.Nnq7C.weEfm';
        const page = this.page;

        await page.focus(searchSelector);
        page.evaluate((tag, searchSelector) => {
            document.querySelector(searchSelector).value = tag;
        }, tag, searchSelector);
        await page.type(searchSelector, ' ', {delay: 200});

        const tagItems = await this.waitFor(async () => {
            const items =  await page.$$(item);
            console.log('tagItems', items.length)
            return items.length ? items : false;
        });

        await this.getRandomItem(tagItems).click();


        await this.waitFor(async () => {
            console.log('await', tagItemSelector, (await page.$$(tagItemSelector)).length);
            return (await page.$$(tagItemSelector)).length;
        });

        // await this.scrollPaginations(5, tagItemSelector);

    }

    async waitFor(callback, timeAwait = 5000) {
        const page = this.page;
        const interval = 100;
        let timer = timeAwait;

        return await new Promise((resolve, reject) => {
            let intervalId =
                setTimeout(async function tick() {
                    if ((timer-=interval) <= 0) {
                        clearTimeout(intervalId);
                        reject(new Error('error from waitFor'));
                    };

                    const result = await callback();
                    if (result) {
                        clearTimeout(intervalId);
                        return resolve(result);
                    };
                    intervalId = setTimeout(tick, interval);
                }, interval)
        })
    }
}
