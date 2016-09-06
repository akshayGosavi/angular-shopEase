/**
 * Contains All functions related to Drawing on the CANVAS
 * */

function getCanvasContext(){
	var canvasVar = document.getElementById("canvas");
	var canvasContext = canvasVar.getContext("2d");
	
	return canvasContext;
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
	var canvasContext = getCanvasContext();
	canvasContext.font = "30px Arial";
	var radius = type === "shop" ? 8 : 5;
	
	if(type === "shop"){
		canvasContext.fillStyle = "#AC94CC";
	} else if(type === "route"){
		canvasContext.fillStyle = "#FF0000";
	} else if(type === "entry"){
		canvasContext.fillStyle = "#0A0DD0";
	}
	
	canvasContext.beginPath();
	canvasContext.arc(x, y, radius, 0, 2*Math.PI);
	canvasContext.fill();

	if(name){
		canvasContext.fillText(name, x, y);
	}	
}
 	
function drawPath(x1, y1, x2, y2, color){
	var canvasContext = getCanvasContext();
	canvasContext.strokeStyle = color;
	canvasContext.lineWidth = 5;
	canvasContext.beginPath();
	canvasContext.moveTo(x1,y1);
	canvasContext.lineTo(x2,y2);
	canvasContext.stroke();
} 


var makeCounter = function() {
	var privateCounter = 0;
	function changeBy(val) {
		privateCounter += val;
	}
	
	return {
		increment: function() {
			changeBy(1);
		},
		value: function() {
			return privateCounter;
		},
		reset: function(){
			privateCounter = 0;
		}
	}  
};

var cntr = makeCounter();

function showPaths(){
	var noOfPaths = pathsToShow.length-1;
	console.log(cntr.value());
	
	if(cntr.value() <= noOfPaths){
		showMapAndRoute(pathsToShow[cntr.value()]);
		cntr.increment();
	} else{
		cntr.reset();
		console.log("Counter resetted");
		showMapAndRoute(pathsToShow[cntr.value()]);
	}
	
}

function showRoute(pathToShow){
	var shop = pathToShow.shop;
	var path = pathToShow.path;
	var coordinate = pathToShow.shopCoordinate;
	var pathCount = path.length-1;	
	//color =  "#D41CB0";
	color = "#24781D";
	
	for(j = 0 ; j < pathCount ; j++){
		var node1 = getRouteNodeByName(path[j]);
		var node2 = getRouteNodeByName(path[j+1]);
		
		drawPath(node1.x, node1.y, node2.x, node2.y, color);
	} 
	
	var lastNode = getRouteNodeByName(path[pathCount]);
	drawPath(lastNode.x, lastNode.y, shop.coords[coordinate].x, shop.coords[coordinate].y, color);
}