

import * as homepageHandler from "./PageControllers/homepageHandler.js"
import * as registerpageHandler from "./PageControllers/registerpageHandler.js"
import * as loginpageHandler from "./PageControllers/loginpageHandler.js"
import * as pagelessHandler from "./PageControllers/pagelessHandler.js"
import * as styleHandler from "./Styling/styleHandler.js"
import * as reservepageHandler from "./PageControllers/reservepageHandler.js"
import * as resourcepageHandler from "./PageControllers/resourcepageHandler.js"
import * as permissionspageHandler from "./PageControllers/permissionspageHandler.js"
import * as scriptHandler from "./ClientScripting/scriptHandler.js"
import * as accountpageHandler from "./PageControllers/accountpageHandler.js"


const ParsePathFromURL = (url) => {
    const regex = /^(https?)?:?(\/\/)?(www)?.?(.*):?([0-9]*)\//;

    const matching = url.match(regex);

    if (!matching)
    {
        return "/error";
    }

    const indexOfLastMatchingChar = matching.index + matching[0].length -1

    return url.slice(indexOfLastMatchingChar);
}




export const GetResponseToGet = async (request, connectionInfo) => {

    let url = ParsePathFromURL(request.url)
    
    switch (url){
        case "/":
            return await homepageHandler.GetHomePage(request)
            
        case "/register":
           return registerpageHandler.GetRegisterPage(request)

        case "/login":
            return loginpageHandler.GetLoginPage()

        case "/logout":
            return await pagelessHandler.GetResponseToLogout(request)

        case "/styles":
            return await styleHandler.GetStyleResponse(request)

        case "/reserve":
            return await reservepageHandler.GetReservePageResponse(request)

        case "/resource":
            return await resourcepageHandler.GetResourceCreationPage(request)

        case "/policy":
            return await permissionspageHandler.GetPrivacyPolicyPageResponse(request)

        case "/tos":
            return await permissionspageHandler.GetTermsOfServicePageResponse(request)

        case "/clientScripts":
            return await scriptHandler.GetScriptResponse(request)

        case "/account":
            return await accountpageHandler.GetAccountPageResponse(request)

        default:
            return new Response("Unknown url")
        
    }
}



export const GetResponseToPost = async (request, connectionInfo) => {

    let url = ParsePathFromURL(request.url)

    switch (url){
        case "/register":
            return await registerpageHandler.HandleUserCredentials(request)

        case "/login":
            return await loginpageHandler.GetLoginResponse(request, connectionInfo)

        case "/reserve":
            return await reservepageHandler.GetResourceReservingResponse(request)

        case "/resource":
            return await resourcepageHandler.GetResourceSaveResponse(request)

        
        default:
            return new Response("Unknown url")
    }
}

export const GetResponse = async (request, connectionInfo) => {

    

    if (request.method == "POST"){
        return await GetResponseToPost(request, connectionInfo)
    }

    if (request.method == "GET"){
        return GetResponseToGet(request, connectionInfo)
    }
}

