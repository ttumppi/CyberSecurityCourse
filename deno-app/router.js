

import * as homepageHandler from "./PageControllers/homepageHandler.js"
import * as registerpageHandler from "./PageControllers/registerpageHandler.js"
import * as loginpageHandler from "./PageControllers/loginpageHandler.js"
import * as styleHandler from "./Styling/styleHandler.js"


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




export const GetResponseToGet = async (request) => {

    let url = ParsePathFromURL(request.url)
    
    switch (url){
        case "/":
            return await homepageHandler.GetHomePage(request)
            
        case "/register":
           return registerpageHandler.GetRegisterPage()

        case "/login":
            return loginpageHandler.GetLoginPage()

        case "/styles":
            return await styleHandler.GetStyleResponse(request)

        default:
            return new Response("Unknown url")
        
    }
}



export const GetResponseToPost = async (request) => {

    let url = ParsePathFromURL(request.url)

    switch (url){
        case "/register":
            return await registerpageHandler.HandleUserCredentials(request)

        case "/login":
            return await loginpageHandler.GetLoginResponse(request)

        default:
            return new Response("Unknown url")
    }
}

export const GetResponse = async (request) => {

    

    if (request.method == "POST"){
        return await GetResponseToPost(request)
    }

    if (request.method == "GET"){
        return GetResponseToGet(request)
    }
}

