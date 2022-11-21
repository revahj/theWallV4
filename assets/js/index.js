window.onload = function() {
    document.querySelector("form").addEventListener("submit", submitSignUpForm);
}

/**
 * 
 * DOCU: To submit signup form 
 * Triggered: on submit of signup form
 * lLast updated date: November 21, 2022
 * @author Jhaver G.
 */
function submitSignUpForm(e) {
    e.preventDefault();
    let signup_input = document.querySelectorAll("input");
    
    for(let signup_input_index = 0; signup_input_index < signup_input.length; signup_input_index++) {
        let  signup_input_elelement = signup_input[signup_input_index];
        signup_input_elelement.value == "" ? signup_input_elelement.setAttribute("class", "validation_error") : signup_input_elelement.setAttribute("class", "");
    }

    if(document.querySelectorAll(".validation_error").length == 0) {
        document.querySelector("button").textContent="Processing...";

        setTimeout(() =>{
            document.querySelector("#dashboard_link").click();
        }, 2000);
    }
}