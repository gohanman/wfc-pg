var homeView = function($) {
    var html = "<div class=\"app\">WFC JS</div>";

    var mod = {};
    mod.init = function() { $('#nav-container').html(html); };

    mod.navigate = function(callback, elem) {
        callback();
        $('.nav-pills li').removeClass('active');
        $(elem).closest('li').addClass('active');
    };

    return mod;
}(jQuery);
