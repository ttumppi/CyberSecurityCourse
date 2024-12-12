import * as tokenSystem from "../TokenHandling/tokenSystem.js"
import * as renderer from "../renderer.js"
import * as headers from "../headers.js"
import * as dbHandler from "../db/dbHandler.js"

export const GetPrivacyPolicyPageResponse = async (request) => {

    return new Response(renderer.GetPrivacyPolicyHTML(), headers.GetDefaultHeaders())
}

export const GetTermsOfServicePageResponse = async (request) => {

    return new Response(renderer.GetTermsOfServiceHTML(), headers.GetDefaultHeaders())
}

