window.onload = function() {
    document.querySelector("form").addEventListener("submit", submitSignupForm);            /* To submit signup form */
}

/**
 * 
 * DOCU: To submit signup form
 * Triggered: on submit of signup for,
 * Last updated date: December 29, 2022
 * @author Jhaver
 */
function submitSignupForm(e) {
    e.preventDefault();

    let signup_input = document.querySelectorAll("input");

    /* To check value of all inputs */
    for(let input_index = 0; input_index < signup_input.length; input_index++) {
        let input_element = signup_input[input_index];
        input_element.value == "" ? input_element.setAttribute("class", "validation_error") : input_element.setAttribute("class", "");
    }

    /* Form validation */
    if(document.querySelectorAll(".validation_error").length == 0) {
        document.querySelector("button").textContent = "Processing...";

        /* Will redirecy tp dashboard after signup */
        setTimeout(() => {
            document.querySelector("#dashboard_link").click();
        }, 2000)
    }
}