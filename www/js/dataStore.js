var dataStore = function($) {
    var mod = {};
    
    mod.get = function(i) {
        return window.localStorage.getItem(i);
    }

    mod.set = function(i, v) {
        window.localStorage.setItem(i, v);
    }

    mod.del = function(i) {
        window.localStorage.removeItem(i);
    }

    return mod;

}(jQuery);
