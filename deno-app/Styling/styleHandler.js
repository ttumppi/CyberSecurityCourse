import { serveFile } from "https://deno.land/std/http/file_server.ts";
import { join } from "https://deno.land/std/path/mod.ts";

export const GetStyleResponse = async (request) => {
    const absFilePath = join(Deno.cwd(), "Styling/styles.css")
    return await serveFile(request, absFilePath)
}