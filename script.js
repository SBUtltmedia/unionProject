var startingRoom = "vestibule_100A";
var sceneEl;
var markers;
var currentLocation;
var state;
var query = getParameters();
var isDelayed = false;
$(function() {
  $("html").on("click", function() {
    setTimeout(function() {
      isDelayed = true;


    },1000)
    var o = {}
    o.x = sceneEl.querySelector('#camera').getAttribute('rotation').x;
    o.y = sceneEl.querySelector('#camera').getAttribute('rotation').y;
    o.radius = -11;
    o.room = "";
    o.number = "";
    o.type = ""

    var cameraEl = document.querySelector('#camera');
    var cameraRot = cameraEl.getAttribute("rotation")
    var tripodEl = document.querySelector('#tripod');
    var tripodRot = tripodEl.getAttribute("rotation")
    if (cameraRot) {
      cameraRotY = cameraRot.y
    }
    console.log(tripodRot.y + cameraRotY)

    o.y = (sceneEl.querySelector('#camera').getAttribute('rotation').y) + tripodRot.y;
    console.log(JSON.stringify(o))

  })
  sceneEl = document.querySelector('a-scene');
	cursor = document.querySelector('#cursor');
	if (AFRAME.utils.device.isMobile()){
		//cursor.setAttribute('visible', "true");
		//cursor.setAttribute('cursor', "fuse: true; fuseTimeout: 600");
	}
	cursor.setAttribute('visible', "false");
	sceneEl.addEventListener('enter-vr', function () {
	 cursor.setAttribute('visible', "true");
	 cursor.setAttribute('cursor', "fuse: true; fuseTimeout: 600");
	});
	sceneEl.addEventListener('exit-vr', function () {
	 cursor.removeAttribute('cursor');
	 cursor.setAttribute('visible', "false");
	});
  cameraCache = $('#camera');
  loadstate();
  console.log(state.room )
 loadSphere(state.room ? state.room : startingRoom, 0, 0, "");
  var markers = document.getElementById('markers')






});



function leftPad(num) {
  return ("0" + num).slice(-2)
}

function loadstate() {
  if (Object.keys(query).length) {
    localStorage.clear();
    state = {};
  }
  if (localStorage.hasOwnProperty("state")) {
    state = JSON.parse(localStorage.getItem("state"));
  } else {
    state = {}
  }

  Object.keys(query).forEach(function(key) {
    state[key] = query[key]
  });
  if (!"room" in query && query.length) {
    state.room = startingRoom;
  }
  if (!"number" in query) {
    state.number = 0;
  }

}

AFRAME.registerComponent('cursor-listener', {
  init: function() {
    this.el.addEventListener('click', function(evt) {
      var marker = evt.target.id
      if (markers[marker].type == "walk") {
        var startingAngle = markers[marker].startingAngle;
    if (isDelayed){ loadSphere((markers[marker].room) != undefined ? (markers[marker].room) : currentLocation.room, markers[marker].number, startingAngle, "");
      }
        console.log(startingAngle);

      }

    });
  }
});


function loadSphere(room, sphereNum, angle, startingImage) {
  //Start polar coordinate helper in log, returns data formatted in x, y and radius
  console.log(query)
	state.room = room;
	window.history.pushState("object or string", "Title", "/unionProject/index.html?room=" + room);
  $.getJSON(room + ".json", function(data) {
    currentLocation = data.spheres[sphereNum];
    currentLocation.sphereNum = parseInt(sphereNum);
    currentLocation.room = room;
    markers = currentLocation.markers;
    $('.marker').remove();
    $('.preview').remove();
    if (! data.spheres[sphereNum].leftImg){

      data.spheres[sphereNum].leftImg= data.spheres[sphereNum].rightImg
    }
    sceneEl.querySelector('#sky1').setAttribute("src", "img/" + data.spheres[sphereNum].leftImg);
    $("#sky2").attr("src", "img/" + data.spheres[sphereNum].rightImg);
    document.querySelector('#sky1').addEventListener('materialtextureloaded', function() {


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



    })



    //var x = data.spheres[sphereNum].markers[i].x;
    //Preloader 1
    // data.spheres.forEach(function(val, index, array) {
    //   (new Image()).src = "img/" + val.leftImg;
    //   (new Image()).src = "img/" + val.rightImg;
    // });

    data.spheres[sphereNum].markers.forEach(function(val, index, array) {
      //console.log(val.room)
      //Preloader 2
      // if (val.room) {
      //   (new Image()).src = "img/" + val.room + "_" + leftPad(val.number + 1) + "_Left.JPG";
      //   (new Image()).src = "img/" + val.room + "_" + leftPad(val.number + 1) + "_Right.JPG";
      // }
      val.id = index;
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
        var marker = document.createElement('a-image');
        marker.setAttribute('src', "nextMarker.png");
        marker.setAttribute('scale', '1.8 1.8 1.8');
        marker.setAttribute('position', {
          //IMPLEMENTED POLAR ROTATION
          x: 0,
          y: 0,
          z: mkr.radius
        });
        marker.setAttribute("cursor-listener", "")
        marker.setAttribute("id", id)
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
