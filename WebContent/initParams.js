function loadJSON(callback, file) {   
    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', file, true); 
        xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 }

function initShopNodes() {
	loadJSON(function(response) {
		var actual_JSON = JSON.parse(response);
		return actual_JSON;
		//displayShopsOnMap(actual_JSON);
	},"shops.json");
}

function initRouteNodes() {
	loadJSON(function(response) {
		var actual_JSON = JSON.parse(response);
		//displayNodesOnMap(actual_JSON, "route");
		return actual_JSON;
	},"nodes.json");
}

function initEntryNodes() {
	loadJSON(function(response) {
		var actual_JSON = JSON.parse(response);
		return actual_JSON;
		//displayNodesOnMap(actual_JSON, "entry");
	},"entry.json");
}

function displayNodesOnMap(nodes, type){
	$.each(nodes, function(i, obj){
		showPointOnMap(obj.x, obj.y, type, obj.name);
	});
}

function displayShopsOnMap(shops){
	$.each(shops, function(i, obj){
		showPointOnMap(obj.coords[0].x, obj.coords[0].y, "shop");
		if(obj.multiCoords){
			showPointOnMap(obj.coords[1].x, obj.coords[1].y, "shop");
		}
	});
}

function showPointOnMap(x, y, type, name){
	var canvasVar = document.getElementById("canvas");
	var canvasContext = canvasVar.getContext("2d");
	
	canvasContext.font = "30px Arial";
		
	if(type === "shop"){
		canvasContext.fillStyle = "#AC94CC";
	} else if(type === "route"){
		canvasContext.fillStyle = "#FF0000";
	} else if(type === "entry"){
		canvasContext.fillStyle = "#0A0DD0";
	}
	var radius = type === "shop" ? 8 : 5;
	
	canvasContext.beginPath();
	canvasContext.arc(x, y, radius, 0, 2*Math.PI);
	canvasContext.fill();
	if(name){
		canvasContext.fillText(name, x, y);
	}	
} // END : showPointOnMap