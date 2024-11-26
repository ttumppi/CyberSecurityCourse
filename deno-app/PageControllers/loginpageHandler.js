import * as renderer from "../renderer.js"
import * as db from "../dbAPI.js"
import {InfoBooleanResult} from "../Classes/InfoBooleanResult.js"
import {hash, compare } from "https://deno.land/x/bcrypt/mod.ts"

export const GetLoginPage = () => {
    return new Response(renderer.GetLoginPageHTML(), {
        headers: {"Content-Type": "text/html",
            "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self';",
            "X-Frame-Options": "DENY",
            "X-Content-Type-Options": "nosniff"
        },
    })
}