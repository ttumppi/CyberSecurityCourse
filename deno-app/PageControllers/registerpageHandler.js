import * as renderer from "../renderer.js"
import * as db from "../dbAPI.js"
import {InfoBooleanResult} from "../Classes/InfoBooleanResult.js"
import {hash, compare } from "https://deno.land/x/bcrypt/mod.ts"
import { cryptoRandomString } from "https://deno.land/x/crypto_random_string@1.0.0/mod.ts"



export const GetRegisterPage = () => {
    return new Response(renderer.GetRegisterPageHTML(), {
        headers: {"Content-Type": "text/html",
            "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self';",
            "X-Frame-Options": "DENY",
            "X-Content-Type-Options": "nosniff"
        },
    })
}

const TryToSaveCredentials = async (request) => {
    const formData = await request.formData()
    const username = formData.get("username")
    

    const containsUsernameInfoResult = await ContainsUsername(username)

    if (containsUsernameInfoResult.result){
        return new InfoBooleanResult(false, containsUsernameInfoResult.error)
    }

    return await InsertUserData(formData)

   
}

const InsertUserData = async (data) => {
    const username = data.get("username")
    const password = data.get("password")
    const birthDate = data.get("birthDate")
    const role = data.get("role")

    const usersInsertResult = await InsertUserTableData(username, birthDate)
    const userID = await GetUserID(username)
    const passwordInsertResult = await InsertPasswordToDB(userID, password)
    const roleID = await GetRoleID(role)
    const roleOfUserInsertResult = await InsertRoleOfUserToDB(userID, roleID)

    console.log(`user insert result: ${usersInsertResult}`)
    console.log(`password insert result: ${passwordInsertResult}`)
    console.log(`role insert result: ${roleOfUserInsertResult}`)

    const success = usersInsertResult & passwordInsertResult & roleOfUserInsertResult

    if (success){
        return new InfoBooleanResult(true, null)
    }
    else{
        return new InfoBooleanResult(false, "failed to update db")
    }

} 

const InsertUserTableData = async (username, birthDate) => {

    const query = "INSERT INTO users (username, birth_date) VALUES ($1, $2)";

    const results = await db.QueryDataBase(query, [username, birthDate])

    return results[0]
}

const GetUserID = async (username) => {
    const query = "SELECT id FROM users WHERE username = $1"

    const results = await db.QueryDataBase(query, [username])

    if (!results[0]){
        return null
    }

    return results[1].rows[0].id
}

const InsertPasswordToDB = async (userID, password) => {
    const passwordAndSalt = await HashPasswordWithSalt(password)

    const query = "INSERT INTO passwords (user_id, password_hash, salt) VALUES ($1, $2, $3)"

    const results = await db.QueryDataBase(query, [userID, passwordAndSalt[0], passwordAndSalt[1]])

    return results[0]
}

const HashPasswordWithSalt = async (password) => {
    const randomSalt = cryptoRandomString({length: 10})
    const hashed = await hash(password + randomSalt)
    return [hashed, randomSalt]
}

const GetRoleID = async (role) => {
    const query = "SELECT role_id FROM defined_roles WHERE role_name = $1"

    const results = await db.QueryDataBase(query, [role])

    if (!results[0]){
        return null
    }

    return results[1].rows[0].role_id
}

const InsertRoleOfUserToDB = async (userID, roleID) => {
    const query = "INSERT INTO roles_of_users (user_id, role_id) VALUES ($1, $2)"

    const results = await db.QueryDataBase(query, [userID, roleID])

    return results[0]
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
            headers: {"Content-Type": "text/html",
                "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self';",
                "X-Frame-Options": "DENY",
                "X-Content-Type-Options": "nosniff"
            },
        })
    }
    else{
        return new Response(renderer.GetUnsuccesfullRegisterPageHTML(credentialsSaveResult.error), {
            headers: {"Content-Type": "text/html",
            "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self';",
            "X-Frame-Options": "DENY",
            "X-Content-Type-Options": "nosniff"
            },
        })
    }
}