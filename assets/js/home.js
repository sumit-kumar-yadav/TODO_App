var input = $("#datepicker").datepicker({ dateFormat: 'dd-mm-yy' });  // jQuery UI

console.log("home.js is loaded");

//     var checked = $('.checkbox').prop('checked');  ->> true/false
//     var checkboxVal = $('.checkbox').val();  --> value across name




// Change the background color if focused.
$('#category').on('focusin', function(event){
    // event.preventDefault();
    $(this).css('backgroundColor', 'rgb(226, 222, 222);');
}).on('focusout', function(event){
    // event.preventDefault();
    $(this).css('backgroundColor', 'initial');
});

$('#due-date').on('focusin', function(event){
    // event.preventDefault();
    $(this).css('backgroundColor', 'rgb(226, 222, 222);');
}).on('focusout', function(event){
    // event.preventDefault();
    $(this).css('backgroundColor', 'initial');
});
