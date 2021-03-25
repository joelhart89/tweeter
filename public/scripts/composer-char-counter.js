$(document).ready(function() {
  $("#tweet-text").on("input",function(event) {
    const $form = $(this).closest("form")
    const $counter = $form.find(".counter");
    const input = $(this).val().length;
    const charactersRemaining = 140 - input;

    $counter.text(charactersRemaining);
    if (charactersRemaining < 0) {
      $counter.addClass('red-text');
    } else {
      $counter.removeClass('red-text');
    }
  });


});

// i might need to remove listener when mouseleaves box // also need to figure out the color. Double check with a ment