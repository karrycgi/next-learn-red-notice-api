"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const RedNotice_all_1 = require("./lib/RedNotice.all");
(0, RedNotice_all_1.searchRedNotice)().then((result) => {
    console.log("TOTAL: ", result.total);
    (0, RedNotice_all_1.imagesRedNotice)(result._embedded.notices[0])
        .then((images) => {
        console.log(images);
    })
        .catch(console.error);
    //result._embedded.notices.forEach(async (notice: RedNotice) => {
    //console.log(notice);
    //console.log(`${notice.name}, ${notice.forename} (${notice._links.thumbnail?.href || ""})`)
    //const details:RedNoticeDetails = await detailsRedNotice(notice); 
    //console.log(`${details.name}, ${details.forename} (${notice._links?.thumbnail?.href || "---"})`);
    //})
}).catch(console.error);
