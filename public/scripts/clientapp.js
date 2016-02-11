$(document).ready(function() {
    $('#post-data').on('click', clickPostData);
    $('#get-data').on('click', clickGetData);

});

function clickPostData() {
    event.preventDefault();
    var values = {};
    $.each($('#post-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    $('#post-form').find('input[type=text]').val('');

    $.ajax({
        type: 'POST',
        url: '/data',
        data: values,
        beforeSend: function() {
            console.log('before!');
        },
        success: function(data) {
            console.log('From Server: ', data);
            console.log(data);
        }
    });


}

function clickGetData() {
    event.preventDefault();
    $.ajax({
        type: 'GET',
        url: '/data',
        success: function(data) {
            console.log(data);
        }
    });
}