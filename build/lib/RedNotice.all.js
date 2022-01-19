"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imagesRedNotice = exports.detailsRedNotice = exports.searchRedNotice = exports.RedNoticeError = void 0;
const axios_1 = __importDefault(require("axios"));
class RedNoticeError extends Error {
}
exports.RedNoticeError = RedNoticeError;
const createSearchQueryUrl = (query) => {
    return `https://ws-public.interpol.int/notices/v1/red?forename=${query.forename}&name=${query.name}&nationality=${query.nationality}&ageMax=${query.ageMax}&ageMin=${query.ageMin}&sexId=${query.sexId}&arrestWarrantCountryId=${query.arrestWarrantCountryId}&page=${query.page}&resultPerPage=${query.resultPerPage}`;
};
const createSearchAllQueryUrl = () => {
    return `https://ws-public.interpol.int/notices/v1/red?page=${1}&resultPerPage=${5}`;
};
const searchRedNotice = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (yield axios_1.default.get(query ? createSearchQueryUrl(query) : createSearchAllQueryUrl())).data;
});
exports.searchRedNotice = searchRedNotice;
const detailsRedNotice = (value) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const reqUrl = typeof value === "string"
        ? `https://ws-public.interpol.int/notices/v1/red/${value}`
        : (_b = (_a = value._links) === null || _a === void 0 ? void 0 : _a.self) === null || _b === void 0 ? void 0 : _b.href;
    if (reqUrl) {
        return yield (yield axios_1.default.get(reqUrl)).data;
    }
    else {
        throw new RedNoticeError("Request URL for details couldn't be build");
    }
});
exports.detailsRedNotice = detailsRedNotice;
const imagesRedNotice = (value) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    const reqUrl = typeof value === "string"
        ? `https://ws-public.interpol.int/notices/v1/red/${value}/images`
        : (_d = (_c = value._links) === null || _c === void 0 ? void 0 : _c.images) === null || _d === void 0 ? void 0 : _d.href;
    if (reqUrl) {
        return yield (yield axios_1.default.get(reqUrl)).data;
    }
    else {
        console.log(value);
        throw new RedNoticeError("Request URL for images couldn't be build");
    }
});
exports.imagesRedNotice = imagesRedNotice;
