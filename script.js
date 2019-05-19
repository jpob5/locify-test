let posts = []; // An array to hold all posts

// Get posts from API
function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts?userId=1')
        .then(response => response.json())
        .then(function(data) {
            posts = data;
            getComments(posts[0]);
        });
}

// Get Comments from API
function getComments(value) {
    fetch('https://jsonplaceholder.typicode.com/comments?postId=' + value.id)
        .then(response => response.json())
        .then(function(data) {
            printPost(value);
            for (let i = 0; i < data.length; i++) {
                printComments(data[i], '.post' + value.id);
            }
            if (value.id < posts.length) {
                getComments(posts[value.id]);
            }
        });
}

// Show posts
function printPost(value) {
    $('.posts').append('<div class="post post' + value.id + '">\
    <div class="title">' + value.title + '</div>\
    <div class="body">' + value.body + '</div>\
    <div class="buttons">\
    <div class="like-button">Like</div>\
    <div class="comment-button" data-val="' + value.id + '">Comment</div>\
    </div>\
    <div class="new-comment new-comment' + value.id + '">\
    <input class="comment-name" type="text" placeholder="Comment name" data-val="' + value.id + '">\
    <textarea class="comment-input" rows="4" placeholder="Enter comment here..." data-val="' + value.id + '"></textarea>\
    <div class="add-comment" data-val="' + value.id + '">Add Comment</div></div></div>');
}

// Show comments
function printComments(comment, element) {
    $(element).append('<div class="comment"><div class="name">' + comment.name + '</div><div class="body">' + comment.body + '</div></div>');
}

$(document).ready(function() {
    // Toggle like
    $('.posts').on('click', '.like-button', function() {
        $(this).toggleClass('liked');
    });

    // Toggle comment area
    $('.posts').on('click', '.comment-button', function() {
        let postNumber = $(this).attr('data-val');
        $('.new-comment' + postNumber).toggle();
    });

    // Add comment
    $('.posts').on('click', '.add-comment', function() {
        let postNumber = $(this).attr('data-val');
        let commentName = $('.new-comment' + postNumber + ' .comment-name').val();
        let commentBody = $('.new-comment' + postNumber + ' .comment-input').val();

        if (commentName && commentBody) {
            $('.new-comment' + postNumber + ' .comment-name').val('');
            $('.new-comment' + postNumber + ' .comment-input').val('');
            $('.new-comment' + postNumber).after('<div class="comment"><div class="name">' + commentName + '</div><div class="body">' + commentBody + '</div></div>');
        }
    });

    getPosts();

});