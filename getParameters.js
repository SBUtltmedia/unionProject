function getParameters() {
  var dict = {};
  decodeURIComponent(window.location.search).substring(1).split("&").forEach(function(val, idx) {

      nameVal = val.split("=");
      nameVal[1]

      if (nameVal[0] == "itemsClicked") {
        dict[nameVal[0]] = JSON.parse(decodeURIComponent(nameVal[1]));
      } else dict[nameVal[0]] = nameVal[1]
    }


  );
  return dict;
}
