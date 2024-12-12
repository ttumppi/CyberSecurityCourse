

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
            <a href="/policy">Privacy policy </a>
            <a href="/tos"> Terms of Service </a>
        </div>
        

        <p> Reserved resources: </p>
        <ul>
            ${items}
        </ul>
        </body>
    </html>
    `
}

export const GetHomePageWithUnderageUsernameHTML = (username, resources) => {
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
            <a href="/policy">Privacy policy </a>
            <a href="/tos"> Terms of Service </a>
            <a href="/account">My account </a>
        </div>
        
        
        <p> Your reserved resources: </p>
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
            <a href="/policy">Privacy policy </a>
            <a href="/tos"> Terms of Service </a>
            <a href="/account">My account </a>
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
            <a href="/policy">Privacy policy </a>
            <a href="/tos"> Terms of Service </a>
            <a href="/account">My account </a>
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

        <script src="/clientScripts"></script>

        <div class="right-align">
            <a href="/">Homepage </a>
            <a href="/tos"> Terms of Service </a>
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
            <a href="/policy">Privacy policy </a>
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

export const GetPrivacyPolicyHTML = () => {
    return `
    <html> 
        <head>
            <title> 
            Booking system 
            </title>
            <link rel="stylesheet" href="/styles">
        </head>

        <body>
        <h1> Privacy policy: </h1>
        <h2> This website collects and stores the entered username and birthdate and password to a database upon registration.<br />
            Each succesfull login is logged and in the log stores the username and ip address from the client. <br /> 
            These parts of user data are not distributed and are only for internal monitoring of the application. </h2>
    

        <div class="right-align">
            
            <a href="/"> Homepage </a>
            <a href="/tos"> Terms of Service </a>
        </div>

        

       
        </body>
    </html>
    `
}

export const GetTermsOfServiceHTML = () => {
    return `
    <html> 
        <head>
            <title> 
            Booking system 
            </title>
            <link rel="stylesheet" href="/styles">
        </head>

        <body>

         <script src="/clientScripts"></script>


         <div class="right-align">
            
            <a href="/"> Homepage </a>
            <a href="/policy"> Privacy policy </a>
        </div>

        <h1> Terms of service: </h1>

        <h1> Please accept the terms of service to be able to register: </h1>
        <h2> Terms of Service of CyberSecurityCourse project </h2>

        <p>This document governs</p>
        <ul>
            <li>the use of our website, and,</li>
            <li>any other related agreement or legal relationship with us</li>
        </ul>
        <p>in a legally binding way.</p>
        <p>You must read this document carefully.</p>

        <h2>TERMS OF USE</h2>
        <p>Unless stated otherwise, the terms in this section apply generally when using our website.</p>
        <p>Specific or additional conditions may apply in certain situations and are noted in this document.</p>
        <p> When registering, you are responsible for creating strong passwords. </p>
        <p> By registering, you agree to take full responsibility for all activities under your username and password. </p>
        <p>Registration of accounts on our website is subject to the conditions outlined below. By registering, you agree to meet such conditions.</p>
        <ul>
            <li> It is not permitted to register accounts by bots or any other automated methods;</li>
            <li> You must register only one account, unless otherwise specified;</li>
            <li> Your account must not be shared with other persons unless otherwise specified.</li>
        </ul>

        <p> We do our best to ensure the content on our website complies with all laws and respects third-party rights. However, this may not always be achievable.</p>

        <h4 >Rights regarding content on our website - All rights reserved</h4>
        <p> We hold and reserve all intellectual property rights for all content.</p>
        <p> You may not use such content in any way that is not necessary or implied for the proper use of the service.</p>
        <p> Specifically, but without limitation, you may not copy, download, share (beyond the limits mentioned below), modify, translate, transform, publish, transmit, sell, sublicense, edit, transfer, assign to third parties, or create derivative works from the content on our website. You also cannot allow any third party to do so through your account or device, even unknowingly.</p>
        <p> Where explicitly stated, you may download, copy, and share some content from our website for personal and non-commercial use, provided you correctly implement copyright and other required attributions.</p>
        <p> Any statutory limitations or exceptions to copyright remain unaffected.</p>

        <p> We reserve the right to protect our interests by denying you access to our website or service, terminating contracts, and reporting any misconduct to the appropriate authorities if you are involved in or suspected of the following:</p>
        <ul>
            <li> violating laws, regulations, or these terms;</li>
            <li> infringing on third-party rights;</li>
            <li> significantly impairing our legitimate interests;</li>
            <li> offending us or any third party.</li>
        </ul>

        <label>I understand</label>
        <input type="checkbox" id="tos" name="tos">
        

        

        

        

       
        </body>
    </html>
    `
}

export const GetAccountPage = (username, userData) => {
    return `
    <html> 
        <head>
            <title> 
            Booking system 
            </title>
            <link rel="stylesheet" href="/styles">
        </head>

        <body>

         <script src="/clientScripts"></script>

        

        <h2> Username : ${username} </h2>
        <h2> Birth Date : ${userData.birthDate}</h2>
        <h2> Role : ${userData.role}</h2>
    
        
       
        

        

        <div class="right-align">
            
            <a href="/"> Homepage </a>
            
        </div>

        

       
        </body>
    </html>
    `
}