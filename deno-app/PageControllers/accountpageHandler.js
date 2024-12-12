import * as renderer from "../renderer.js"
import * as dbHandler from "../db/dbHandler.js"
import {InfoBooleanResult} from "../Classes/InfoBooleanResult.js"
import * as headers from "../headers.js"
import * as tokenSystem from "../TokenHandling/tokenSystem.js"

export const GetAccountPageResponse = async (request) => {

    const tokenVerificationResult = await tokenSystem.VerifyAndGetTokenFromHeaders(request.headers)

    if (!tokenVerificationResult.success){
        return new Response(null, headers.GetDefaultHeadersWithRedirect("/"))
    }

    const userID = await dbHandler.GetUserID(tokenVerificationResult.token.username)

    const birthDate = await dbHandler.GetUserBirthDate(userID)

    const role = await dbHandler.GetRoleOfUser(userID)

    const userData = {birthDate : birthDate, role : role}

    return new Response(renderer.GetAccountPage(tokenVerificationResult.token.username, userData), headers.GetDefaultHeaders())
}