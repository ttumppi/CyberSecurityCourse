import * as tokenSystem from "../TokenHandling/tokenSystem.js"
import * as renderer from "../renderer.js"
import * as headers from "../headers.js"
import * as dbHandler from "../db/dbHandler.js"

export const GetResponseToLogout = async (request) => {

    const reservedResources = await dbHandler.GetReservedResources()
    
    const tokenRetrievalResult = await tokenSystem.VerifyAndGetTokenFromHeaders(request.headers)

    if (!tokenRetrievalResult.success){
        return new Response(renderer.GetHomePageHTML(reservedResources), headers.GetDefaultHeaders())
    }

    await tokenSystem.InvalidateToken(tokenRetrievalResult.token)

    return new Response(renderer.GetHomePageHTML(reservedResources), headers.GetDefaultHeaders())
}