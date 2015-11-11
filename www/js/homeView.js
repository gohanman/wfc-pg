var homeView = function($) {
    var html = "<div class=\"pp\"><h1>WHAT GOES HERE?</h1></div>";

    var mod = {};
    mod.init = function() { $('#nav-container').html(html); };

    mod.navigate = function(callback, elem) {
        callback();
        $('.nav-pills li').removeClass('active');
        $(elem).closest('li').addClass('active');
    };

    return mod;
}(jQuery);
