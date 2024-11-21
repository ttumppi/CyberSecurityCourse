

import * as homepageHandler from "./PageControllers/homepageHandler.js"
import * as registerpageHandler from "./PageControllers/registerpageHandler.js"


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
            return homepageHandler.GetHomePage()
            
        case "/register":
           return registerpageHandler.GetRegisterPage()

        default:
            return new Response("Unknown url")
        
    }
}



export const GetResponseToPost = async (request) => {

    let url = ParsePathFromURL(request.url)

    switch (url){
        case "/register":
            return await registerpageHandler.HandleUserCredentials(request)

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

