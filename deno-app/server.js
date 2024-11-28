import * as router from "./router.js"
import * as GenerateEncryptedKey from "./Keys/GenerateEncryptedKey.js"

const handler = async (req, connectionInfo) => {
    return await router.GetResponse(req, connectionInfo)
  }
  
  await GenerateEncryptedKey.GenerateKeyAndSaveToEncryptionKeyFile()
  console.log("starting booking_system server")
  Deno.serve(handler);