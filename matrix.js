var startingRoom = "roomnames";
var sceneEl;
var markers;
var currentLocation;

$(function() {
	sceneEl = document.querySelector('a-scene');
  cursor = document.querySelector('#cursor');
	if (AFRAME.utils.device.isMobile()){
		cursor.setAttribute('visible', "true");
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
  loadLobby(startingRoom);
  var markers = document.getElementById('markers')
});

AFRAME.registerComponent('cursor-listener', {
  init: function() {
    this.el.addEventListener('click', function(evt) {
		  //this.el.removeEventListener("click");
			console.log("click")
      var marker = evt.target.id
      $.getJSON(marker + ".json", function(data) {
        var link = document.createElement('a-entity');
        var preview = new Image();
				preview.onerror = function() {link.setAttribute('image', "img/thumb/" + data.spheres[0].rightImg.replace("Right", "Mono"));};
				preview.src = "img/thumb/" + data.spheres[0].rightImg;
				link.setAttribute('link', {"href":"http://apps.tlt.stonybrook.edu/unionProject/index.html?room=" + marker,"title":marker, 'image': preview});
        link.setAttribute('id', marker + "_img");
        link.setAttribute('position', "0 0 1.8");
        document.querySelector('#'+ marker).appendChild(link);
        setTimeout(function(){ $('#'+ marker + "_img").remove(); }, 12000);
      }).fail(function(event, jqxhr, exception) {
        console.log("JSON File does not exist");
      })
    });
  }
});

function leftPad(num) {
  return ("0" + num).slice(-2)
}

function loadLobby(room) {
  console.log(room)
  $.getJSON(room + ".json", function(data) {
    $('.marker').remove();
    $('.preview').remove();
    //Since our JSON doesn't contain full objects, we'll make ones for each title marker
    rex = -20;
    rey = 0;
    //count up into proper divisions of a circle
    circle = 0;
    divs = 12;
    var vpos = true;
    data.roomNames.forEach(function(val, index, array) {
      var title = {
        text: val,
        radius: -6 + (Math.floor(Math.random() * 1) + 0.1),
        x: rex,
        y: rey,
        id: index
      }
      makeLinks(title, index);
      if (circle == divs){
        circle = -1;
        rex = rex + 5;
      }
      if (vpos){
        rex = rex + 3;
        vpos = false;
      }
      else {
        rex = rex - 3;
        vpos = true;
      }
      rey = rey + 25;
      circle ++;
  })

  function makeLinks(mkr, id) {
    var lastMarkerHolder = document.querySelector("#markerHolder" + id);
    if (lastMarkerHolder) {
      document.querySelector('#markers').removeChild(lastMarkerHolder);
    }
    var markerHolder = document.createElement('a-entity');
    markerHolder.setAttribute("id", "markerHolder" + id);
    var marker = document.createElement('a-entity');
    marker.setAttribute('text', "value: " + mkr.text + "; font: https://cdn.aframe.io/fonts/KelsonSans.fnt; width: 4; align: center;")
    marker.setAttribute('geometry', "primitive:plane; height:auto; width:auto")
    marker.setAttribute('material', "src: #board; repeat: 5 5")
    marker.setAttribute('position', {
      //IMPLEMENTED POLAR ROTATION
      x: 0,
      y: 0,
      z: mkr.radius
    });
    marker.setAttribute("cursor-listener", "")
    marker.setAttribute("id", mkr.text)
    marker.setAttribute("class", "marker")
    document.querySelector('#markers').appendChild(markerHolder)
    document.querySelector('#markerHolder' + id).appendChild(marker)
    markerHolder.setAttribute('rotation', {
      y: mkr.y,
      x: mkr.x
    });

  }


  }).fail(function(event, jqxhr, exception) {
    console.log("JSON File does not exist");
  })
}
