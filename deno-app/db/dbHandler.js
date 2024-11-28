import {hash, compare } from "https://deno.land/x/bcrypt/mod.ts"
import { cryptoRandomString } from "https://deno.land/x/crypto_random_string@1.0.0/mod.ts"
import {InfoBooleanResult} from "../Classes/InfoBooleanResult.js"
import * as db from "./dbAPI.js"

export const ContainsUsername = async (username) =>{
    const query = "SELECT username FROM users WHERE username = $1"

    const results = await db.QueryDataBase(query, [username])

    if (results[0] & results[1].rows.length > 0){
        return new InfoBooleanResult(true, "username is registered already.")
    }

    return new InfoBooleanResult(false, null)
}

export const InsertRoleOfUserToDB = async (userID, roleID) => {
    const query = "INSERT INTO roles_of_users (user_id, role_id) VALUES ($1, $2)"

    const results = await db.QueryDataBase(query, [userID, roleID])

    return results[0]
}

export const InsertUserTableData = async (username, birthDate) => {

    const query = "INSERT INTO users (username, birth_date) VALUES ($1, $2)";

    const results = await db.QueryDataBase(query, [username, birthDate])

    return results[0]
}

export const GetUserID = async (username) => {
    const query = "SELECT id FROM users WHERE username = $1"

    const results = await db.QueryDataBase(query, [username])

    if (!results[0]){
        return null
    }

    return results[1].rows[0].id
}

export const InsertPasswordToDB = async (userID, password) => {
    const passwordAndSalt = await HashPasswordWithRandomSalt(password)

    const query = "INSERT INTO passwords (user_id, password_hash, salt) VALUES ($1, $2, $3)"

    const results = await db.QueryDataBase(query, [userID, passwordAndSalt[0], passwordAndSalt[1]])

    return results[0]
}

const HashPasswordWithRandomSalt = async (password) => {
    const randomSalt = cryptoRandomString({length: 10})
    const hashed = await hash(password + randomSalt)
    return [hashed, randomSalt]
}

const HashPasswordWithGivenSalt = async (password, salt) => {
    return await hash(password + salt)
}

export const GetRoleID = async (role) => {
    const query = "SELECT role_id FROM defined_roles WHERE role_name = $1"

    const results = await db.QueryDataBase(query, [role])

    if (!results[0]){
        return null
    }

    return results[1].rows[0].role_id
}



export const GetPasswordForUser = async (userID) => {
    const query = "SELECT password_hash FROM passwords WHERE user_id = $1"

    const results = await db.QueryDataBase(query, [userID])

    return results[1].rows[0].password_hash
}

export const GetStoredSalt = async (userID) => {
    const query = "SELECT salt FROM passwords WHERE user_id = $1"

    const results = await db.QueryDataBase(query, [userID])

    return results[1].rows[0].salt

}

export const SameHash = async (plainTextPassword, hashedPassword) => {
    return await compare(plainTextPassword, hashedPassword)
}

export const AddUserLoginLog = async (username, ipAddress, iv) => {

    const dataObject = JSON.stringify({username, ipAddress})

    query = "INSERT INTO login_history (data, iv) VALUES ($1, $2)"

    const results = await db.QueryDataBase(query, [dataObject, iv])

    return results[0]
}

export const AddUserLogViewOccurence = async (username, viewedContent, iv) => {

    const  dataObject = JSON.stringify({username, viewedContent})

    query = "INSERT INTO log_view_history (data, iv) VALUES ($1, $2)"

    const results = await db.QueryDataBase(query, [dataObject, iv])

    return results[0]
}

