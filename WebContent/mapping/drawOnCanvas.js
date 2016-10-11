/**
 * Contains All functions related to Drawing on the CANVAS
 * */
var canvas = null;
var ctx = null; 

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
	ctx.font = "30px Arial";
	var radius = type === "shop" ? 8 : 5;
	
	if(type === "shop"){
		ctx.fillStyle = "#AC94CC";
	} else if(type === "route"){
		ctx.fillStyle = "#FF0000";
	} else if(type === "entry"){
		ctx.fillStyle = "#0A0DD0";
	}
	
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2*Math.PI);
	ctx.fill();

	if(name){
		ctx.fillText(name, x, y);
	}	
}
 	
function drawPath(x1, y1, x2, y2, color){
	ctx.strokeStyle = color;
	ctx.lineWidth = 5;
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
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
		globalPathObj = pathsToShow[cntr.value()];
		redraw();// showMapAndRoute
		cntr.increment();
	} else{
		cntr.reset();
		console.log("Counter resetted");
		globalPathObj = pathsToShow[cntr.value()];
		redraw();// showMapAndRoute
	}
	
}

function showRoute(){
	var shop = globalPathObj.shop;
	var path = globalPathObj.path;
	var coordinate = globalPathObj.shopCoordinate;
	var pathCount = path.length-1;	
	//color =  "#D41CB0";
	color = "#24781D";
	
	for(j = 0 ; j < pathCount ; j++){
		var node1 = getRouteNodeByName(path[j]);
		var node2 = getRouteNodeByName(path[j+1]);
		
		drawPath(node1.x, node1.y, node2.x, node2.y, color);
	} 
	
	var lastNode = getRouteNodeByName(path[pathCount]);
    showArrow(lastNode.x, lastNode.y, shop.coords[coordinate].x, shop.coords[coordinate].y);
	drawPath(lastNode.x, lastNode.y, shop.coords[coordinate].x, shop.coords[coordinate].y, color);
}

function senseDirectionOfRoute(x1,y1,x2,y2){
    var direction = null;
    if(x1 == x2){
        if(y1 <= y2){
           direction = "down";
        }else{
            direction = "up";
        }
    }else if (y1 == y2) {
        if(x1 <= x2){
            direction = "right";
        }else{
            direction = "left";
        }
    } else {
        console.log("cannot find the direction");
    }
    return direction;
}

function showArrow(x1,y1,x2,y2){
    var direction = senseDirectionOfRoute(x1,y1,x2,y2);

    var img = new Image();
    img.onload = function(){
        ctx.drawImage(img,x1,y1);
    }

    img.src = "glyphicons_free/glyphicons_free/glyphicons/png/glyphicons-arrow-" + direction +".png";
}