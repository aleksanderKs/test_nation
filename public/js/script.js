 'use strict'
$(document).ready(function(){
const $body   = $('body');
//const $ul     = $('<ul>');
const $button = $('.btn')

  $button.click(function(){
let $input = $('#search').val();
console.log('clicked')
console.log($input)
 $.ajax({

  url:'https://restcountries.eu/rest/v1/capital/' + $input,
  method: 'GET',
  dataType: 'json',
  data: {

        },
  success: function(data) {
console.log(data)
      data.forEach(function(cap) {
        console.log(cap.area)
        // console.log(cap.region)




    })

       }

 })
 })
});
