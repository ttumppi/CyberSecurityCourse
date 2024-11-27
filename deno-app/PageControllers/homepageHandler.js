import * as renderer from "../renderer.js"
import * as headers from "../headers.js"
import * as tokenGranter from "../tokenGranter.js"

export const GetHomePage = async (request) => {

    const requestHeaders = request.headers
    const authorization = requestHeaders.get("Authorization")

    if (!authorization){
        return new Response(renderer.GetHomePageHTML(), headers.GetDefaultHeaders())
    }

    const verifyResult = await tokenGranter.verify(authorization)

    if (!verifyResult.success){
        return new Response(renderer.GetUnsuccesfullLoginPageHTML(verifyResult.message), headers.GetDefaultHeaders())
    }

    return new Response(renderer.GetHomePageWithUsernameHTML(verifyResult.token.username), headers.GetDefaultHeaders())
}

