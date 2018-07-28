pageToken = "";

function appendresult(item) {
    for (let i = 0; i < item.length; i++) {
        if (item[i] == null) {
            $("#result-list").append("<p>No more result!</p>");
            break;
        } else {
            $("#result-list").append(`
                <a class="result col-md-12" href="https://www.youtube.com/watch?v=${item[i].id.videoId}?autoplay=true" target="_blank">
                <img src="${item[i].snippet.thumbnails.default.url}" alt="">
                <div class="video_info">
                    <h2 class="title">${item[i].snippet.title}</h2>
                    <p class="description">${item[i].snippet.description}</p>
                    <span>View </span>
                </div>
            </a>
        `);
        }
    }
}

$(document).ready(function () {
    $("#search").on("submit", function (event) {
        event.preventDefault();
        $("#result-list").empty();
        $.ajax({
            url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=' + $("#keyword").val() + '&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw',  //link lấy API
            type: 'GET',
            success: function (body) {
                appendresult(body.items);
                pageToken = body.nextPageToken;
            }
        });
    });
    $(window).scroll(function () {
        if ($(window).scrollTop() > $(document).height() - $(window).height() - 10) {
            $.ajax({
                url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=' + $("#keyword").val() + '&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw&pageToken=' + pageToken,  //link lấy API
                type: 'GET',
                success: function (body) {
                    appendresult(body.items);
                    pageToken = body.nextPageToken;
                }
            });
        }
    });
});



