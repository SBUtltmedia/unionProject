var photo = 0;
var startingRoom = "lobby"

$(function() {
    loadSphere(startingRoom, 0);

});

function loadSphere(room, num) {
  $.getJSON(room + ".json", function (data) {
      //console.log(data);
      //console.log(data.spheres[0].number);
      //console.log(data.spheres[num].leftImg);
      $("#sky").attr("src", "img/" + data.spheres[num].leftImg);
      console.log(data.spheres[num].markers[0].length);

      for (var i = 0; i < data.spheres[num].markers.length; i++){
        console.log(data.spheres[num].markers[0]);
        //console.log(data.spheres[num].markers[i]);
        //var x = data.spheres[num].markers[i].x;
        //console.log(x);
        var plane =$('<a-plane src="#ground" height="3" width="3" position="0 1 -1" rotation="-90 0 0"></a-plane>')
        $("a-scene").append(plane);
      }

  })
}
