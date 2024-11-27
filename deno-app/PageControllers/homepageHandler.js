import * as renderer from "../renderer.js"
import * as headers from "../headers.js"
import * as tokenSystem from "../TokenHandling/tokenSystem.js"

export const GetHomePage = async (request) => {

    const tokenVerificationResult = await tokenSystem.VerifyAndGetTokenFromHeaders(request.headers)
    if (!tokenVerificationResult.success){
        return new Response(renderer.GetHomePageHTML(), headers.GetDefaultHeaders())
    }
   
    return new Response(renderer.GetHomePageWithUsernameHTML(tokenVerificationResult.token.username), headers.GetDefaultHeaders())
}



