import * as renderer from "./renderer.js"


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

const TryToSaveCredentials = (request) => {
    return true
}


export const GetResponseToGet = (request) => {

    let url = ParsePathFromURL(request.url)
    
    switch (url){
        case "/":
            return new Response(renderer.GetHomePageHTML(), {
                headers: {"Content-Type": "text/html"},
            })
            
        case "/register":
            return new Response(renderer.GetRegisterPageHTML(), {
                headers: {"Content-Type": "text/html"},
            })

        default:
            return new Response("Unknown url")
        
    }
}

export const HandleUserCredentials = (request) => {

    if (TryToSaveCredentials(request)){

        return new Response(renderer.GetSuccesfullRegisterPageHTML(), {
            headers: {"Content-Type": "text/html"},
        })
    }
    else{
        return new Response(renderer.GetUnsuccesfullRegisterPageHTML(), {
            headers: {"Content-Type": "text/html"},
        })
    }
}

export const GetResponseToPost = (request) => {

    let url = ParsePathFromURL(request.url)

    switch (url){
        case "/register":
            return HandleUserCredentials()
        

        default:
            return new Response("Unknown url")
    }
}

export const GetResponse = (request) => {

    

    if (request.method == "POST"){
        return GetResponseToPost(request)
    }

    if (request.method == "GET"){
        return GetResponseToGet(request)
    }
}

