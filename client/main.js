$(document).ready(function () {
  if (localStorage.token) {
    afterLogin()
  } else {
    beforeLogin()
  }
  $('#myModal').show()
});

function afterLogin() {
  $("#register-form").hide()
  $("#login-form").hide()
  $("#logout").show()
  $('#front-page').hide()
  $("#card-storify").show()
  // $("#form-add").hide()
  $("#add-button").show()
  // $("#card-detail").hide()
  // $("#detail-button").hide()
  // $("#tts-button").hide()

  $('#error-add').hide()
  $('#error-login').hide()
  $('#error-register').hide()

  $('#add-error').hide()

  getStorify()
}

function beforeLogin() {
  $("#register-form").hide()
  $("#login-form").hide()
  $("#logout").hide()
  $('#front-page').show()
  $("#card-storify").hide()
  $("#form-add").hide()
  $("#add-button").hide()
  $('#navbar-storify').hide()
  // $("#card-detail").hide()
  // $("#detail-button").hide()
  // $("#tts-button").hide()

  $('#error-add').hide()
  $('#error-login').hide()
  $('#error-register').hide()
}
function frontPage(){
  $('#front-page').hide()
  $('#navbar-storify').show()
  $("#register-form").show()
}

// Google-OAuth-Part
function processLogout(event) {
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function onSignIn(googleUser) {
  var id_token = googleUser.getAuthResponse().id_token;
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/googleSignin",
    data: { id_token }
  })
    .done(todos => {
      console.log(todos.access_token, "INI ACCESS TOKEN");
      localStorage.token = todos.access_token
      afterLogin()
    })
    .fail(err => {
      console.log(err)
    })
    .always(() => {
    })
}
function getStorify() {
  $('#card-storify').empty()
  $.ajax({
    method: "GET",
    url: "http://localhost:3000/stories/",
    headers: {
      access_token: localStorage.token
    }
  })
    .done(storify => {
      storify.forEach(item => {
        $('#card-storify').append(`
            <div class="col-3">
            <div class="card bg-light mb-3" style="max-width: 18rem;" id="card-1">
                <div class="card-header bg-info" style="text-align: center;">${item.title}</div>
                <img class="card-img-top" src="https://images.squarespace-cdn.com/content/v1/58f540251b631b3aa62828eb/1556324971569-32F5KMZI22DT8D3E8FJL/ke17ZwdGBToddI8pDm48kJkYxWjv150jr8NfS0Qnt2p7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UZq1VT5hZr-XiWy5IfRHTJ06TuHQQMqQtSiuHExZMI3FI4Nk3aY-xwTofAKQHq_WPA/r1.jpg?format=2500w" alt="Card image cap">
                <div class="card-body">
                  <p class="card-text">${item.content}</p>
                  <a href="#" class="card-link btn btn-info" id="more" onclick="more(${item.id}, event)">more</a>
                </div>
              </div>
            </div>

            `)
      });
      console.log(storify);
    })
    .fail(err => {
      console.log("Error:", err)
    })
    .always(() => {
    })
}

function processLogin(event) {
  event.preventDefault();

  $.ajax({
    method: "POST",
    url: "http://localhost:3000/users/login",
    data: {
      email: $('#emailLogin').val(),
      password: $('#passwordLogin').val()
    }
  })
    .done(storify => {
      localStorage.token = storify.access_token
      afterLogin()
    })
    .fail(err => {
      $('#error-login').text(err.responseJSON.message).show()
      console.log("Error:", err)
    })
    .always(() => {
      $('#emailLogin').val('')
      $('#passwordLogin').val('')
    })
}

function processRegister(event) {
  event.preventDefault();

  $.ajax({
    method: "POST",
    url: "http://localhost:3000/users/register",
    data: {
      email: $('#emailRegister').val(),
      password: $('#passwordRegister').val()
    }
  })
    .done(storify => {
      beforeLogin()
      $('#front-page').hide()
      // $('#navbar-storify').show()
      $("#login-form").show()
      console.log('Success Register');
    })
    .fail(err => {
      $('#error-register').text(err.responseJSON.message).show()
      console.log("Error:", err)
    })
    .always(() => {
      $('#emailRegister').val('')
      $('#passwordRegister').val('')
    })
}

function add(event) {
  event.preventDefault()
  $('#card-storify').hide()
  $('#add-button').hide()
  $('#form-add').show()

  const newStorify = {
    title: $('#title').val(),
    content: $('#content').val(),
  }
  console.log(newStorify)
  $.ajax({
    method: "POST",
    url: "http://localhost:3000/stories/",
    data: {
      title: newStorify.title,
      content: newStorify.content,
    },
    headers: {
      access_token: localStorage.token
    }
  })
    .done(data => {
      console.log("success add ", data)
      afterLogin()
      $('#title').val("")
      $('#content').val("")
      $('#form-add').hide()
      $('#message-success').show()
      // $('#form-add-modal').hide()
    })
    .fail(err => {
      console.log("error", err.responseJSON)
      $('#error-add').text(err.responseJSON.message).show()
      $('#card-storify').show()
    })
    .always(() => {
      console.log("ini always")
    })

}

function logOut(event) {
  event.preventDefault()

  localStorage.clear()
  beforeLogin()
  const auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () {
    console.log('User signed out.');
  });
}

function registerProcess(event) {
  event.preventDefault()
  $("#register-form").show()
  $("#login-form").hide()
}

function loginProcess(event) {
  event.preventDefault()
  $("#register-form").hide()
  $("#login-form").show()
}

function showFromAdd(event) {
  event.preventDefault()
  $("#form-add").show()
  // $("#add-button").hide()
  $('#message-success').hide()
  $('#form-add-modal').modal('show')
}

function back(event) {
  event.preventDefault()
  afterLogin()
  $("#card-storify").show()
}

function tts(event) {
  event.preventDefault()
  // afterLogin()
  var paramsNgomong = $('#story-content').val()
  ngomongKek(paramsNgomong)
  // $("#card-storify").show()
}

function more(id, event) {
  event.preventDefault()
  // $("#card-detail").show()
  // $("#card-storify").hide()
  // $("#add-button").hide()
  // $("#detail-button").show()
  // $("#tts-button").show()
  // $('#form-add').hide()

  $.ajax({
    method: "GET",
    url: `http://localhost:3000/stories/${id}`,
    headers: {
      access_token: localStorage.token
    }
  })
    .done(storify => {
      var textReplacer = storify.content.replace(/\r?\n|\r/g, "")
      console.log(textReplacer, "ini di done");


      $('#title-detail').text('Please Scan QR to read full Story on your device')
      // $('#content-detail').text(storify.content)
      $('#img-detail').attr('src', storify.qrCode)
      $('#story-content').val(textReplacer)
      $('#storify-label').text(storify.title)
      $('#exampleModal').modal('show')
    })
    .fail(err => {
      // console.log("error", err.responseJSON)
      // $('#errorAddTodo').text(err.responseJSON.message).show()

    })
    .always(() => {
      console.log("ini always")
    })
}

// function addList (event) {
//     event.preventDefault()
//     const listStorify = $('#list-storify').val()

//     $('.hardcode-list').append('#card-1')
// }

function ngomongKek(text) {
  console.log(text, "INI DI NGOMONGKEK");
  responsiveVoice.speak(text)
}

function stopVoice(event) {
  console.log("MASUK SINI");

  responsiveVoice.cancel()
}

$("#exampleModal").on("hidden", function () {
  $('#result').html('yes,result');
});