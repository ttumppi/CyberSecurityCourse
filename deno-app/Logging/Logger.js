import * as dbHandler from "../db/dbHandler.js"



export const LogLogin = async (username, ipAddress) => {

    await dbHandler.AddUserLoginLog(username, ipAddress)

}

