import * as tokenReader from "./tokenReader.js"
import * as tokenGranter from "./tokenGranter.js"

const unvalidatedTokens = []

export const VerifyAndGetTokenFromHeaders = async (headers) => {

    const result = tokenReader.VerifyAndGetToken(headers)

    if (unvalidatedTokens.indexOf(result.token) != -1){
        return {success:false}
    }

    return result
}

export const CreateToken = async (username, expiration) => {

    return tokenGranter.CreateToken(username, expiration)
}

export const VerifyAndGetToken = async (token) => {

    if (unvalidatedTokens.indexOf(token) != -1){
        return {success:false, message:"login required"}
    }

    return tokenGranter.VerifyAndGetToken(token)
}

export const InvalidateToken = async (token) => {

    unvalidatedTokens.push(token)
}