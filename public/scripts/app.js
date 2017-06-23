// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("body"));
//     }
//   });;
// });

$(() => {

  $('.cancelbtn1').on('click', function(e) {
    e.preventDefault();
    $('#nameOfTopping').val('');
  });

  $('.cancelbtn2').on('click', function(e) {
    e.preventDefault();
    $('#numberOfToppings').val('');
  });

  $('.cancelbtn3').on('click', function(e) {
    e.preventDefault();
    $('#nameOfsauce').val('');
  });

  $('.cancelbtn4').on('click', function(e) {
    e.preventDefault();
    $('#nameOfCheese').val('');
  });

  $('#hero-head').hide();

  $('.hero-image').on('click', function(){
    $('#hero-head').toggle()
  })

  $('#p1').hide();

  $('#h2').on('click', function(e) {
    e.preventDefault();
    $('#p1').toggle();
  })

  $('#clear').click(function(e){
    e.preventDefault();
    $('#toppings').empty();
    $('#numberOfToppings').val('');
    $('#clear').empty();
  })

  $('#tryAgain').click( function(e) {
    e.preventDefault();
    console.log(e)
    $('#nameOfTopping').val('');
    $('#ThankYouMsg').empty();
    $(this).empty();
  })

  $('#tryAgainSauce').click(function(e){
    e.preventDefault();
    console.log(e)
    $('#nameOfsauce').val('');
    $('#ThankYouMsgSauce').empty();
    $(this).empty();
  })

  $('#tryAgainCheese').click(function(e){
    e.preventDefault();
    console.log(e)
    $('#nameOfCheese').val('');
    $('#ThankYouMsgCheese').empty();
    $(this).empty();
  })

  $('#ToppingForm').on('submit', function(e) {
    e.preventDefault();
    console.log('e',e)
    if(!$.isNumeric($('#nameOfTopping').val())){
      $.ajax({
        url: '/insertTopping',
        type: 'POST',
        data: {
          topping_name: $('#nameOfTopping').val(),
          v_or_n: $('#VorN').val()
        }
      })
      .done((works) =>{
        var data = JSON.parse(works).thanks;
        console.log('does this', works)
        $('#ThankYouMsg').append(data)
        $('#tryAgain').append('Tell me more <a><u>here</u></a>')
      })
    } else {
      $('#tryAgain').append('A number is not a topping bud.. Try again <a><u>here</u></a>')
    }
  })

  $("#sauceForm").on('submit', function(e){
    e.preventDefault();
    console.log("e",e);
    if(!$.isNumeric($('#nameOfsauce').val())){
      $.ajax({
        url: '/insertSauce',
        type: 'POST',
        data: {
          sauce_name: $('#nameOfsauce').val()
        }
      }).done((works)=>{
        var data = JSON.parse(works).thanks;
        $('#ThankYouMsgSauce').append(data)
        $('#tryAgainSauce').append('Tell me more <a><u>here</u></a>')
      })
    } else {
      $('#tryAgainSauce').append('<h3>A number is not a type of sauce buddy... Try again <a><u>here</u></a></h3>')
    }
  })


  $('#cheeseForm').on('submit', function(e) {
    e.preventDefault();
    console.log('e', e);
    if(!$.isNumeric($('#nameOfCheese').val())){
      $.ajax({
        url: '/insertCheese',
        type: 'POST',
        data: {
          cheese_name: $('#nameOfCheese').val()
        }
      }).done((works) => {
        var data = JSON.parse(works).thanks;
        $('#ThankYouMsgCheese').append(data)
        $('#tryAgainCheese').append('Tell me more <a><u>here</u></a>')
      })
    } else {
      $('#tryAgainCheese').append('<h3>A number is not a type of cheese my friend... Try again <a><u>here</u></a></h3>')
    }
  })


  $('#generator').on('submit', function (e) {
    e.preventDefault();
    if($.isNumeric($('#numberOfToppings').val())){
      $.ajax({
        url: '/getToppings',
        method: 'POST',
        data: {
          numberOfToppings: $('#numberOfToppings').val(),
          v_or_n: $('#vegOrnon').val()
        }
      }).done((tops) => {
        var newToppings = tops.toppings;
        var data = [];
        for (var i=0; i < newToppings.length; i++){
          console.log("THEESE are toppings",newToppings[i].topping_name)
          data.push(newToppings[i].topping_name)
          data.push(' ')
        }
        $('#toppings').append(data)
        $('#clear').append('<a><h3>Clear</h3></a>')
      })
    } else {
      $('#clear').append('<h3>Try typing in a number buddy...<a>Clear</a></h3>')
    }
  })

})
