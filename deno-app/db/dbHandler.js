import {hash, compare } from "https://deno.land/x/bcrypt/mod.ts"
import { cryptoRandomString } from "https://deno.land/x/crypto_random_string@1.0.0/mod.ts"
import {InfoBooleanResult} from "../Classes/InfoBooleanResult.js"
import {Resource} from "../Classes/Resource.js"
import * as db from "./dbAPI.js"
import * as encryption from "../Cryptography/encryption.js"
import * as decryption from "../Cryptography/decryption.js"

export const ContainsUsername = async (username) =>{
    const query = "SELECT username FROM users WHERE username = $1"

    const results = await db.QueryDataBase(query, [username])

    if (!results[0]){
        return new InfoBooleanResult(true, "failed to identify username")
    }

    if (results[0] & results[1].rows.length > 0){
        return new InfoBooleanResult(true, "username is registered already.")
    }

    return new InfoBooleanResult(false, null)
}

export const GetUsernames = async () => {
    const query = "SELECT username FROM users"

    const results = await db.QueryDataBase(query, [])

    if (!results[0]){
        return []
    }

    return results[1].rows
}

export const InsertRoleOfUserToDB = async (userID, roleID) => {
    const query = "INSERT INTO roles_of_users (user_id, role_id) VALUES ($1, $2)"

    const results = await db.QueryDataBase(query, [userID, roleID])

    return results[0]
}

export const GetRoleOfUser = async (userID) => {
    const roleIDQuery = "SELECT role_id FROM roles_of_users WHERE user_id = $1"

    const roleIDResults = await db.QueryDataBase(roleIDQuery, [userID])

    if (!roleIDResults[0]){
        return ""
    }

    if (roleIDResults[1].rows.length == 0){
        return ""
    }

    if (!roleIDResults[1].rows[0].role_id){
        return ""
    }

    const roleNameQuery = "SELECT role_name FROM defined_roles WHERE role_id = $1"

    const roleNameResults = await db.QueryDataBase(roleNameQuery, [roleIDResults[1].rows[0].role_id])

    if (!roleNameResults[0]){
        return ""
    }

    if (roleNameResults[1].rows.length == 0){
        return ""
    }

    if (!roleNameResults[1].rows[0].role_name){
        return ""
    }
    
    return roleNameResults[1].rows[0].role_name
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
        return ""
    }

    if (results[1].rows.length == 0){
        return ""
    }

    if (!results[1].rows[0].id){
        return ""
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

    if (results[1].rows.length == 0){
        return null
    }

    if (!results[1].rows[0].role_id){
        return null
    }

    return results[1].rows[0].role_id
}



export const GetPasswordForUser = async (userID) => {
    const query = "SELECT password_hash FROM passwords WHERE user_id = $1"

    const results = await db.QueryDataBase(query, [userID])

    if (!results[0]){
        return ""
    }

    if (results[1].rows.length == 0){
        return ""
    }

    if (!results[1].rows[0].password_hash){
        return ""
    }

    return results[1].rows[0].password_hash
}

export const GetStoredSalt = async (userID) => {
    const query = "SELECT salt FROM passwords WHERE user_id = $1"

    const results = await db.QueryDataBase(query, [userID])

    if (!results[0]){
        return ""
    }

    if (results[1].rows.length == 0){
        return ""
    }

    if (!results[1].rows[0].salt){
        return ""
    }

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

export const AdminUser = async (username) => {

    const userID = await GetUserID(username)

    if (userID == ""){
        return false
    }

    const userRole = await GetRoleOfUser(userID)

    return userRole == "admin"

}

export const ContainsResource = async (resource) => {

    const query = "SELECT * FROM resources WHERE name = $1"

    const results = await db.QueryDataBase(query, [resource.name])

    if (!results[0]){
        return false
    }

    return results[1].rows.length != 0
}

export const AddResource = async (resource) => {

    if (await ContainsResource(resource)){
        return
    }

    const query = "INSERT INTO resources (name, description) VALUES ($1, $2)"

    const results = await db.QueryDataBase(query, [resource.name, resource.description])

    return results[0]
}

export const GetResourceID = async (resource) => {

    const query = "SELECT * FROM resources WHERE name = $1"

    const results = await db.QueryDataBase(query, [resource.name])

    if (!results[0]){
        return ""
    }

    if (results[1].rows.length == 0){
        return ""
    }

    if (!results[1].rows[0].id){
        return ""
    }

    return results[1].rows[0].id
}

export const ReserveResource = async (resource, username) => {

    const userID = await GetUserID(username)

    if (userID == ""){
        return false
    }

    const resourceID = await GetResourceID(resource)

    if (resourceID == ""){
        return false
    }

    const query = "INSERT INTO reserved_resources (reserver_user_id, resource_id) VALUES ($1, $2)"

    const results = await db.QueryDataBase(query, [userID, resourceID])

    return results[0]

}

export const ResourceReserved = async (resource) => {

    const resourceID = await GetResourceID(resource)

    if (resourceID == ""){
        return false
    }

    const query = "SELECT * FROM reserved_resources WHERE resource_id = $1"

    const results = await db.QueryDataBase(query, [resourceID])

    if (!results[0]){
        return false
    }

    return results[1].rows.length != 0
}

export const GetReservedResources = async () => {

    const query = "SELECT * FROM resources JOIN reserved_resources ON resources.id = reserved_resources.resource_id"

    const results = await db.QueryDataBase(query, []) 

    if (!results[0]){
        return []
    }

    return results[1].rows

}

export const GetUserReservedResources = async(username) => {

    const userID = await GetUserID(username)

    if (userID == ""){
        return []
    }

    const query = "SELECT * FROM resources JOIN reserved_resources ON resources.id = reserved_resources.resource_id WHERE reserved_resources.reserver_user_id = $1"

    const results = await db.QueryDataBase(query, [userID])

    if (!results[0]){
        return []
    }

    return results[1].rows
}

export const GetFreeResources = async () => {
    
    const query = "SELECT * FROM resources LEFT JOIN reserved_resources ON resources.id = reserved_resources.resource_id WHERE reserved_resources.resource_id IS NULL"

    const results = await db.QueryDataBase(query, [])

    if (!results[0]){
        return []
    }

    
    return results[1].rows
}

export const CheckUserAge = async (username, minimumAge) => {

    const userID = await GetUserID(username)

    if (userID == ""){
        return false
    }

    const query = "SELECT birth_date from users WHERE id = $1"

    const results = await db.QueryDataBase(query, [userID])

    if (!results[0]){
        return false
    }

    if (results[1].rows.length == 0){
        return false
    }


    const birthDate = results[1].rows[0].birth_date

    const currentDate = new Date()

    let ageDifference = currentDate.getFullYear() - birthDate.getFullYear()

    if (
        currentDate.getMonth() < birthDate.getMonth() || 
        (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
    ) {
        ageDifference--;
    }

    return ageDifference > minimumAge
}



