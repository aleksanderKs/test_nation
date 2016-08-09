 'use strict'
$(document).ready(function(){

const $body   = $('body');
//const $ul     = $('<ul>');
const $button = $('.btn')

  $button.on('click', function(){


 $.ajax({

  url:'https://restcountries.eu/rest/v1/capital/q',
  method: 'GET',
  dataType: 'json',
  data: {
    "q": q
//     name: //get this value from input
   },
  success: function(data) {
//     // let $div= $('.list')
//     // $ul.empty();

      data.forEach(function(cap) {
        console.log(cap.capital)
        console.log(cap.region)
          // console.log(capital.region)



    })

       }

 })
 })
});
