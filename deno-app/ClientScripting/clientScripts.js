function TOSAccepted() {
    return localStorage.getItem("TOS-Accepted") == "true"
}

function AcceptTOS() {
    const checkbox = document.getElementById("tos")

    checkbox.addEventListener("change", function() {
        localStorage.setItem("TOS-Accepted", "true")
        window.location.replace("/register")
        console.log("Clicked checkbox")
    })
}

            

            

document.addEventListener("DOMContentLoaded", function() {

    if (window.location.pathname == "/register" && !TOSAccepted()){
        window.location.replace("/tos")
    }
    
    if (window.location.pathname == "/tos"){
        AcceptTOS()
    }

})
