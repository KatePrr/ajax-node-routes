$(document).ready(function() {

    loadData();

    $('#post-animal-data').on('click', clickPostAnimalData);
    $('#post-name-data').on('click', clickPostNameData);
    $('#get-random-data').on('click', getRandomData);

    //$('#get-name-data').on('click', clickGetNameData);
    //$('#get-animal-data').on('click', clickGetAnimalData);
});

function clickPostNameData() {
    event.preventDefault();
    var values = {};
    $.each($('#post-name-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    $('#post-name-form').find('input[type=text]').val('');

    $.ajax({
        type: 'POST',
        url: '/name',
        data: values,
        beforeSend: function() {
            console.log('before!');
        },
        success: function(data) {
            console.log('From Server: ', data);
            console.log(data);
            arrayToDom(data, '#name-container');
        }
    });
}

function clickGetNameData() {
    event.preventDefault();
    $.ajax({
        type: 'GET',
        url: '/name/random',
        success: function (data) {


            console.log(data);
        }
    });
}

function clickPostAnimalData() {
        event.preventDefault();
        var values = {};
        $.each($('#post-animal-form').serializeArray(), function(i, field) {
            values[field.name] = field.value;
        });

        $('#post-animal-form').find('input[type=text]').val('');

        $.ajax({
            type: 'POST',
            url: '/animals',
            data: values,
            beforeSend: function() {
                console.log('before!');
            },
            success: function(data) {
                console.log('From Server: ', data);
                console.log(data);
                arrayToDom(data, '#animal-container');
            }
        });
    }

function clickGetAnimalData() {
    event.preventDefault();
    $.ajax({
        type: 'GET',
        url: '/animals/random',
        success: function(data) {
            //console.log(data);
        }
    });
}


function arrayToDom(array, id) {
    $(id).children().remove();
    output = '<ul>';
    for (var i = 0; i < array.length; i++){
        output += '<li>' + array[i] + '</li>';
    }
    output += '</ul>';
    $(id).append(output);
};


function loadData() {
    $.ajax({
        type: 'GET',
        url: '/name',
        success: function (data) {
            arrayToDom(data, '#name-container');
            //console.log(data);
        }
    });

    $.ajax({
        type: 'GET',
        url: '/animals',
        success: function (data) {
            arrayToDom(data, '#animal-container');
            //console.log(data);
        }
    });
};

function getRandomData(){
    $('#random-data-container').children().remove();
    $.ajax({
        type: 'GET',
        url: '/animals/random',
        success: function (data) {
           $('#random-data-container').append('<p class="random-pair">' + data + '</p>');
        }
    })
    $.ajax({
        type: 'GET',
        url: '/name/random',
        success: function (data) {
            $('#random-data-container').append('<p class="random-pair">' + data + '</p>');

            //console.log(data);
        }
    })
};