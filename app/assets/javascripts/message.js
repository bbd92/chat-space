$(function(){
  function buildHAML(message){
    var haml = `.messages__boxes__box
    .messages__boxes__box__message
      %span.messages__boxes__box__message__name= message.user.name
      %span.messages__boxes__box__message__time= message.created_at.strftime("%Y/%m/%d %H:%M")
      - if message.text.present?
        .messages__boxes__box__message__text
          = message.text
      = image_tag message.image.url, class: 'messages__boxes__box__message__image' if message.image.present?`
    return haml
  };

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      type: "POST",
      url: url,
      data: formData,
      datatype: 'json',
      processData: false,
      contentType: false
    })

    .done(function(message){
      var haml = buildHAML(message);
      $(".messages__boxes").append(haml);
      $(".message-form__input").val("");
    })

    .fail(function(){
      alert('error');
    });
    
    $(".messages__boxes").animate({scrollBottom:0});
    return false;
  });
});