/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

$(document).ready(function() {
  $('.errors').hide();
 
  const createTweetElement = (data) => {
    let newHtml = ` <article class="tweet">
    <header>
      <div class="user">
        <img
          src="${escape(data.user.avatars)}"
          alt="">
      <p>${escape(data.user.name)}</p>
      </div>
      <h4>${escape(data.user.handle)}</h4>
    </header>
    <p>${escape(data.content.text)}</p>
    <footer>
    <span>${moment(data.created_at).fromNow()}</span>
      <div class="littleicon">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`;
  
    return newHtml;
  };


  $("form").on("submit",function(event) {
    event.preventDefault();
 
    if ($("#tweet-text").val().length === 0) {
      $(".errors").html('Try Writing Something First!');
      return $('.errors').hide().slideDown(400);
    } else if ($("#tweet-text").val().length > 140) {
      $(".errors").html('Try Writing Something First!');
      return $('.errors').hide().slideDown(400);
    } else {
      const data = $(this).serialize();
      console.log('data', data);
      postTweets(data);
    }
  });

  //render function to show tweets
  const renderTweet = function(tweets) {
    $("#tweet-container").empty();
    for (const tweet of tweets) {
      let $temp = createTweetElement(tweet);
      $('#tweet-container').prepend($temp);
    }
  };


  //function AJAX POST tweet
  const postTweets = function(data) {
    console.log('data 2', data);
    $.ajax('/tweets',{url: '/tweets', data: data , method: 'POST'})
      .then(() => {
        loadTweets();
        $(".errors").slideUp();
        $('#tweet-text').val('');
        $("#counter").output(140);
      })
      .catch((err) => {
        console.log("There was an ERROR ", err);
      });
  };

  //Function AJAX GET tweet
  const loadTweets = function() {
    $.ajax('/tweets', {url:'/tweets', method: 'GET', dataType: 'JSON' })
      .then((posts) => {
        // pass the data we get through renderTweet.
        renderTweet(posts);
      })
      .catch((err) => {
        console.log("There was an ERROR ", err);
      });
  };
  //function to update the tweet when submit event takes place.
  loadTweets();

});

