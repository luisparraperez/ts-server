import {parse, UrlWithStringQuery, UrlWithParsedQuery} from 'url';
export class Utilidades{
    public static getBasePath(url:string|undefined):String{
        if (url){
            const parseUrl = parse(url);
            return parseUrl.pathname!.split('/')[1];

        }
        else return '';

    }
    public static obtenerparametrosUrl(url:string | undefined): UrlWithParsedQuery | undefined{
        if (url)
            return parse(url,true);
        else '';    
    }
}