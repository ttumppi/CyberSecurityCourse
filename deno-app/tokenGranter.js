import { create, verify, decode, getNumericDate } from "https://deno.land/x/djwt@v2.7/mod.ts"

const secretKey = "CHANGE_THIS_SECRET_KEY"

export const CreateToken = async (username, expiration) => {

    return await create({alg: "HS256", typ: "JWT"},
        {
            username: `${username}`,
            exp: getNumericDate(expiration)
        },
        secretKey
    )
}

export const VerifyToken = async (token) => {

    try{
        const decodedToken = await verify(token, secretKey)
        return {success: true, token: decodedToken}
    }
    catch(error){
        return {success: false, message: error}
    }

    return true
}