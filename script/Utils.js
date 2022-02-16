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

    getActivePostsFromTag = async () => {
        const { page } = this;
        const tagItemSelector = '.v1Nh3.kIKUG._bz0w';
        const messageIconSelector = '._1P1TY.coreSpriteSpeechBubbleSmall'
        const paths = [];
        let targetItem = await page.$(`${tagItemSelector} [href]`);

        return await new Promise(async (resolve) => {
            await targetItem.hover();
            const targetPath = await (await targetItem.getProperty("href")).jsonValue();

            await page.evaluate((path) => {

                if (+document.querySelector('._1P1TY.coreSpriteSpeechBubbleSmall').parentNode.querySelector('span').textContent){

                }
            }, targetPath);

        })
    }

    async goToTag(tag) {
        const searchSelector = '.XTCLo.d_djL.DljaH';
        const loadSelector = '.By4nA';
        const item = '.-qQT3';
        const tagItemSelector = '.v1Nh3.kIKUG._bz0w';
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

        await this.getRandomItem(tagItems).click();

        await this.waitFor(async () => (await page.$$(tagItemSelector)).length, 10_000);

        await this.scrollPaginations(5, tagItemSelector);
    }

    waitFor = async (callback, timeAwait = 5000) => {
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
