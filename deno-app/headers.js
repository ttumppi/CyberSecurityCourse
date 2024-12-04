
export const GetDefaultHeaders = () => {
    return {
        headers: {"Content-Type": "text/html",
            "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self';",
            "X-Frame-Options": "DENY",
            "X-Content-Type-Options": "nosniff"
        }}

}

export const GetDefaultHeadersWithToken = (token) => {
    return {
        headers: {"Content-Type": "text/html",
            "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self';",
            "X-Frame-Options": "DENY",
            "X-Content-Type-Options": "nosniff",
            "Set-Cookie": `Authorization=Bearer ${token}; HttpOnly; SameSite=Lax;`
        }}
        
}

export const GetDefaultHeadersWithTokenAndRedirect = (token, url) => {
    return {
        status: 302, 
        headers: {"Content-Type": "text/html",
            "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self';",
            "X-Frame-Options": "DENY",
            "X-Content-Type-Options": "nosniff",
            "Set-Cookie": `Authorization=Bearer ${token}; HttpOnly; SameSite=Lax;`,
            "Location": `${url}`
        }
    }
}

export const GetDefaultHeadersWithRedirect = (url) => {
    return {
        status: 302, 
        headers: {"Content-Type": "text/html",
            "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self';",
            "X-Frame-Options": "DENY",
            "X-Content-Type-Options": "nosniff",
            "Location": `${url}`
        }
    }
}

