

export const GetHomePageHTML = () => {
    return `
    <html> 
        <head>
            <title> 
            Booking system 
            </title>
        </head>

        <body>
        <h1> Welcome to the homepage! </h1>

        <a href="/register">Register </a>
        </body>
    </html>
    `
}

export const GetRegisterPageHTML = () => {
    return `
    <html> 
        <head>
            <title> 
            Booking system 
            </title>
        </head>

        <body>
        <h1> Register page! </h1>

        <form action="/register" method="post"> 
            <label for="username">username:</label><br>
            <input type="text" id="username" name="username"><br>
            <label for="password">password:</label><br>
            <input type="text" id="password" name="password"><br>
            <input  type="submit" value="Register">
        </form>
        </body>
    </html>
    `
}

export const GetSuccesfullRegisterPageHTML = () => {
    return `
    <html> 
        <head>
            <title> 
            Booking system 
            </title>
        </head>

        <body>
        <h1> Register successfull! </h1>

        <a href="/">Homepage </a>
        </body>
    </html>
    `
}

export const GetUnsuccesfullRegisterPageHTML = () => {
    return `
    <html> 
        <head>
            <title> 
            Booking system 
            </title>
        </head>

        <body>
        <h1> Register failed! </h1>

        <a href="/">Homepage </a>
        </body>
    </html>
    `
}