import * as renderer from "../renderer.js"
import * as db from "../dbAPI.js"
import {InfoBooleanResult} from "../Classes/InfoBooleanResult.js"

export const GetRegisterPage = () => {
    return new Response(renderer.GetRegisterPageHTML(), {
        headers: {"Content-Type": "text/html"},
    })
}

const TryToSaveCredentials = async (request) => {
    const formData = await request.formData()
    const username = formData.get("username")
    const password = formData.get("password")

    const containsUsernameInfoResult = await ContainsUsername(username)

    if (containsUsernameInfoResult.result){
        return new InfoBooleanResult(false, containsUsernameInfoResult.error)
    }

    const query = "INSERT INTO users (username, password) VALUES ($1, $2)";


    const results = await db.QueryDataBase(query, [username, password])
    return new InfoBooleanResult(results[0], null) 
}

const ContainsUsername = async (username) =>{
    const query = "SELECT username FROM users WHERE username = $1"

    const results = await db.QueryDataBase(query, [username])

    if (results[0] & results[1].rows.length > 0){
        return new InfoBooleanResult(true, "username is registered already.")
    }

    return new InfoBooleanResult(false, null)
}

export const HandleUserCredentials = async (request) => {

    const credentialsSaveResult = await TryToSaveCredentials(request)
    if (credentialsSaveResult.result){

        return new Response(renderer.GetSuccesfullRegisterPageHTML(), {
            headers: {"Content-Type": "text/html"},
        })
    }
    else{
        return new Response(renderer.GetUnsuccesfullRegisterPageHTML(credentialsSaveResult.error), {
            headers: {"Content-Type": "text/html"},
        })
    }
}