var photo = 0;

$(function() {
    $(window).keydown(function(evt) {
        if (evt.which == 37) {
            photo = (photo + 29) % 30;
        }
        else if (evt.which == 39){
            photo = (photo + 1) % 30;
        }
        $("#sky").attr("src", "img/" + (photo < 10 ? "0" : "") + photo + ".JPG");
    });
});
