import * as dbHandler from "../db/dbHandler"..

const ReadEncryptionKey = async () => {

    const encryptionKeyAsb64 = Deno.readTextFile(join(Deno.cwd(), "Keys/encryptionKey.txt"))

    const keyAsBytes = Uint8Array.from(atob(encryptionKeyAsb64), c => c.charCodeAt(0)) // turn the whole string to bytes. Includes lambda function that takes each
                                                                                        // char and turns it to a byte, 0 is the index (first char index is 0 and lambda handles only
                                                                                        // only one char at a time)
                                                                                        

    const importedKey = await crypto.subtle.importKey(
    "raw", keyAsBytes,              
    {
        name: "AES-GCM",      
        length: 256,          
    },
    true,                    
    ["encrypt", "decrypt"]   
    );
                                                                                    
    return importedKey;
}

const encryptedKey = await ReadEncryptionKey()









export const LogLogin = async (username, ipAddress) => {




    await dbHandler.AddUserLoginLog(username, ipAddress)

}

