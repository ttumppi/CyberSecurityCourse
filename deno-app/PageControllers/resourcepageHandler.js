import * as renderer from "../renderer.js"
import * as dbHandler from "../db/dbHandler.js"
import {InfoBooleanResult} from "../Classes/InfoBooleanResult.js"
import * as headers from "../headers.js"
import * as tokenSystem from "../TokenHandling/tokenSystem.js"
import {Resource} from "../Classes/Resource.js"

export const GetResourceCreationPage = async (request) => {


    const tokenVerificationResult = await tokenSystem.VerifyAndGetTokenFromHeaders(request.headers)

    if (!tokenVerificationResult.success){
        return new Response(headers.GetDefaultHeadersWithRedirect("/"))
    }

    if (!dbHandler.AdminUser(tokenVerificationResult.token.username)){
        return new Response(headers.GetDefaultHeadersWithRedirect("/"))
    }

    return new Response(renderer.GetResourceCreationPage(), headers.GetDefaultHeaders())
}

export const GetResourceSaveResponse = async (request) => {


    const tokenVerificationResult = await tokenSystem.VerifyAndGetTokenFromHeaders(request.headers)

    if (!tokenVerificationResult.success){
        return new Response(headers.GetDefaultHeadersWithRedirect("/"))
    }

    if (!dbHandler.AdminUser(tokenVerificationResult.token.username)){
        return new Response(headers.GetDefaultHeadersWithRedirect("/"))
    }

    const formData = await request.formData()

    const name = formData.get("name")
    const description = formData.get("description")

    const resource = new Resource(name, description)

    if (await dbHandler.ContainsResource(resource)){
        return new Response(headers.GetDefaultHeadersWithRedirect("/"))
    }

    await dbHandler.AddResource(resource)

    return new Response(headers.GetDefaultHeadersWithRedirect("/"))
}