import * as router from "./router.js"

const handler = (req) => {
    return router.GetResponse(req)
  }
  
  
  console.log("starting booking_system server")
  Deno.serve(handler);