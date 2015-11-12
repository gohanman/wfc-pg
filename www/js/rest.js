var rest = function($) {
    var mod = {};

    var restStem = 'http://url/for/backend';

    mod.specials = function() {
        return $.ajax({
            url: restStem + '/specials/',
            dataType: 'json', 
        });
    };

    mod.specialsURL = function() {
        return restStem + '/specials/';
    }

    mod.validateOwner = function(dataStr) {
        return $.ajax({
            url: restStem + '/owner/',
            data: dataStr,
            dataType: 'json',
            type: 'post'
        });
    };

    return mod;
}(jQuery);
