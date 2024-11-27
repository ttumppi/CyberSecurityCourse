import * as renderer from "../renderer.js"
import * as dbHandler from "../db/dbHandler.js"
import {InfoBooleanResult} from "../Classes/InfoBooleanResult.js"
import * as headers from "../headers.js"



export const GetRegisterPage = () => {
    return new Response(renderer.GetRegisterPageHTML(), headers.GetDefaultHeaders())
}

const TryToSaveCredentials = async (request) => {
    const formData = await request.formData()
    const username = formData.get("username")
    

    const containsUsernameInfoResult = await dbHandler.ContainsUsername(username)

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

    const usersInsertResult = await dbHandler.InsertUserTableData(username, birthDate)
    const userID = await dbHandler.GetUserID(username)
    const passwordInsertResult = await dbHandler.InsertPasswordToDB(userID, password)
    const roleID = await dbHandler.GetRoleID(role)
    const roleOfUserInsertResult = await dbHandler.InsertRoleOfUserToDB(userID, roleID)

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


export const HandleUserCredentials = async (request) => {

    const credentialsSaveResult = await TryToSaveCredentials(request)
    if (credentialsSaveResult.result){

        return new Response(renderer.GetSuccesfullRegisterPageHTML(), headers.GetDefaultHeaders())
    }
    else{
        return new Response(renderer.GetUnsuccesfullRegisterPageHTML(credentialsSaveResult.error), headers.GetDefaultHeaders())
    }
}