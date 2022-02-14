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

    async goToRandomTag() {
        const searchSelector = '.XTCLo.d_djL.DljaH';
        const page = this.page;

        await page.focus(searchSelector);
        await page.type(searchSelector, '#maroco', {delay: 100});
    }

    async goToTag(tag) {

    }

    getRandomTag() {
        return Math.random() * tags.length;
    }
}
