import { Route } from './../Enums/Route';

export const route = (url: Route, params: Record<string, unknown>): string => {
    const urlParamIndex = url.indexOf(':');
    const urlParamName = url.substring(urlParamIndex + 1, url.length);
    const paramValue = params[urlParamName];
    const urlNative = url.substring(0, urlParamIndex);
    const urlFinal = urlNative + paramValue;

    console.log(urlFinal);
    return urlFinal;
};
