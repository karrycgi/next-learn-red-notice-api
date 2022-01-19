import axios from "axios";

export type SexId = "F" | "M" | "U";

export interface RedNoticeEmbedded<T> {
    _embedded: T
}

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

export interface RedNoticeResult extends RedNoticeEmbedded<RedNoticeNotices> {
    total: number,
    query: RedNoticeQuery,
    _links: RedNoticeLinks
}

export interface RedNoticeNotices {
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
    images?: RedNoticeHref,
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

export interface RedNoticeDetails extends RedNotice, RedNoticeEmbedded<string[]> {
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
    _links: RedNoticeLinks
}

export interface RedNoticeImage {
    picture_id: string,
    _links: RedNoticeLinks
}

export interface RedNoticeImages extends RedNoticeEmbedded<RedNoticeImages> {
    _links: RedNoticeLinks
}

export class RedNoticeError extends Error { }

const createSearchQueryUrl = (query: RedNoticeQuery): string => {
    return `https://ws-public.interpol.int/notices/v1/red?forename=${query.forename}&name=${query.name}&nationality=${query.nationality}&ageMax=${query.ageMax}&ageMin=${query.ageMin}&sexId=${query.sexId}&arrestWarrantCountryId=${query.arrestWarrantCountryId}&page=${query.page}&resultPerPage=${query.resultPerPage}`;
}

const createSearchAllQueryUrl = (): string => {
    return `https://ws-public.interpol.int/notices/v1/red?page=${1}&resultPerPage=${5}`;
}

export const searchRedNotice = async (query?: RedNoticeQuery): Promise<RedNoticeResult> => {
    return await (await axios.get<RedNoticeResult>(query ? createSearchQueryUrl(query) : createSearchAllQueryUrl())).data;
}

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

export const imagesRedNotice = async (value: string | RedNotice): Promise<RedNoticeImages> => {
    const reqUrl:string | undefined = typeof value === "string"
        ?`https://ws-public.interpol.int/notices/v1/red/${value}/images`
        :value._links?.images?.href;
    if(reqUrl) {
        return await (await axios.get<RedNoticeImages>(reqUrl)).data;
    } else {
        console.log(value);
        throw new RedNoticeError("Request URL for images couldn't be build");
    }
}