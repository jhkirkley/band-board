function searchEventsInTown() {
    // event.preventDefault();
    console.log('hello from events in town');
    if ($artist === undefined) {
        $artist = $('#bandName').text();
    }
    $('#info').html('<p>getting events with ' + $artist + '</p>');
    //var $term = $('search-keyword').val();
    var url = 'http://api.bandsintown.com/artists/' + $artist + '/events.json?api_version=2.0&app_id=johnk';

    $.ajax({
        url: url,
        method: "GET",
        data: {
            format: 'json'
        },
        error: function() {
            $('#info').html('<p>An error has occurred</p>');
        },
        dataType: 'jsonp',
        success: function(data) {
            console.log('hello from success');
            console.log(data);
            var JSON = [];
            var bandEvents = data;
            if ($('.userProfile').length === 1 || $('.bandProfile').length === 1) {
                bandEvents.forEach(function(x) {
                    JSON.push({
                        "title": x.title,
                        "start": x.datetime,
                        "allDay": true
                    });
                });

                $('#calendar').fullCalendar({
                    events: JSON
                });

            } else {
                var limit=0;
                bandEvents.forEach(function(x) {
                    if (limit < 5) {
                        $('.showDates').append("<li>" + x.title + " in " + x.formatted_location + "</li>");
                        limit++;
                    }
                });
            }

        }
    });

}

$('.seeTourDates').one('click', function(e) {
    e.preventDefault();
    $artist = $(this).siblings('.card-title').text();
    searchEventsInTown();
});

$(document).ready(function() {

    $('.button-collapse').sideNav({
        menuWidth: 300, // Default is 240
        edge: 'right', // Choose the horizontal origin
        closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor

    });
    if ($('.userProfile').length === 1 || $('.bandProfile').length === 1) {
        searchEventsInTown();
    }
});
