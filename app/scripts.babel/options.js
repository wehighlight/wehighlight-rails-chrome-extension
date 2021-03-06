'use strict';

var REGISTER_URL = 'https://www.wehighlight.com/users/sign_up';

document.addEventListener('DOMContentLoaded', function () {
  console.log('\'Allo \'Allo! Option');

  var background = chrome.extension.getBackgroundPage();

  var checkUI = function() {
    console.log('options.js checkUI');

    if (background.isLoggedIn){
      console.log('user is logged in');
      console.log( background.currentUser.username );
      $('#login').hide();
      $('#logout').show();
      $('#done').show();
      $('#email').text(background.currentUser.username);
    } else {
      console.log('user is logged out');
      $('#logout').hide();
      $('#done').hide();
      $('#login').show();
      $('#email').text('');

    }

  };

  checkUI();

  var login = function(){
    background.doLogin(
        { 'type': 'login_plain',
          'username': $('#username').val(),
          'password': $('#password').val()  },
          function(output) {
            console.log('options.js login calback');
            console.log(output);
            if (output.error && output.responseText ) {
              console.error('options.js login failure');
              $('#login-error').text(output.responseJSON.error);
            }
            checkUI();
          });
  };

  var logout = function(){
    console.log('options.js logout ');
    background.doLogout(function(){
      console.log('options.js logout callback');
      checkUI();
    });
  };

  
  $('#login-form').submit(function(event){
    console.log('login-form login');
    event.preventDefault();
    login();
  });

  $('#done-form').submit(function(event){
    console.log('login-form done');
    event.preventDefault();
    window.close();
  });

  $('#logout-form').submit(function(event){
    console.log('login-form logout');
    event.preventDefault();
    logout();
  });

  $('#register-form').submit(function(event){
    console.log('register-form logout');
    event.preventDefault();
    window.open(REGISTER_URL );
  });

});
