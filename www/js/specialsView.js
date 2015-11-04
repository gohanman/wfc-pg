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
        var ret = '<h3>' + specials[i].expires + '</h3>'; 
        for (var j=0; j<specials[i].pages.length; j++) {
            ret += '<img src="' + specials[i].pages[j] + '</img>';
            ret += '<div><em>Page ' + (j+1) + '</em></div>';
        }
        $('#specials-images').html(ret);
    };

    return mod;
}(jQuery);
