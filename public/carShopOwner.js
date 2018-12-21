$('.carShopOwnerLogin').on('submit', () => {
  event.preventDefault();

  const login = {
    username: $('#username').val(),
    password: $('#password').val()
  }

  $.ajax({
    type: "POST",
    url: "/api/auth/login",
    data: JSON.stringify(login),
    contentType: 'application/json',
    dataType: "json",
    success: function (res) {
      console.log(res);
      sessionStorage.setItem('csoToken', res.authToken);
      sessionStorage.setItem('currUserId', res.currUserId);
    }
  });
});

$('.cSORegSec').on('submit', () => {
  event.preventDefault();

  const signUp = {
    firstName: $('#firstName').val(),
    lastName: $('#lastName').val(),
    username: $('#username').val(),
    password: $('#password').val()
  }

  $.ajax({
    type: "POST",
    url: "/api/carshopowner",
    data: JSON.stringify(signUp),
    contentType: 'application/json',
    dataType: "json",
    success: function (response) {
      console.log(response);
      
    }
  });
});