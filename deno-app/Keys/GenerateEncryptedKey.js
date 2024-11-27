import { join } from "https://deno.land/std/path/mod.ts";


export const GenerateKeyAndSaveToEncryptionKeyFile = async () => {

    const contents = await Deno.readTextFile(join(Deno.cwd(), "Keys/encryptionKey.txt"))

    if (contents.length > 0){
        return
    }

    const whitespaceMatcher = /[^\s]/

    if (contents.match(whitespaceMatcher)){
        return
    }

    const encryptedKey = await crypto.subtle.generateKey(
        {
            name: "AES-GCM",
            length: 256,
        },
        true,
        ["encrypt", "decrypt"],
    );

    const keyAsBytes = await crypto.subtle.exportKey("raw", encryptedKey) // returns an array of Uint8 containing the key

    const keyAsStringb64 = btoa(String.fromCharCode(... new Uint8Array(keyAsBytes))) // spread out the newly created array to individual arguments, there is some reason to create new array lol.  
    
    await Deno.writeTextFile(join(Deno.cwd(), "Keys/encryptionKey.txt"), keyAsStringb64)
}