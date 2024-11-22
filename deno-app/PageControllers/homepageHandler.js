import * as renderer from "../renderer.js"


export const GetHomePage = () => {
    return new Response(renderer.GetHomePageHTML(), {
        headers: {"Content-Type": "text/html",
            "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self';",
            "X-Frame-Options": "DENY",
            "X-Content-Type-Options": "nosniff"
        },
    })
}