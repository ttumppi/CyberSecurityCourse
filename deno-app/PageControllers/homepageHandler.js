import * as renderer from "../renderer.js"
import * as headers from "../headers.js"
import * as tokenGranter from "../tokenGranter.js"
import * as tokenReader from "../tokenReader.js"

export const GetHomePage = async (request) => {

    const tokenVerificationResult = await tokenReader.VerifyToken(request.headers)
    if (!tokenVerificationResult.success){
        return new Response(renderer.GetHomePageHTML(), headers.GetDefaultHeaders())
    }
   
    return new Response(renderer.GetHomePageWithUsernameHTML(tokenVerificationResult.token.username), headers.GetDefaultHeaders())
}



