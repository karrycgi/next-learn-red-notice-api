export declare type SexId = "F" | "M" | "U";
export interface RedNoticeEmbedded<T> {
    _embedded: T;
}
export interface RedNoticeQuery {
    forename: string;
    name: string;
    nationality: string;
    ageMax: number;
    ageMin: number;
    sexId: SexId;
    arrestWarrantCountryId: string;
    page: number;
    resultPerPage: number;
}
export interface RedNoticeResult extends RedNoticeEmbedded<RedNoticeNotices> {
    total: number;
    query: RedNoticeQuery;
    _links: RedNoticeLinks;
}
export interface RedNoticeNotices {
    notices: RedNotice[];
}
export default interface RedNotice {
    forename: string;
    date_of_birth: string;
    entity_id: string;
    nationalities: string[];
    name: string;
    _links: RedNoticeLinks;
}
export interface RedNoticeLinks {
    self?: RedNoticeHref;
    first?: RedNoticeHref;
    last?: RedNoticeHref;
    images?: RedNoticeHref;
    thumbnail?: RedNoticeHref;
}
export interface RedNoticeHref {
    href: string;
}
export interface RedNoticeArrestWarrent {
    issuing_country_id: string;
    charge: string;
    charge_translation: null | string | undefined;
}
export interface RedNoticeDetails extends RedNotice, RedNoticeEmbedded<string[]> {
    arrest_warrants: RedNoticeArrestWarrent[];
    weight: number;
    languages_spoken_ids: string[];
    height: number;
    sex_id: SexId;
    country_of_birth_id: string;
    distinguishing_marks: string;
    eyes_colors_id: string[];
    hairs_id: string[];
    place_of_birth: string;
    _links: RedNoticeLinks;
}
export interface RedNoticeImage {
    picture_id: string;
    _links: RedNoticeLinks;
}
export interface RedNoticeImages extends RedNoticeEmbedded<RedNoticeImages> {
    _links: RedNoticeLinks;
}
export declare class RedNoticeError extends Error {
}
export declare const searchRedNotice: (query?: RedNoticeQuery | undefined) => Promise<RedNoticeResult>;
export declare const detailsRedNotice: (value: string | RedNotice) => Promise<RedNoticeDetails>;
export declare const imagesRedNotice: (value: string | RedNotice) => Promise<RedNoticeImages>;
