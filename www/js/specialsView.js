var specialsView = function($) {
    var html = "<div class=\"pp\">"
        + "<h1>WFC Specials</h1>"
        + "<ul class=\"nav nav-list\" id=\"specials-list\">"
        + "</ul>"
        + "<div id=\"specials-images\"></div>"
        + "</div>";

    var specials = {};

    var mod = {};
    mod.init = function() { 
        $('#nav-container').html(html); 
        rest.specials()
            .done(function(data, textStatus, jqXHR) {
                var link = '<li><a href="#" onclick="specialsView.show({{i}}); return false;">{{text}}</a></li>';
                specials = data;
                for (var i=0; i<data.length; i++) {
                    $('#specials-list').append(link.replace('{{i}}', i).replace('{{text}}', data[i].name)); 
                }
            })
            .fail(function(data, textStatus, jqXHR) {
                $('#specials-list').html('<div class="alert alert-danger">Could not load specials</div>');
            });
    };

    mod.show = function(i) {
        var ret = '<div class="text-center specials">'
            + '<h2>' + specials[i].name + '</h2>' 
            + '<h4>' + specials[i].start + ' to ' + specials[i].end + '</h4>';
        for (var j=0; j<specials[i].images.length; j++) {
            ret += '<img src="' + rest.specialsURL() + specials[i].images[j] + '" />';
            ret += '<div><em>Page ' + (j+1) + '</em></div>';
            console.log(j);
        }
        ret += '</div>';
        $('#specials-images').html(ret);
    };

    return mod;
}(jQuery);
