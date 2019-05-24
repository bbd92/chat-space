$(function(){
  function buildHTML(message){
    message.image.url ?
      image = `<img src='${message.image.url}' class='messages__boxes__box__message__image'>` : image = ""
    var html = `<div class="messages__boxes__box">
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
});