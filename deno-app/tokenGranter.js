import { create, verify, decode, getNumericDate } from "https://deno.land/x/djwt@v3.0.2/mod.ts"

const secretKey = await crypto.subtle.generateKey(
    { name: "HMAC", hash: "SHA-512" },
    true,
    ["sign", "verify"],
  );

export const CreateToken = async (username, expiration) => {

    return await create({ alg: "HS512", typ: "JWT" },
         { username: `${username}`,
        exp: getNumericDate(expiration) },
          secretKey);
}

export const VerifyToken = async (token) => {

    try{
        const decodedToken = await verify(token, secretKey)
        return {success: true, token: decodedToken}
    }
    catch(error){
        return {success: false, message: error}
    }

    
}