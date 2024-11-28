import {hash, compare } from "https://deno.land/x/bcrypt/mod.ts"
import { cryptoRandomString } from "https://deno.land/x/crypto_random_string@1.0.0/mod.ts"
import {InfoBooleanResult} from "../Classes/InfoBooleanResult.js"
import * as db from "./dbAPI.js"
import * as encryption from "../Cryptography/encryption.js"
import * as decryption from "../Cryptography/decryption.js"

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

export const AddUserLoginLog = async (username, ipAddress) => {

    const date = new Date()

    const dataObject = JSON.stringify({username, ipAddress, date})

    const encryptedDataAndIv = await encryption.EncryptString(dataObject)



    const query = "INSERT INTO login_history (data, iv) VALUES ($1, $2)"

    const results = await db.QueryDataBase(query, [encryptedDataAndIv.data, encryptedDataAndIv.iv])

    return results[0]
}

export const GetUserLoginLog = async (username) => {

    const query = "SELECT * FROM login_history"

    const results = await db.QueryDataBase(query, [])

    if (!results[0]){
        return {success: false}
    }

    let entries = []

    for (const row of results[1].rows){
        const decryptedData = await decryption.DecryptString(row.data, row.iv)

        entries.push(decryptedData)
    }

    

    await AddLogViewOccurence(username, "Login history")

    return {success:true, data:entries}

    
}

export const AddLogViewOccurence = async (username, viewedContent) => {

    const date = new Date()

    const  dataObject = JSON.stringify({username, viewedContent, date})

    const encryptedDataAndIv = await encryption.EncryptString(dataObject)



    const query = "INSERT INTO logviewing_history (data, iv) VALUES ($1, $2)"

    const results = await db.QueryDataBase(query, [encryptedDataAndIv.data, encryptedDataAndIv.iv])

    return results[0]
}

export const GetLogViewOccurences = async () => {

    const query = "SELECT * FROM logviewing_history"

    const results = await db.QueryDataBase(query, [])

    if (!results[0]){
        return {success:false}
    }

    let entries = []

    for (const row of results[1].rows){
        const decryptedData = await decryption.DecryptString(row.data, row.iv)

        entries.push(decryptedData)
    }

   

    return {success:true, data: entries}
}

