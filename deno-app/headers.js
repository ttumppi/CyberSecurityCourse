
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
            "Authorization": `Bearer ${token}`
        }}
        
}