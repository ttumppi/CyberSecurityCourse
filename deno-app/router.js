


const ParsePathFromURL = (url) => {
    const regex = /^(https?)?:?(\/\/)?(www)?.?(.*):?([0-9]*)\//;

    const matching = url.match(regex);

    if (!matching)
    {
        return "/error";
    }

    return "/" + matching[5];
}


export const GetResponse = (url) => {

    url = ParsePathFromURL(url)
    switch (url){
        case "/":
            return new Response("Homepage")
            
        case "/register":
            return new Response("Registration page")

        default:
            return new Response("Unknown url")
        
    }
}

