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
      //console.log(data.spheres[num].markers.length);

      for (var i = 0; i < data.spheres[num].markers.length; i++){
        //console.log(data.spheres[num].markers[0]);
        //console.log(data.spheres[num].markers[i]);
        //var x = data.spheres[num].markers[i].x;
        //console.log(x);
        makeMarker(data.spheres[num].markers[i]);
      }

      function makeMarker(mkr)
      {

        var rotation=Math.atan2(mkr.x,mkr.z) * (180 / Math.PI)+180;
console.log(rotation)

        var marker= document.createElement('a-image');
        marker.setAttribute('position', {
          x: mkr.x,
          y: mkr.y,
          z: mkr.z
        });
        marker.setAttribute('rotation', {
          x: -90,
          y:rotation
        });
        marker.setAttribute('src',  "nextMarker.png")
        marker.setAttribute('transparent',  "true")
        $("a-scene").prepend(marker)
      }

  })
}
