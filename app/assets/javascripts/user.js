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

  function appendMember(userName, userId){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${userId}'>
                  <input name='group[user_ids][]' type='hidden' value='${userId}'>
                  <p class='chat-group-user__name'>${userName}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn', data-user-id="${userId}">削除</div>
                </div>`
    return html
  };

  function removeMember(userId){
    $('#chat-group-user-' + userId).remove()
  }

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
      alert('ユーザー検索に失敗しました')
    })
  })

  $('#user-search-result').on("click", '.user-search-add', function () {
    var userName = $(this).data('user-name')
    var userId = $(this).data('user-id')
    emptyList()
    $('#user-search-field').val("");
    $('#chat-group-users').append(appendMember(userName, userId))
  });

  $('#chat-group-users').on("click", '.user-search-remove', function(){
    var userId = $(this).data('user-id')
    removeMember(userId)
  })
});