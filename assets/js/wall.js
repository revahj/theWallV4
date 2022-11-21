window.onload = function() {
    document.querySelector("#post_topic_form").addEventListener("submit", postTopic);       /* To post a topic */
}

/**
 * 
 * DOCU: To post a topic
 * Triggered: on submit to forum post form
 * lLast updated date: November 21, 2022
 * @author Jhaver G.
 */
function postTopic(e) {
    e.preventDefault();
    let topic_textarea = this.querySelector("textarea")

    if(topic_textarea.value == "") {
        topic_textarea.setAttribute("class", "validation_error")
    }
    else {
        /* To remove no forum handling*/
        document.querySelector("#empty_forum_text").setAttribute("class", "hidden");

        /* To clone post and display data */
        let post_clone      = document.querySelector("#clone_post_container").querySelector("li").cloneNode(true);
        let post_id         = "post" + Date.now();
        topic_textarea.setAttribute("class", "");
        post_clone.querySelector("p").textContent = topic_textarea.value;
        post_clone.setAttribute("id", post_id);
        post_clone.querySelector(".delete_btn").setAttribute("id", "d" + post_id);
        post_clone.querySelector(".edit_btn").setAttribute("id", "e" + post_id);
        post_clone.querySelector("form").setAttribute("id", "f" + post_id);
        
        /* To append new topic */
        document.querySelector("#forum_list").appendChild(post_clone);

        /* To add event listener to post a response */
        document.querySelector("#f" + post_id).addEventListener("submit", postResponse);
        
        /* To reset forim post form */
        this.reset();
    }
}

/**
 * 
 * DOCU: To delete a topic
 * Triggered: on click to delete topic button
 * lLast updated date: November 21, 2022
 * @author Jhaver G.
 */
function deletePost(clicked_id) {
    document.querySelector("#" + clicked_id.substring(1)).remove();
}

/**
 * 
 * DOCU: To edit a topic
 * Triggered: on click to edit topic button
 * lLast updated date: November 21, 2022
 * @author Jhaver G.
 */
 function editPost(clicked_id) {
   let selected_topic           = document.querySelector("#" + clicked_id.substring(1));
   let topic_content = selected_topic.querySelector("p");
   let forum_details = selected_topic.querySelector(".forum_details");

   /* To show edit topic form */
   selected_topic.querySelector("textarea").value = topic_content.innerHTML;
   selected_topic.querySelector("form").querySelector("button").textContent="Save";
   topic_content.setAttribute("class", "hidden");
   forum_details.setAttribute("class", "forum_details hidden");
   selected_topic.querySelector("form").setAttribute("id", "save_topic_form");
   document.querySelector("#save_topic_form").addEventListener("submit", saveTopic);
}

/**
 * 
 * DOCU: To save edit topic form
 * Triggered: on submit of save topic form
 * lLast updated date: November 21, 2022
 * @author Jhaver G.
 */
function saveTopic(e) {
    e.preventDefault();
    let selected_post       = this.closest("li");
    let post_content        = selected_post.querySelector("p");

    /* To save edited post */
    this.setAttribute("id", "");
    this.querySelector("button").textContent="Comment";
    post_content.textContent = this.querySelector("textarea").value;
    post_content.setAttribute("class", "");
    selected_post.querySelector(".forum_details").setAttribute("class", "forum_details")

    /* To reset save topic form*/
    this.reset();
}

/**
 * 
 * DOCU: To post a response
 * Triggered: on submit of post response form
 * lLast updated date: November 21, 2022
 * @author Jhaver G.
 */
function postResponse(e) {
    e.preventDefault();

    if (this.querySelector("textarea").value == "") {
        this.querySelector("textarea").setAttribute("class", "validation_error");
    }
    else {
        this.querySelector("textarea").setAttribute("class", "");
        let response_clone      = document.querySelector("#clone_response_container").querySelector("li").cloneNode(true);
        let response_id         = "post" + Date.now();
        
        /* To clone response and display data */
        response_clone.querySelector("p").textContent = this.querySelector("textarea").value;
        response_clone.setAttribute("id", response_id);
        response_clone.querySelector(".delete_btn").setAttribute("id", "rd" + response_id);
        response_clone.querySelector(".edit_btn").setAttribute("id", "re" + response_id);
        response_clone.querySelector("form").setAttribute("id", "rf" + response_id);
        this.closest("li").querySelector(".response_counter").textContent= (this.closest("li").querySelector(".response_list").children.length + 1) + " Responses";

        /* To append new topic */
        this.closest("li").querySelector("ul").appendChild(response_clone);

        /* To reset the form */
        this.reset();
    }
}

/**
 * 
 * DOCU: To post a response
 * Triggered: on submit of post response form
 * lLast updated date: November 21, 2022
 * @author Jhaver G.
 */
function deleteResponse(clicked_id) {
    /* To udpate response counter */
    let response_list = document.querySelector("#" + clicked_id.substring(2)).closest(".response_list");
    response_list.closest("li").querySelector(".response_counter").textContent=(response_list.children.length - 1) + " Responses";
    
    /* To delete a response */
    document.querySelector("#" + clicked_id.substring(2)).remove();
}

/**
 * 
 * DOCU: To edit a response
 * Triggered: on click to edit response button
 * lLast updated date: November 21, 2022
 * @author Jhaver G.
 */
 function editResponse(clicked_id) {
    let selected_response           = document.querySelector("#" + clicked_id.substring(2));
    let topic_content = selected_response.querySelector("p");
    let forum_details = selected_response.querySelector(".forum_details");
 
    /* To show edit topic form */
    selected_response.querySelector("form").setAttribute("class", "");
    selected_response.querySelector("textarea").value = topic_content.innerHTML;
    selected_response.querySelector("form").querySelector("button").textContent="Save";
    selected_response.querySelector(".action_container").setAttribute("class", "action_container hidden");
    topic_content.setAttribute("class", "hidden");
    forum_details.setAttribute("class", "forum_details hidden");
    selected_response.querySelector("form").setAttribute("id", "save_response_form");
    document.querySelector("#save_response_form").addEventListener("submit", saveResponse);
 }

 function saveResponse(e) {
    e.preventDefault();

    let selected_post       = this.closest("li");
    let post_content        = selected_post.querySelector("p");

    /* To save edited post */
    this.setAttribute("id", "");
    this.querySelector("button").textContent="Comment";
    post_content.textContent = this.querySelector("textarea").value;
    post_content.setAttribute("class", "");
    selected_post.querySelector(".forum_details").setAttribute("class", "forum_details");
    selected_post.querySelector(".action_container").setAttribute("class", "action_container");
    selected_post.querySelector("form").setAttribute("class", "hidden");

    /* To reset save topic form*/
    this.reset();
 }