import { imagesRedNotice, RedNoticeResult, RedNoticeImages, searchRedNotice } from "./lib/RedNotice.all";

searchRedNotice().then((result: RedNoticeResult) => {
    console.log("TOTAL: ", result.total)
    imagesRedNotice(result._embedded.notices[0])
        .then((images: RedNoticeImages) => {
            console.log(images.images);
        })
        .catch(console.error)
    
    //result._embedded.notices.forEach(async (notice: RedNotice) => {
        //console.log(notice);
        //console.log(`${notice.name}, ${notice.forename} (${notice._links.thumbnail?.href || ""})`)
        //const details:RedNoticeDetails = await detailsRedNotice(notice); 
        //console.log(`${details.name}, ${details.forename} (${notice._links?.thumbnail?.href || "---"})`);
    //})
}).catch(console.error);