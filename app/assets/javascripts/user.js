$(function(){
  $('#user-search-field').on('keyup', function(){
    var input = $(this).val()
    
    $.ajax({
      type: "GET",
      url: '/users',
      data: { word: input },
      dataType: 'json',
    })

    .done(function(users){
      console.log(users)
    })

    .false(function(){
      console.log("false")
    })
  })
});