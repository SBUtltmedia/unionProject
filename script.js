var startingRoom = "Lobby_100";
var sceneEl;
var markers;
var currentLocation;

$(function() {
  $("html").on("click", function() {


    var o = {}
    o.x = sceneEl.querySelector('#camera').getAttribute('rotation').x;
    o.y = sceneEl.querySelector('#camera').getAttribute('rotation').y;
    o.radius = -11;
    o.room= "";
    o.number= "";
    o.type=""
 console.log(JSON.stringify(o))

  })
  sceneEl = document.querySelector('a-scene');
  cameraCache = $('#camera');
  loadSphere(startingRoom, 0, 0,"");
  var markers = document.getElementById('markers')
});

AFRAME.registerComponent('cursor-listener', {
  init: function() {
    this.el.addEventListener('click', function(evt) {
      var marker = evt.target.id
      if (markers[marker].type == "walk") {
        var startingAngle = markers[marker].startingAngle;
        loadSphere((markers[marker].room) != undefined ? (markers[marker].room) : currentLocation.room , markers[marker].number, startingAngle, "");
        console.log(startingAngle);

      }

    });
  }
});

function leftPad(num) {
  return ("0" + num).slice(-2)
}

function loadSphere(room, sphereNum, angle, startingImage) {
  //Start polar coordinate helper in log, returns data formatted in x, y and radius
  var cameraRotY = 0
  var cameraEl = document.querySelector('#camera');
  var cameraRot = cameraEl.getAttribute("rotation")
  if (cameraRot) {
    cameraRotY = cameraRot.y
  }
  console.log(cameraRotY, angle, angle - cameraRotY)
  if (!angle) {
    sceneEl.querySelector('#tripod').setAttribute('rotation', {
      x: 0,
      y: 0,
      z: 0
    });
  } else {

    sceneEl.querySelector('#tripod').setAttribute('rotation', {
      x: 0,
      y: angle - cameraRotY,
      z: 0
    });
  }

  $.getJSON(room + ".json", function(data) {
    currentLocation = data.spheres[sphereNum];
    currentLocation.sphereNum=parseInt(sphereNum);
     currentLocation.room = room;
     markers=currentLocation.markers;
      $('.marker').remove();
      $('.preview').remove();
      $("#sky1").attr("src", "img/" + data.spheres[sphereNum].leftImg);
      $("#sky2").attr("src", "img/" + data.spheres[sphereNum].rightImg);
      //var x = data.spheres[sphereNum].markers[i].x;

      data.spheres.forEach(function(val, index, array) {
        (new Image()).src = "img/" + val.leftImg;
        (new Image()).src = "img/" + val.rightImg;
      });

      data.spheres[sphereNum].markers.forEach(function(val, index, array) {
        //console.log(val.room)
        if (val.room) {
          (new Image()).src = "img/" + val.room + "_" + leftPad(val.number + 1) + "_Left.JPG";
          (new Image()).src = "img/" + val.room + "_" + leftPad(val.number + 1) + "_Right.JPG";
        }
        val.id=index;
        makeMarker(val, index);
      })


    function makeMarker(mkr, id) {
      //If type is WALK, propagate with floor marker
      if (mkr.type == "walk") {

        var lastMarkerHolder = document.querySelector("#markerHolder" + id);
        if (lastMarkerHolder) {
          document.querySelector('#markers').removeChild(lastMarkerHolder);
        }
        var markerHolder = document.createElement('a-entity');
        markerHolder.setAttribute("id", "markerHolder" + id)
        //  var spin = Math.atan2(mkr.x, mkr.z) * (180 / Math.PI) + 180;
        var marker = document.createElement('a-sphere');
        marker.setAttribute('color', "#be68e8");
        marker.setAttribute('radius', ".2");
        marker.setAttribute('opacity', ".7");
        marker.setAttribute('position', {
          //IMPLEMENT POLAR ROTATION, x: 0, y: 0, z: mkr.radius
          x: 0,
  	      y: 0,
  	      z: mkr.radius
        });
        marker.setAttribute("cursor-listener", "")
        marker.setAttribute("id",  id)
        marker.setAttribute("class", "marker")
        document.querySelector('#markers').appendChild(markerHolder)
        document.querySelector('#markerHolder' + id).appendChild(marker)
        markerHolder.setAttribute('rotation', {
          y: mkr.y,
          x: mkr.x
        });

      }
    }

  }).fail(function(event, jqxhr, exception) {
  console.log("JSON File does not exist");
})
}
