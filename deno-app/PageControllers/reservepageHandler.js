import * as renderer from "../renderer.js"
import * as dbHandler from "../db/dbHandler.js"
import {InfoBooleanResult} from "../Classes/InfoBooleanResult.js"
import * as headers from "../headers.js"
import * as tokenSystem from "../TokenHandling/tokenSystem.js"
import {Resource} from "../Classes/Resource.js"

export const GetReservePageResponse = async (request) => {
    const tokenVerificationResult = await tokenSystem.VerifyAndGetTokenFromHeaders(request.headers)

    if (!tokenVerificationResult.success){
        return new Response(null, headers.GetDefaultHeadersWithRedirect("/"))
    }

    const resources = await dbHandler.GetFreeResources()

    if (!(await dbHandler.AdminUser(tokenVerificationResult.token.username))){
        return new Response(renderer.GetReservingPageHTML(tokenVerificationResult.token.username, resources), headers.GetDefaultHeaders())
    }

    const usernames = await dbHandler.GetUsernames()

    return new Response(renderer.GetAdminReservingPageHTML(tokenVerificationResult.token.username, resources, usernames), headers.GetDefaultHeaders())

}

export const GetResourceReservingResponse = async (request) => {

    const tokenVerificationResult = await tokenSystem.VerifyAndGetTokenFromHeaders(request.headers)

    if (!tokenVerificationResult.success){
        return new Response(null, headers.GetDefaultHeadersWithRedirect("/"))
    }

    const formData = await request.formData()

    const username = formData.get("reserver")

    const resourceName = formData.get("resource")

    const resourceDescription = formData.get("description")

    if (!username){
        return await TrySaveReservationAndGetResponse(new Resource(resourceName, resourceDescription), tokenVerificationResult.token.username)
    }

    return await TrySaveAdminReservationAndGetResponse(new Resource(resourceName, resourceDescription), username)

}

const TrySaveReservationAndGetResponse = async (resource, username) => {
    const reserved = await dbHandler.ResourceReserved(resource)

    if (reserved){
        return new Response(null, headers.GetDefaultHeadersWithRedirect("/"))
    }

    const results = await dbHandler.ReserveResource(resource, username)

    return new Response(null, headers.GetDefaultHeadersWithRedirect("/reserve"))
}

const TrySaveAdminReservationAndGetResponse = async (resource, username) => {
    const reserved = await dbHandler.ResourceReserved(resource)

    if (reserved){
        return new Response(null, headers.GetDefaultHeadersWithRedirect("/"))
    }

    const results = await dbHandler.ReserveResource(resource, username)

    return new Response(null, headers.GetDefaultHeadersWithRedirect("/reserve"))
}