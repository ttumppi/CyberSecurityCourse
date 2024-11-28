import { join } from "https://deno.land/std/path/mod.ts";


//-------------------Done on startup

const ReadEncryptionKey = async () => {

    const encryptionKeyAsb64 = await Deno.readTextFile(join(Deno.cwd(), "Keys/encryptionKey.txt"))

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

const encoder = new TextEncoder()

//-------------------Done on startup








export const EncryptString = async (stringToEncrypt) => {

    const iv = crypto.getRandomValues(new Uint8Array(12))

    const stringAsBytes = encoder.encode(stringToEncrypt)

    const encryptedData = await crypto.subtle.encrypt(
        {
            name: "AES-GCM",
            iv: iv,
        },
        encryptedKey,
        stringAsBytes,
    )

    const dataAsBytes = new Uint8Array(encryptedData) 

    const dataAsStringb64 = btoa(String.fromCharCode(...dataAsBytes)) 

    const ivAsStringb64 = btoa(String.fromCharCode(...iv))

    return {data: dataAsStringb64, iv: ivAsStringb64}
}