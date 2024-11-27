import * as router from "./router.js"
import * as GenerateEncryptedKey from "./Keys/GenerateEncryptedKey.js"

const handler = async (req) => {
    return await router.GetResponse(req)
  }
  
  await GenerateEncryptedKey.GenerateKeyAndSaveToEncryptionKeyFile()
  console.log("starting booking_system server")
  Deno.serve(handler);