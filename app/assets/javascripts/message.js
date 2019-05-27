$(document).on('turbolinks:load', function(){
  function buildHTML(message){
    message.image.url ?
      image = `<img src='${message.image.url}' class='messages__boxes__box__message__image'>` : image = ""
    var html = `<div class="messages__boxes__box" data-message-id="${message.id}">
                  <div class="messages__boxes__box__message">
                    <span class="messages__boxes__box__message__name">${message.user_name}
                    </span>
                    <span class="messages__boxes__box__message__time">${message.date}
                    </span>
                    <div class="messages__boxes__box__message__text">${message.text}
                    </div>
                    ${image}
                  </div>
                </div>`
    return html
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var html = buildHTML(message);
      $(".messages__boxes").append(html);
      $('form')[0].reset();
    })

    .fail(function(){
      alert('error');
    });
    
    $(".messages__boxes").animate({scrollTop:$('.messages__boxes')[0].scrollHeight}, "fast");

    function ableButtom(){
      $('.form__submit').attr('disabled', false)
    };

    setTimeout(function(){
      ableButtom()},1000
    );
  });

  var reloadMessages = function() {
    var last_message_id = $(".messages__boxes__box").last().data("message-id")

    if (location.pathname.match(/\/groups\/\d+\/messages/)){
      $.ajax({
        url: location.pathname.replace(/messages/, "api/messages"),
        type: 'GET',
        dataType: 'json',
        data: {id: last_message_id}
      })
      
      .done(function(messages) {
        messages.forEach(function(message){
          var insertHTML = '';
          var insertHTML = buildHTML(message)
          $(".messages__boxes").append(insertHTML);
          $(".messages__boxes").animate({scrollTop:$('.messages__boxes')[0].scrollHeight}, "fast");
        })
      })

      .fail(function() {
        alert('error');
      });
    };
  }

  setInterval(reloadMessages, 5000);
});