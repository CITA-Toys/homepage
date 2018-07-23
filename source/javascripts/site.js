// This is where it all goes :)

document.addEventListener("DOMContentLoaded", function() {
  var btns = document.getElementsByClassName('n-dropdown-toggle');
  var className = "n-open";

  for(var i = 0; i < btns.length; i++) {


    (function(index) {
      var currentBtn = btns[index];
      var currentList = currentBtn.parentElement.getElementsByClassName('n-dropdown-list')[0];
      var classList = currentList.classList;
      currentBtn.addEventListener("click", function() {
        if(classList.contains(className)) {
          // remove
          classList.remove(className);
        } else {
          // add
          classList.add(className);
        }
      })
    })(i);
  }

  // email form
  $(".submit-button").click(function (e) {
    e.preventDefault();
    var submitButton = $(".submit-button");
    var originSubmit = submitButton.val();
    var wait = submitButton.data("wait");
    submitButton.val(wait);
    $.ajax({
      url: 'https://nervos.us18.list-manage.com/subscribe/post-json?u=2ca40f7277e9b778c24f9aaaf&amp;id=afeeb0c7e3&c=?',
      type: 'GET',
      cache: false,
      data: {
        u: "2ca40f7277e9b778c24f9aaaf",
        id: "afeeb0c7e3",
        MERGE0: $(".email-field").val()
      },
      dataType: 'json',
      contentType: "application/json; charset=utf-8",
      processData: false,
    }).done((res) => {
      submitButton.val(originSubmit);
      if (res.result === "error") {
        handleError()
      } else {
        handleSuccess()
      }
    }).fail((res) => {
      submitButton.val(originSubmit);
      handleError()
    });
  });

  $(".form-fail").click(function (e) {
    $(".form-fail").css({display: "none"});
    $(".form").css({display: "block"});
  });
  
  function handleSuccess() {
    $(".form").css({display: "none"});
    $(".form-done").css({display: "block"});
  }
  
  function handleError() {
    $(".form").css({display: "none"});
    $(".form-fail").css({display: "block"});
  }


  var bindFadeinup = function (e) {
    var max = window.innerHeight
    var min = 0
    var cls = e.className
    e.className = 'fadeinupBefore animation ' + cls

    var func = function () {
      var position = e.getBoundingClientRect()
      var top = position.top
      var bottom = position.bottom
      if (top < max && bottom > min) {
        console.log("func")
        e.className = 'fadeinup animation ' + cls
        window.removeEventListener("scroll", func)
      }
    }
    window.addEventListener("scroll", func)
  }


  $('.investor').each(function (i) {
    bindFadeinup(this);
  });

  $(".img-team").each(function (i) {
    bindFadeinup(this)
  })

});

