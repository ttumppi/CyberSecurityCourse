
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

const decoder = new TextDecoder();

//-------------------Done on startup



export const DecryptString = async (stringToDecrypt, iv) => {

    const encryptedDataBytes = Uint8Array.from(atob(stringToDecrypt), c => c.charCodeAt(0));
    const ivAsBytes = Uint8Array.from(atob(iv), c => c.charCodeAt(0));

    const decryptedData = await crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv: ivAsBytes, 
        },
        encryptedKey, 
        encryptedDataBytes, 
      );

    return decoder.decode(decryptedData)

}
