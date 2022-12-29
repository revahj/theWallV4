window.onload = function() {
    document.querySelector("#post_topic_form").addEventListener("submit", postTopic);   /* To post a topic */
}


/**
 * 
 * DOCU: To post a topic
 * Triggered: on submit of forum post form,
 * Last updated date: December 29, 2022
 * @author Jhaver
 */
function postTopic(e) {
    e.preventDefault();

    let topic_textarea = this.querySelector("textarea");
    
    /* Form validation */
    if(topic_textarea.value == "") {
        topic_textarea.setAttribute("class", "validation_error");
    }
    else {
        topic_textarea.setAttribute("class", "");

        /*To hide now forum handling*/
        document.querySelector(".empty_forum_text").setAttribute("class", "empty_forum_text hidden");

        /* To clone post and display data */
        let post_clone = document.querySelector("#clone_post_container").querySelector("li").cloneNode(true);
        post_clone.querySelector("p").textContent = topic_textarea.value;

        /* To append new topic */
        document.querySelector("#forum_list").appendChild(post_clone);

        /* To add event listener */
        post_clone.querySelector("form").addEventListener("submit", postResponse);                      /* To post a response */
        post_clone.querySelector(".edit_btn").addEventListener("click", editPost);
        post_clone.querySelector(".delete_btn").addEventListener("click", showDeleteConfirmation);
        post_clone.querySelector(".yes_btn").addEventListener("click", confirmDeletePost);
        post_clone.querySelector(".no_btn").addEventListener("click", cancelDeleteConfirmation);

        /* To reset form */
        this.reset();
    }
}

/**
 * 
 * DOCU: To post a response
 * Triggered: on submit of post response form,
 * Last updated date: December 29, 2022
 * @author Jhaver
 */
function postResponse(e) {
    e.preventDefault();

    /* Form validation */
    if(this.querySelector("textarea").value == "") {
        this.querySelector("textarea").setAttribute("class", "validation_error");
    }
    else {
        this.querySelector("textarea").setAttribute("class", "");

        /* To clone response and display data */
        let response_clone = document.querySelector("#clone_post_container").querySelector("li").cloneNode(true);
        response_clone.querySelector("p").textContent = this.querySelector("textarea").value;
        this.closest("li").querySelector(".response_counter").textContent = (this.closest("li").querySelector(".response_list").children.length + 1) + " Responses";
        response_clone.querySelector("form").setAttribute("class", "edit_response_form hidden");

        /* To add event listener */
        response_clone.querySelector(".edit_btn").addEventListener("click", editResponse);
        response_clone.querySelector(".delete_btn").addEventListener("click", showDeleteConfirmation);
        response_clone.querySelector(".yes_btn").addEventListener("click", confirmDeleteResponse);
        response_clone.querySelector(".no_btn").addEventListener("click", cancelDeleteConfirmation);

        /* To append new response */
        this.closest("li").querySelector("ul").appendChild(response_clone);
        
        /* To reset form */
        this.reset();
    }
}

/**
 * 
 * DOCU: To edit a topic
 * Triggered: on click to edit topic button
 * lLast updated date: December 29, 2022
 * @author Jhaver G.
 */
function editPost() {
    let selected_topic      = this.closest("li");
    let response_form_clone = selected_topic.querySelector(".edit_response_form").cloneNode(true);
    let topic_content       = selected_topic.querySelector("p");
    let forum_details       = selected_topic.querySelector(".forum_details");

    /* To clone response and display data */
    response_form_clone.setAttribute("class", "edit_response_form");
    forum_details.setAttribute("class", "forum_details hidden");
    topic_content.setAttribute("class", "hidden");
    selected_topic.insertBefore(response_form_clone, selected_topic.children[0]);

    /* To show edit topic form */
    selected_topic.querySelector(".edit_response_form textarea").value = topic_content.innerHTML;
    selected_topic.querySelector(".edit_response_form button").textContent="Save";

    /* To add event listener */
    selected_topic.querySelector(".edit_response_form").addEventListener("submit", saveTopic);
}

