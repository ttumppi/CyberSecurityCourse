import * as dbHandler from "../db/dbHandler"..



export const LogLogin = async (username, ipAddress) => {

    await dbHandler.AddUserLoginLog(username, ipAddress)

}

