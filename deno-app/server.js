import * as router from "./router.js"

const handler = async (req) => {
    return await router.GetResponse(req)
  }
  
  
  console.log("starting booking_system server")
  Deno.serve(handler);