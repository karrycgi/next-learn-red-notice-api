import RedNotice, { detailsRedNotice, RedNoticeDetails, RedNoticeResult, searchRedNotice } from "./lib/RedNotice.all";

searchRedNotice().then((result: RedNoticeResult) => {
    console.log("TOTAL: ", result.total)
    //result._embedded.notices.forEach(async (notice: RedNotice) => {
        //console.log(notice);
        //console.log(`${notice.name}, ${notice.forename} (${notice._links.thumbnail?.href || ""})`)
        //const details:RedNoticeDetails = await detailsRedNotice(notice); 
        //console.log(`${details.name}, ${details.forename} (${notice._links?.thumbnail?.href || "---"})`);
    //})
}).catch(console.error)