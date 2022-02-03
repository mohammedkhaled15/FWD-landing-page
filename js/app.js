/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/
let sec1 = document.getElementById("section1")
let sec2 = document.getElementById("section2")
let sec3 = document.getElementById("section3")
let navBar = document.querySelector("ul#navbar__list")
let scrollUp = document.querySelector(".scroll-to-top")
let navigator = document.querySelector(".navbar__menu")

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
// Disappearing of button scroll up 

window.addEventListener("scroll", function(){
    if(window.scrollY >= 250){
        scrollUp.style.display = "block"
    }else{
        scrollUp.style.display = "none"
    }
})

// Disappearing of navbar when stop scrolling

window.addEventListener("scroll",function(){
    console.log(`window: ${window.scrollY}`)
    var timer = setTimeout(function(){
        if(window.scrollY > 180){
            navigator.style.display = "none"
            console.log("start")
        }
    },3000)
    navigator.style.display = "block"
})

// if you moved mouse up on the navbar it will appear wehrever you are
window.addEventListener("mousemove",function(e){
    if(e.clientY < 70){
        navigator.style.display = "block"
    
    }
})

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNav(){
    for(i=1; i < document.getElementsByTagName("section").length + 1; i++){
        let listItem = document.createElement("li")
        let navLink =document.createElement("a")
        navLink.classList.add("menu__link")
        navLink.innerHTML = `Section ${i}`
        listItem.appendChild(navLink)
        navBar.appendChild(listItem)
    }
}



// Add class 'active' to section when near top of viewport
function addClassActive(){
    // checking the value of window.scrollY and cmpare it to the value of each section offsetTOp 
    if(window.scrollY >= sec1.offsetTop - 150 && window.scrollY <= sec2.offsetTop -149){
        // removing the class first from all sections
        document.querySelectorAll("section").forEach((sec)=>sec.classList.remove("your-active-class"))
        //adding the class to the section
        sec1.classList.add("your-active-class")
    }else if(window.scrollY >= sec2.offsetTop-150 && window.scrollY <= sec3.offsetTop -149){
        document.querySelectorAll("section").forEach((sec)=>sec.classList.remove("your-active-class"))
        sec2.classList.add("your-active-class")
    }else if(window.scrollY >= sec3.offsetTop-150){
        document.querySelectorAll("section").forEach((sec)=>sec.classList.remove("your-active-class"))
        sec3.classList.add("your-active-class")
    }
}

// Scroll to anchor ID using scrollTO event

    function scrollTOSection(e){
        // console.log(e.target)
        // check if the element which clicked is the <a> link or not
        if(e.target.classList.contains("menu__link")){
            // select sections which have the same data-nav as text content of the button to make it appear in view port
            document.querySelector(`section[data-nav="${e.target.textContent}"]`).scrollIntoView({
            //using options object of scrollIntoView function to make the scroll more smoothy and center the div in view port
            behavior:"smooth",
            block:"center"
        })
        }
        
    }
    
// Scroll to top function

scrollUp.addEventListener("click",function(){
    window.scrollTo(0,0)
})

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
window.addEventListener("load",buildNav) 

// Scroll to section on link click
document.addEventListener("click",scrollTOSection)

// Set sections as active
window.addEventListener("scroll",addClassActive)


