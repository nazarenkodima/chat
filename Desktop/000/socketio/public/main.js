$(function() {

    var socket = io();
    var $messageForm = $('#messageForm');
    var $userForm =  $('#userForm');
    var $register =  $('#register');
    var $onlineUsers =  $('#onlineUsers');
    var $users =  $('#users');
    var $username =  $('#username');


    $messageForm.submit(function(e){
        e.preventDefault();
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    });

    $userForm.submit(function(e){
            e.preventDefault();
            socket.emit('new user', $username.val(),function(data){
            if (data) {
                $register.hide();
                $onlineUsers.show();
            }
    });
            $username.val('');
    });

    socket.on('get users', function(data){
        var html = '';
        for (i = 0; i < data.length; i++) {
            html += '<li class="list-group-item">' +data[i]+ ' </li>';
        }
        $users.html(html);
    });



    socket.on('chat message', function(data){
    $('#messages').append('<li><strong>' +data.user+ '</strong>:'+ ' ' +data.msg+ '</li>');
        });

          socket.on('news', function (data) {
           user = JSON.parse(data);
            $('.chat').append('<span class="well">' +user.name+ '</span>');

    socket.emit('my other event', { my: 'data' });
  });

         socket.on('guest', function(data){
            $('.connected').append('<p class="bg-info"><strong>'+data+'</strong></p>');
    
         });   

            



        });