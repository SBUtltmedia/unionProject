var startingRoom = "Lobby_100"

$(function() {
    loadSphere(startingRoom, 0);

});

function leftPad(num){
    return ("0"+num).slice(-2)
}

function loadSphere(room, num) {
  $.getJSON(room + ".json", function (data) {

    $('.marker').remove();
    $('.preview').remove();
      $("#sky1").attr("src", "img/" + data.spheres[num].leftImg);
      $("#sky2").attr("src", "img/" + data.spheres[num].rightImg);

    data.spheres.forEach(function(val,index,array){
    (new Image()).src ="img/"+val.leftImg;
    (new Image()).src ="img/"+val.rightImg
    });

    data.spheres[num].markers.forEach(function(val,index,array){
    if(val.room){
        (new Image()).src ="img/"+val.room+"_"+leftPad(val.number+1)+"_Left.JPG";
        (new Image()).src ="img/"+val.room+"_"+leftPad(val.number+1)+"_Right.JPG"
    }
        makeMarker(val,index);
});


   $(".marker").on("click",function(evt)
{


    if ($(evt.target).data("room")==""){
        loadSphere(room, $(evt.target).data( "num" ));
    }
    else {
        loadSphere($(evt.target).data( "room" ), $(evt.target).data( "num" ));
    }

}

 );

      function makeMarker(mkr,id)
      {
        var spin=Math.atan2(mkr.x,mkr.z) * (180 / Math.PI)+180;
        var marker= document.createElement('a-image');
        marker.setAttribute('position', {
          x: mkr.x,
          y: mkr.y,
          z: mkr.z
        });
        marker.setAttribute('rotation', {
          x: -90,
          y:spin
        });
        marker.setAttribute('src',  "nextMarker.png")
        marker.setAttribute("cursor-listener")
        marker.setAttribute("id","marker"+id)
        marker.setAttribute('data-num',mkr.number);
        marker.setAttribute('data-room',mkr.room||"");
        marker.setAttribute("class","marker")
        $("a-scene").prepend(marker)
      }

  }).fail(function(event, jqxhr, exception) {
      //Break case when JSON DNE, used for the shown fork on Github.io
      var preview= document.createElement('a-image');
      preview.setAttribute('position', {
        x: -0.84,
        y: 1.51,
        z: -0.68
      });
      preview.setAttribute('rotation', {
        x: 0,
        y: 59.01
      });
      preview.setAttribute('src',  "Union404.png")
      preview.setAttribute("class","preview")
      $("a-scene").prepend(preview)
})
}
