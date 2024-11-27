import * as renderer from "../renderer.js"
import * as dbHandler from "../db/dbHandler.js"
import {InfoBooleanResult} from "../Classes/InfoBooleanResult.js"
import * as headers from "../headers.js"
import * as tokenGranter from "../tokenGranter.js"


export const GetLoginPage = () => {
    return new Response(renderer.GetLoginPageHTML(), headers.GetDefaultHeaders())
}

export const GetLoginResponse = async (request) => {
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

    return await GetSuccessfullLoginResponse(username)
}

const GetSuccessfullLoginResponse = async (username) => {
    const token = await tokenGranter.CreateToken(username, (60*60))

    return new Response(renderer.GetHomePageHTML(), headers.GetDefaultHeadersWithToken(token))
}

const PasswordsMatch = async (username, password) => {
    const userID = await dbHandler.GetUserID(username)
    const savedPassword = await dbHandler.GetPasswordForUser(userID)

    const salt = await dbHandler.GetStoredSalt(userID)



    return await dbHandler.SameHash((password + salt) ,savedPassword)
}
