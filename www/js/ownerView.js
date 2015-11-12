var ownerView = function($){
    var mod = {};

    var html = '<div class="owner-info"></div>';

    var form = '<form id="owner-form">'
        + '<div id="owner-form-alert"></div>'
        + '<div class="form-group">'
        + '<label>Owner # or UPC</label>'
        + '<input type="number" min="1" max="999999999999" step="1" class="form-control" name="id" />'
        + '</div>'
        + '<div class="form-group">'
        + '<label>Last Name</label>'
        + '<input type="text" class="form-control" name="name" />'
        + '</div>'
        + '<div class="form-group">'
        + '<button type="submit" class="btn btn-default">Link Account</button>'
        + '</div>';

    var formCallback = function(e) {
        e.preventDefault();
        rest.validateOwner($('#owner-form').serialize())
            .done(function(data, textStatus, jqXHR) {
                if (data.valid) {
                    dataStore.set('owner-number', data.ownerNumber);
                    ownerDisplay();
                } else {
                    $('#owner-form-alert').html('<div class="alert alert-danger">No account found</div>');
                }
            })
            .fail(function(data, textStatus, jqXHR) {
                $('#owner-form-alert').html('<div class="alert alert-danger">Connection Problem</div>');
            });
        
        return false;
    };

    var ownerForm = function() {
        $('.owner-info').html(form);
        $('#owner-form').submit(formCallback);
        $('#owner-form input:first').focus();
    };

    var ownerDisplay = function() {
        var num = dataStore.get('owner-number');
        var html = '<h1>Owner #' + num + '</h1>';
        $('.owner-info').html(html);
    };

    mod.init = function() {
        $('#nav-container').html(html);
        if (dataStore.get('owner-number') === null) {
            ownerForm();
        } else {
            ownerDisplay();
        }
    };

    return mod;

}(jQuery);
