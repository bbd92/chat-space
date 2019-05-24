$(function(){
  function appendUsers(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    return html
  };
  function appendNoUser(){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">一致するユーザーが見つかりません</p>
                </div>`
    return html
  };

  function emptyList(){$('#user-search-result').empty();}

  $('#user-search-field').on('keyup', function(){
    var input = $(this).val();

    if(input == ""){
      emptyList()
      return false
    }

    $.ajax({
      type: "GET",
      url: '/users',
      data: { word: input },
      dataType: 'json',
    })

    .done(function(users){
      emptyList()
      if (users.length > 0){
        users.forEach(function(user){
          $('#user-search-result').append(appendUsers(user))
        }
      )} else {
        $('#user-search-result').append(appendNoUser())
      }
    })

    .fail(function(){
      alert('検索に失敗しました')
    })
  })
});