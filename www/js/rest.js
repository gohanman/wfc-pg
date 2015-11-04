var rest = function($) {
    var mod = {};

    mod.specials = function() {
        return $.ajax({
            url: 'wholefoods.coop/ws/specials/',
            dataType: 'json', 
        });
    };

    return mod;
}(jQuery);
