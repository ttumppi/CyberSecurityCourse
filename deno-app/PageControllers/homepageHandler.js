import * as renderer from "../renderer.js"
import * as headers from "../headers.js"
import * as tokenSystem from "../TokenHandling/tokenSystem.js"
import * as dbHandler from "../db/dbHandler.js"

export const GetHomePage = async (request) => {

    const reservedResources = await dbHandler.GetReservedResources()

    

    const tokenVerificationResult = await tokenSystem.VerifyAndGetTokenFromHeaders(request.headers)

    if (!tokenVerificationResult.success){
        return new Response(renderer.GetHomePageHTML(reservedResources), headers.GetDefaultHeaders())
    }

    if (!(await dbHandler.CheckUserAge(tokenVerificationResult.token.username, 15))){
        return new Response(renderer.GetHomePageWithUnderageUsernameHTML(tokenVerificationResult.token.username, []), headers.GetDefaultHeaders())
    }

    const userReservedResources = await dbHandler.GetUserReservedResources(tokenVerificationResult.token.username)

    if (await dbHandler.AdminUser(tokenVerificationResult.token.username)){
        return new Response(renderer.GetHomePageAsAdminHTML(tokenVerificationResult.token.username, userReservedResources), headers.GetDefaultHeaders())
    }
   
    return new Response(renderer.GetHomePageWithUsernameHTML(tokenVerificationResult.token.username, userReservedResources), headers.GetDefaultHeaders())
}



