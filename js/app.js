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
let allSections = document.querySelectorAll("section")

// making all variables automatically
for(i=1 ; i<= allSections.length; i++){
    window["sec" + i] = document.getElementById(`section${i}`)
}
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

    // using the settimeout to make the navbar disappear after 3sec
    let timer = setTimeout(function(){

        // after scrolling down a little bit our party begin
        if(window.scrollY > 180){
            navigator.style.display = "none"
        }
    },3000)

    // after intiating scrolling the navbar getting alive again
    navigator.style.display = "block"
})

// if you moved mouse up on the navbar it will appear wehrever you are
window.addEventListener("mousemove",function(e){

    // pointer position to vertical direction
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
    // looping on all sections to made abutton for each one
    for(i=1; i <= allSections.length; i++){

        //creating list item first
        let listItem = document.createElement("li")

        // creating anchor tag
        let navLink =document.createElement("a")

        //addding class (menu__link) to our nav
        navLink.classList.add("menu__link")

        //adding text to each button as name of section
        navLink.innerHTML = `Section ${i}`

        // appending each element to its parent in DOM
        listItem.appendChild(navLink)
        navBar.appendChild(listItem)
    }
}



// Add class 'active' to section when near top of viewport

function addClassActive(){

    // looping on all sections already exists in the page
    for(let index = 1; index<= allSections.length ;index++){ 

        // checking that not last section to avoid error due to  comparing to next section which isn't exist
        if(index !== allSections.length){

            // checking the value of the window scrollY according to sections offsetstop
            if(window.scrollY >= window[`sec${index}`].offsetTop - 150 && window.scrollY <= window[`sec${index+1}`].offsetTop -149){

                // removing the class first from all sections
                allSections.forEach((sec)=>sec.classList.remove("your-active-class"))

                //adding the class to the section
                window[`sec${index}`].classList.add("your-active-class")
            }
        }else{
            // here we compared to the whole body height cause that is the last section. also to avoid error due to comparing to undefined 
            if(window.scrollY >= window[`sec${index}`].offsetTop - 150 && window.scrollY <= document.body.scrollHeight -149){

                // removing the class first from all sections
                allSections.forEach((sec)=>sec.classList.remove("your-active-class"))

                //adding the class to the section
                window[`sec${index}`].classList.add("your-active-class")
            }
        }
    }
}

// Scroll to anchor ID using scrollTO event

    function scrollTOSection(e){

        // check if the element which clicked is the <a> link or not
        if(e.target.classList.contains("menu__link")){

            // removing active class from all links
            document.querySelectorAll("ul li a").forEach((link)=>link.classList.remove("active"))

            //adding class active to the clicked link
            e.target.classList.add("active")

            // select sections which have the same data-nav as text content of the button to make it appear in view port using method of scrollintoview
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