/**
 * 
 * DOCU: To show delete confirmation
 * Triggered: on click to show delete confirmation
 * lLast updated date: December 29, 2022
 * @author Jhaver G.
 */
function showDeleteConfirmation() {
    this.closest("li").setAttribute("class", "show_confirmation");
}

/**
 * 
 * DOCU: To delete a topic
 * Triggered: on click to delete topic button
 * lLast updated date: December 29, 2022
 * @author Jhaver G.
 */
function confirmDeletePost() {
    /* To delete a post */
    this.closest("li").remove();
    
    /* To show no post yet text */
    document.querySelectorAll("#forum_list li").length == "0" && document.querySelector(".empty_forum_text").setAttribute("class", "empty_forum_text");
}

/**
 * 
 * DOCU: To edit a response
 * Triggered: on click to edit response button
 * lLast updated date: December 29, 2022
 * @author Jhaver G.
 */
function editResponse() {
    let selected_response   = this.closest("li");
    let topic_content       = selected_response.querySelector("p");
    let forum_details       = selected_response.querySelector(".forum_details");

    /* To show edit topic form */
    selected_response.querySelector("form").setAttribute("class", "edit_response_form");
    selected_response.querySelector("textarea").value = topic_content.innerHTML;
    selected_response.querySelector("form").querySelector("button").textContent="Save";
    selected_response.querySelector(".action_container").setAttribute("class", "action_container hidden");
    topic_content.setAttribute("class", "hidden");
    forum_details.setAttribute("class", "forum_details hidden");

    /* To add event listener */
    selected_response.querySelector(".edit_response_form").addEventListener("submit", saveResponse);
}

/**
 * 
 * DOCU: To delete a response
 * Triggered: on click to delete topic button
 * lLast updated date: December 29, 2022
 * @author Jhaver G.
 */
function confirmDeleteResponse() {
    /* To update response counter */
    let response_list = this.closest(".response_list");
    response_list.closest("li").querySelector(".response_counter").textContent = (response_list.children.length - 1) + " Responses";

    /* To delete a response */
    this.closest("li").remove();
}

/**
 * 
 * DOCU: To cancel delete
 * Triggered: on click to cancel button
 * lLast updated date: December 29, 2022
 * @author Jhaver G.
 */
function cancelDeleteConfirmation() {
    this.closest("li").setAttribute("class", "");
}

/**
 * 
 * DOCU: To save edit response form
 * Triggered: on submit of save response form
 * lLast updated date: December 29, 2022
 * @author Jhaver G.
 */
function saveResponse(e) {
    e.preventDefault();
    
    let selected_post   = this.closest("li");
    let post_content    = selected_post.querySelector("p");

    /* To save edited post */
    this.querySelector("button").textContent = "Comment";
    post_content.textContent = this.querySelector("textarea").value;
    post_content.setAttribute("class", "");
    selected_post.querySelector(".forum_details").setAttribute("class", "forum_details");
    selected_post.querySelector(".action_container").setAttribute("class", "action_container");
    selected_post.querySelector("form").setAttribute("class", "hidden");

    /* To reset save topic form */
    this.reset();
}

/**
 * 
 * DOCU: To save edit topic form
 * Triggered: on submit of save topic form
 * lLast updated date: December 29, 2022
 * @author Jhaver G.
 */
function saveTopic(e) {
    e.preventDefault();
    
    /* To save edited post */
    let selected_post   = this.closest("li");
    let post_content    = selected_post.querySelector("p");

    post_content.textContent = this.querySelector("textarea").value;
    post_content.setAttribute("class", "");
    selected_post.querySelector(".forum_details").setAttribute("class", "forum_details");
    selected_post.querySelector(".action_container").setAttribute("class", "action_container");
    selected_post.querySelector("form").setAttribute("class", "hidden");

    /* To reset form */
    this.reset();
}