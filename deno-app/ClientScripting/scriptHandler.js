import { serveFile } from "https://deno.land/std/http/file_server.ts";
import { join } from "https://deno.land/std/path/mod.ts";

export const GetScriptResponse = async (request) => {
    const absFilePath = join(Deno.cwd(), "ClientScripting/clientScripts.js")
    return await serveFile(request, absFilePath)
}