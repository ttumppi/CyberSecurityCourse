import * as renderer from "../renderer.js"
import * as db from "../dbAPI.js"

export const GetRegisterPage = () => {
    return new Response(renderer.GetRegisterPageHTML(), {
        headers: {"Content-Type": "text/html"},
    })
}

const TryToSaveCredentials = async (request) => {
    const formData = await request.formData()
    const username = formData.get("username")
    const password = formData.get("password")

    const query = "INSERT INTO users (username, password) VALUES ($1, $2)";


    const results = await db.QueryDataBase(query, [username, password])
    return results[0] 
}

export const HandleUserCredentials = async (request) => {

    if (await TryToSaveCredentials(request)){

        return new Response(renderer.GetSuccesfullRegisterPageHTML(), {
            headers: {"Content-Type": "text/html"},
        })
    }
    else{
        return new Response(renderer.GetUnsuccesfullRegisterPageHTML(), {
            headers: {"Content-Type": "text/html"},
        })
    }
}