import axios from "axios";

export type SexId = "F" | "M" | "D";

export interface RedNoticeQuery {
    forename: string,
    name: string,
    nationality: string,
    ageMax: number,
    ageMin: number,
    sexId: SexId,
    arrestWarrantCountryId: string,
    page: number,
    resultPerPage: number,
}

export interface RedNoticeResult {
    total: number,
    query: RedNoticeQuery,
    _embedded: RedNoticeEmbedded,
    _links: RedNoticeLinks
}

export interface RedNoticeEmbedded {
    notices: RedNotice[]
}

export default interface RedNotice {
    forename: string,
    date_of_birth: string,
    entity_id: string,
    nationalities: string[],
    name: string,
    _links: RedNoticeLinks
}

export interface RedNoticeLinks {
    self?: RedNoticeHref,
    first?: RedNoticeHref,
    last?: RedNoticeHref,
    image?: RedNoticeHref,
    thumbnail?: RedNoticeHref
}

export interface RedNoticeHref {
    href: string
}

export interface RedNoticeArrestWarrent {
    issuing_country_id: string,
    charge: string,
    charge_translation: null | string | undefined
}

export interface RedNoticeDetails extends RedNotice {
    arrest_warrants: RedNoticeArrestWarrent[],
    weight: number,
    languages_spoken_ids: string[],
    height: number,
    sex_id: SexId,
    country_of_birth_id: string,
    distinguishing_marks: string,
    eyes_colors_id: string[],
    hairs_id: string[],
    place_of_birth: string
    _embedded: string[],
    _links: RedNoticeLinks
}

const createSearchQueryUrl = (query: RedNoticeQuery): string => {
    return `https://ws-public.interpol.int/notices/v1/red?forename=${query.forename}&name=${query.name}&nationality=${query.nationality}&ageMax=${query.ageMax}&ageMin=${query.ageMin}&sexId=${query.sexId}&arrestWarrantCountryId=${query.arrestWarrantCountryId}&page=${query.page}&resultPerPage=${query.resultPerPage}`;
}

const createSearchAllQueryUrl = (): string => {
    return `https://ws-public.interpol.int/notices/v1/red?page=${1}&resultPerPage=${200}`;
}

export const searchRedNotice = async (query?: RedNoticeQuery): Promise<RedNoticeResult> => {
    return await (await axios.get<RedNoticeResult>(query ? createSearchQueryUrl(query) : createSearchAllQueryUrl())).data;
}

export class RedNoticeError extends Error { }

export const detailsRedNotice = async (value: string | RedNotice): Promise<RedNoticeDetails> => {
    const reqUrl:string | undefined = typeof value === "string"
        ?`https://ws-public.interpol.int/notices/v1/red/${value}`
        :value._links?.self?.href;
    if(reqUrl) {
        return await (await axios.get<RedNoticeDetails>(reqUrl)).data;
    } else {
        throw new RedNoticeError("Request URL for details couldn't be build");
    }
}