

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
        <a href="/login">Login </a>
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
            <input type="text" id="username" name="username" required><br>
            
            <label for="password">password:</label><br>
            <input type="text" id="password" name="password" required><br>

            <label for="date">Date of birth:</label><br>
            <input type="date" id="birthDate" name="birthDate" required><br>

            <label for="role">Role:</label><br>
            <select id="role" name="role">
                <option value="admin">Administrator</option>
                <option value="reserver">Reserver</option>
            </select><br>

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

export const GetUnsuccesfullRegisterPageHTML = (error) => {
    return `
    <html> 
        <head>
            <title> 
            Booking system 
            </title>
        </head>

        <body>
        <h1> Register failed! </h1>
        <h2> Error : ${error}   </h2>
        <a href="/">Homepage </a>
        </body>
    </html>
    `
}

export const GetLoginPageHTML = () => {
    return `
    <html> 
        <head>
            <title> 
            Booking system 
            </title>
        </head>

        <body>
        <h1> Login page! </h1>

        <form action="/login" method="post"> 
            <label for="username">username:</label><br>
            <input type="text" id="username" name="username" required><br>
            
            <label for="password">password:</label><br>
            <input type="text" id="password" name="password" required><br>

            <input  type="submit" value="Login">
        </form>
        </body>
    </html>`
}