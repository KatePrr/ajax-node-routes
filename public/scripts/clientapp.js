$(document).ready(function() {

    loadData();

    $('#name-container').on('click', '.post-animal-data', clickPostAnimalData);
    $('#post-name-data').on('click', clickPostNameData);
    //$('#get-random-data').on('click', getRandomData);
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
        success: function(data) {
            console.log('From Server: ', data);
            console.log(data);
            personToDOM(data, '#name-container');
        }
    });
}


function clickPostAnimalData() {
        event.preventDefault();
        var values = {};
        $.each($('#post-animal-form').serializeArray(), function(i, field) {
            values[field.name] = field.value;
        });

        values.id = $(this).data('id');

        $.ajax({
            type: 'POST',
            url: '/animals',
            data: values,
            success: function(data) {
                console.log('From Server: ', data);
                console.log(data);
            }
        });
    $(this).parent().parent().remove();
    }

function personToDOM(person, id) {
    output = '<div>';
        output += '<p>' + person.first_name + ' ' +  person.last_name + '</p>';
        output += '<form id="post-animal-form"><label for="' + person.first_name + '-animal">' + person.first_name + '\'s Spirit Animal: </label>';
        output += '<input type="text" id="' + person.first_name + '" name="animal_name" />';

        output += '<label for="' + person.first_name + '-color">Spirit Animal Color: </label>';
        output += '<input type="text" id="' + person.first_name + '" name="animal_color" />';
        output += '<button class="post-animal-data" data-id="' + person.id + '">Submit</button></form>';

        output += '</div>';
    $(id).append(output);
}


function loadData() {
    $.ajax({
        type: 'GET',
        url: '/name',
        success: function (data) {
            //console.log(data);
        }
    });

    $.ajax({
        type: 'GET',
        url: '/animals',
        success: function (data) {
          //  arrayToDom(data, '#animal-container');
            //console.log(data);
        }
    });
}


//function clickGetNameData() {
//    event.preventDefault();
//    $.ajax({
//        type: 'GET',
//        url: '/name/random',
//        success: function (data) {
//
//
//            console.log(data);
//        }
//    });
//}



//
//function clickGetAnimalData() {
//    event.preventDefault();
//    $.ajax({
//        type: 'GET',
//        url: '/animals/random',
//        success: function(data) {
//            //console.log(data);
//        }
//    });
//}



//function getRandomData(){
//    $('#random-data-container').children().remove();
//    $.ajax({
//        type: 'GET',
//        url: '/animals/random',
//        success: function (data) {
//           $('#random-data-container').append('<p class="random-pair">' + data + '</p>');
//        }
//    })
//    $.ajax({
//        type: 'GET',
//        url: '/name/random',
//        success: function (data) {
//            $('#random-data-container').append('<p class="random-pair">' + data + '</p>');
//
//            //console.log(data);
//        }
//    })
//};