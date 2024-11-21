import * as renderer from "../renderer.js"


export const GetHomePage = () => {
    return new Response(renderer.GetHomePageHTML(), {
        headers: {"Content-Type": "text/html"},
    })
}