import * as renderer from "../renderer.js"
import * as dbHandler from "../db/dbHandler.js"
import {InfoBooleanResult} from "../Classes/InfoBooleanResult.js"
import * as headers from "../headers.js"
import * as tokenSystem from "../TokenHandling/tokenSystem.js"
import * as logger from "../Logging/logger.js"


export const GetLoginPage = () => {
    return new Response(renderer.GetLoginPageHTML(), headers.GetDefaultHeaders())
}

export const GetLoginResponse = async (request, connectionInfo) => {
    const formData = await request.formData()
    const username = formData.get("username")
    const password = formData.get("password")

    const containsUsernameInfoResult = await dbHandler.ContainsUsername(username)

    if (!containsUsernameInfoResult.result){
        return new Response(renderer.GetUnsuccesfullLoginPageHTML("Invalid credentials"), headers.GetDefaultHeaders())
    }

    if (!await PasswordsMatch(username, password)){
        return new Response(renderer.GetUnsuccesfullLoginPageHTML("Invalid credentials"), headers.GetDefaultHeaders())
    }

    logger.LogLogin(username, connectionInfo.remoteAddr.hostname)

    return await GetSuccessfullLoginResponse(username)
}

const GetSuccessfullLoginResponse = async (username) => {
    const token = await tokenSystem.CreateToken(username, (60*60))


    return new Response(null, headers.GetDefaultHeadersWithTokenAndRedirect(token, "/"))
}

const PasswordsMatch = async (username, password) => {
    const userID = await dbHandler.GetUserID(username)
    const savedPassword = await dbHandler.GetPasswordForUser(userID)

    const salt = await dbHandler.GetStoredSalt(userID)



    return await dbHandler.SameHash((password + salt) ,savedPassword)
}
