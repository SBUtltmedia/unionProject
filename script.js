var photo = 0;

$(function() {
    loadSpaces();
    /*
    $(window).keydown(function(evt) {
        if (evt.which == 37) {
            photo = (photo + 29) % 30;
        }
        else if (evt.which == 39){
            photo = (photo + 1) % 30;
        }
        $("#sky").attr("src", "img/" + (photo < 10 ? "0" : "") + photo + ".JPG");
    });
    */
});

function loadSpaces() {
  $.getJSON("union.json", function (data) {
      console.log(data);
      //nextRoom = data.nextRoom;
      //clickable = data.targets;
      //$("#room").css("font-size", "100px");
      //$("#roomSVG").load("img/" + data.roomImage, roomSvgLoad);
  })
}
