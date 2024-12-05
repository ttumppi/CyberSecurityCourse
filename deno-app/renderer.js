

export const GetHomePageHTML = (resources) => {

    let items = ""

    for (let resource of resources){
        items += `<li>${resource.name}</li>`
    }

    return `
    <html> 
        <head>
            <title> 
            Booking system 
            </title>
            <link rel="stylesheet" href="/styles">
        </head>

        <body>
        <h1> Welcome to the homepage! </h1>

        
        <div class="right-align">
            <a href="/register">Register </a>
            <a href="/login">Login </a>
        </div>

        <p> Reserved resources: </p>
        <ul>
            ${items}
        </ul>
        </body>
    </html>
    `
}

export const GetHomePageWithUsernameHTML = (username, resources) => {

    let items = ""

    for (let resource of resources){
        items += `<li>${resource.name}</li>`
    }

    return `
    <html> 
        <head>
            <title> 
            Booking system 
            </title>
            <link rel="stylesheet" href="/styles">
        </head>

        <body>
        <h1> Welcome to the homepage! </h1>

        <div class="right-align">
            <p> Logged in as : ${username} </p>
            <a href="/logout">Logout </a>
        </div>

        <a href="/reserve">Reserve </a>

        <p> Your reserved resources: </p>
        <ul>
            ${items}
        </ul>

        </body>
    </html>
    `
}

export const GetHomePageAsAdminHTML = (username, resources) => {

    let items = ""

    for (let resource of resources){
        items += `<li>${resource.name}</li>`
    }

    return `
    <html> 
        <head>
            <title> 
            Booking system 
            </title>
            <link rel="stylesheet" href="/styles">
        </head>

        <body>
        <h1> Welcome to the homepage! </h1>

        <a href="/resource">Create resource </a> 
    

        <div class="right-align">
            <p> Logged in as : ${username} </p>
            <a href="/logout">Logout </a>
        </div>

        <a href="/reserve">Reserve </a>

        <p> Your reserved resources: </p>
        
        <ul>
            ${items}
        </ul>
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
            <link rel="stylesheet" href="/styles">
        </head>

        <body>
        <div class="right-align">
            <a href="/">Homepage </a>
        </div>
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
            <link rel="stylesheet" href="/styles">
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
            <link rel="stylesheet" href="/styles">
        </head>

        <body>
        <h1> Register failed! </h1>
        <h2> Error : ${error}   </h2>
        <a href="/">Homepage </a>
        </body>
    </html>
    `
}

export const GetUnsuccesfullLoginPageHTML = (error) => {
    return `
    <html> 
        <head>
            <title> 
            Booking system 
            </title>
            <link rel="stylesheet" href="/styles">
        </head>

        <body>
        <h1> Login failed! </h1>
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
            <link rel="stylesheet" href="/styles">
        </head>

        <body>

        <div class="right-align">
            <a href="/">Homepage </a>
        </div>

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



export const GetResourceCreationPage = (username) => {

    return `
    <html> 
        <head>
            <title> 
            Booking system 
            </title>
            <link rel="stylesheet" href="/styles">
        </head>

        <body>
        <h1> Create resource </h1>

        <form action="/resource" method="post">

            <label for="name">Name:</label><br>
            <input type="text" id="name" name="name" required><br>

            <label for="description">Description:</label><br>
            <input type="text" id="description" name="description" required><br>

            

            <input  type="submit" value="Create">

        </form>

        <div class="right-align">
            <p> Logged in as : ${username} </p>
            <a href="/logout">Logout </a>
        </div>
        </body>
    </html>
    `
} 

export const GetReservingPageHTML = (username, resources) => {
    let items = ""

    for (let resource of resources){
        items += `
                    <li>
                        <p> Resource name: ${resource.name}</p>
                        <p> Resource description: ${resource.description} </p>
                        <form action="/reserve" method="post">
                            <input type="hidden" name="resource" value="${resource.name}">
                            <input type="hidden" name"description" value="${resource.description}">
                            <button type="submit">Reserve </button>
                        </form>
                    </li>`
                    
    }


    return `
    <html> 
        <head>
            <title> 
            Booking system 
            </title>
            <link rel="stylesheet" href="/styles">
        </head>

        <body>
        <h1> Reservation page </h1>

        
    

        <div class="right-align">
            <p> Logged in as : ${username} </p>
            <a href="/logout">Logout </a>
            <a href="/"> Homepage </a>
        </div>

        

        <ul>
            ${items}
        </ul>
        </body>
    </html>
    `


}

export const GetAdminReservingPageHTML = (user, resources, usernames) => {

    let users = ""

    for (let username of usernames){
        users += `<option value="${username.username}">${username.username} </option>`
    }

    let items = ""

    for (let resource of resources){
        items += `
                    <li>
                        <p> Resource name : ${resource.name} </p>
                        <p> Resource description : ${resource.description} </p>
                        <form action="/reserve" method="post">
                            <input type="hidden" name="resource" value="${resource.name}">
                            <input type="hidden" name"description" value="${resource.description}">

                            <label for="role">Reserve for:</label><br>
                            <select id="reserver" name="reserver">
                                ${users}
                            </select><br>

                            <button type="submit">Reserve </button>
                        </form>
                    </li>`
                    
    }


    return `
    <html> 
        <head>
            <title> 
            Booking system 
            </title>
            <link rel="stylesheet" href="/styles">
        </head>

        <body>
        <h1> Reservation page </h1>

        
    

        <div class="right-align">
            <p> Logged in as : ${user} </p>
            <a href="/logout">Logout </a>
            <a href="/"> Homepage </a>
        </div>

        

        <ul>
            ${items}
        </ul>
        </body>
    </html>
    `
}