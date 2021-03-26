$(document).ready(function() {
  $("#tweet-text").on("input",function(event) {
    const $form = $(this).closest("form");
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
