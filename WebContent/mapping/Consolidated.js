var canvas = null;
var ctx = null; 

var mapimg = new Image;

var globalPathObj = null;

var pathsToShow = [];

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

function getNodes(){
	var nodes = initRouteNodes();
	return nodes;
}

function getShops(){
	var shops = initShopNodes();
	return shops;
}

function getEntries(){
	var entries = initEntryNodes();
	return entries;
}

function getShoppingList(){
	var shoppingList = ['A','K','S','H','Y'];
	return shoppingList;
}

function getShopNodeByName(name){
	var shops = getShops();
	var shop = null;
	$.each(shops, function(i, obj){
		if(name === obj.name){
			shop = obj;
			return false;
		}
	});
	
	return shop;
}

function getRouteNodeByName(name){
	var nodes = getNodes();
	var node = null;
	$.each(nodes, function(i, obj){
		if(name === obj.name){
			node = obj;
			return false;
		}
	});
	
	return node;
}

function getDistanceBetweenTwoPoints(nodeA, nodeB){
	var dx = nodeA.x - nodeB.x;
	var dy = nodeA.y - nodeB.y;
	return Math.sqrt((dx*dx) + (dy*dy));
}

function getDistanceObjNodeToNode(nodeA, nodeB, type){
	var dist = {
		node : (type === "preset") ? -1 : nodeA,
		dist : (type === "preset") ? 999999 : getDistanceBetweenTwoPoints(nodeA, nodeB)
	};
	
	return dist;
}

function getDistaceObjNodeToShop(node, shop){
	if(node != null){
		if(shop.multiCoords){
 			var dist0 = getDistanceBetweenTwoPoints(node, shop.coords[0]);
 			var dist1 = getDistanceBetweenTwoPoints(node, shop.coords[1]);
 			if(dist0 <= dist1){
 				var dist = {
 		 	 			coord : 0,
 		 	 			dist : dist0
 		 	 		};
 			} else {
 				var dist = {
 		 	 			coord : 1,
 		 	 			dist : dist1
 		 	 		};
 			}
 		} else {
 			var dist = {
 	 	 			coord : 0,
 	 	 			dist : getDistanceBetweenTwoPoints(node, shop.coords[0])
 	 	 		};
 		}
	} else {
		var dist = {
 	 			coord : -1,
 	 			dist : 999999
 	 		};
	}

	return dist;
}

function sortAndReturnSmallest(arr){
	var idOfSmallest = 0;
	var smallest = arr[0].dist;
	$.each(arr, function(i, node){
		if(smallest > node.dist){
			smallest = node.dist;
			idOfSmallest = i;
		}
	});
	
	return arr[idOfSmallest];
}
	
function areTwoNodesConnected(NodeToCheck ,NodeFrom){
	var isConnected = false;
	var nodelist = NodeFrom.next;
	$.each(nodelist, function(i, obj){
		if(NodeToCheck.name === obj){
			isConnected = true;
			return false;
		}
	});
	
	return isConnected;
}

function getCommonNodes(listA, listB){
	var common = [];
	for(i = 0 ; i < listB.length ; i++){
		for(j = 0 ; j < listA.length ; j++){
			if(listB[i] === listA[j]){
				common.push(listA[j]);
			}
		}
	}
	
	return common;
}

function getCommonNodesElseNull(nodeA, nodeB){
	var nodelistA = nodeA.next;
	var nodelistB = nodeB.next;
	var lenA = nodelistA.length;
	var lenB = nodelistB.length;
	var commonNodeList = null;
	if(lenA >= lenB){
		commonNodeList = getCommonNodes(nodelistA, nodelistB);
	} else {
		commonNodeList = getCommonNodes(nodelistB, nodelistA);
	}
	
	if(commonNodeList.length != 0){
		return commonNodeList;
	} else{
		return null;
	}
}

function chooseNextNode(commonNodes){
	var distanceArr = [];
	$.each(commonNodes, function(i, obj){
		distanceArr.push(getDistanceObj(getRouteNodeByName(obj), firstNodeFromShop, null));
	});
	
	return sortAndReturnSmallest(distanceArr);
}

function prepareRoute(){
	var shoppingList = getShoppingList();
	var nodes = getNodes();
	var shops = getShops();
	var entries = getEntries();
	
	var shopToVisit = null;
 	var shopCoordChosen = null;
 	var firstNodeFromShop = null;
 	var currentRouteNode = null;
 	
 	var movement = [];	
 	
 	function getNodeCloseToShop(fromNode){
 		var nodeList = fromNode.next;
 		if(nodeList.length == 1){
 			return nodeList[0];
 		} else {
 			var cnt = nodeList.length;
 			var distanceArr = [];
 			switch (cnt) {
			case 2:
				distanceArr.push(getDistaceObjNodeToShop(getRouteNodeByName(nodeList[0]), shopToVisit));
				distanceArr.push(getDistaceObjNodeToShop(getRouteNodeByName(nodeList[1]), shopToVisit));
				distanceArr.push(getDistaceObjNodeToShop(null, shopToVisit));
				distanceArr.push(getDistaceObjNodeToShop(null, shopToVisit));
				break;
			case 3:
				distanceArr.push(getDistaceObjNodeToShop(getRouteNodeByName(nodeList[0]), shopToVisit));
				distanceArr.push(getDistaceObjNodeToShop(getRouteNodeByName(nodeList[1]), shopToVisit));
				distanceArr.push(getDistaceObjNodeToShop(getRouteNodeByName(nodeList[2]), shopToVisit));
				distanceArr.push(getDistaceObjNodeToShop(null, shopToVisit));
				break;
			case 4:
				distanceArr.push(getDistaceObjNodeToShop(getRouteNodeByName(nodeList[0]), shopToVisit));
				distanceArr.push(getDistaceObjNodeToShop(getRouteNodeByName(nodeList[1]), shopToVisit));
				distanceArr.push(getDistaceObjNodeToShop(getRouteNodeByName(nodeList[2]), shopToVisit));
				distanceArr.push(getDistaceObjNodeToShop(getRouteNodeByName(nodeList[3]), shopToVisit));
				break;
			}
 			
 			shopCoordChosen = sortAndReturnSmallest(distanceArr).coord;
 			return  getRouteNodeByName(shopToVisit.coords[shopCoordChosen].node);
 		}
 	}
 	
 	function getNodeCloseToSpecificNode(fromNode, ToNode){
 		var nodeList = fromNode.next;
 		if(nodeList.length == 1){
 			return nodeList[0];
 		} else {
 			var cnt = nodeList.length;
 			var distanceArr = [];
 			switch (cnt) {
			case 2:
				distanceArr.push(getDistanceObjNodeToNode(getRouteNodeByName(nodeList[0]), ToNode, null));
				distanceArr.push(getDistanceObjNodeToNode(getRouteNodeByName(nodeList[1]), ToNode, null));
				distanceArr.push(getDistanceObjNodeToNode(null, ToNode, "preset"));
				distanceArr.push(getDistanceObjNodeToNode(null, ToNode, "preset"));
				break;
			case 3:
				distanceArr.push(getDistanceObjNodeToNode(getRouteNodeByName(nodeList[0]), ToNode, null));
				distanceArr.push(getDistanceObjNodeToNode(getRouteNodeByName(nodeList[1]), ToNode, null));
				distanceArr.push(getDistanceObjNodeToNode(getRouteNodeByName(nodeList[2]), ToNode, null));
				distanceArr.push(getDistanceObjNodeToNode(null, ToNode, "preset"));
				break;
			case 4:
				distanceArr.push(getDistanceObjNodeToNode(getRouteNodeByName(nodeList[0]), ToNode, null));
				distanceArr.push(getDistanceObjNodeToNode(getRouteNodeByName(nodeList[1]), ToNode, null));
				distanceArr.push(getDistanceObjNodeToNode(getRouteNodeByName(nodeList[2]), ToNode, null));
				distanceArr.push(getDistanceObjNodeToNode(getRouteNodeByName(nodeList[3]), ToNode, null));
				break;
			}
 			
 			return sortAndReturnSmallest(distanceArr).node;
 		}
 	}
 	
 	function finalizeRoute(){
 		var move = [];
 		$.each(movement, function(i, obj){
 			move.push(obj.name);
 		});
 		movement = [];
 		move.push(firstNodeFromShop.name);
 		pathsToShow.push({shop: shopToVisit, shopCoordinate: shopCoordChosen, path: move});
 	}
 	
 	function route(node){
 		if(areTwoNodesConnected(firstNodeFromShop, node)){
 			movement.push(node);
 			finalizeRoute();
 		} else {
 			movement.push(node);
 			var nextNode = null;
 			var commonNodes = getCommonNodesElseNull(firstNodeFromShop, node);
 			
 			if( commonNodes != null){
 				if(commonNodes.length > 1){
 					nextNode = chooseNextNode(commonNodes); // need to verify the implementation
 				} else {
 					nextNode = getRouteNodeByName(commonNodes[0]);
 				}
 			} else {
 				nextNode = getNodeCloseToSpecificNode(node, firstNodeFromShop); 
 			}
 			route(nextNode);
 		}
 	}
 	
 	function theFirstStep(){
 		if( nodes != null && shops != null){
 			var cnt = 0;
 			shopToVisit = getShopNodeByName(shoppingList[cnt]);
 			firstNodeFromShop = getRouteNodeByName(38); // hand coding start node for time being
 	 		do{
 	 			currentRouteNode = firstNodeFromShop;
 	 			shopToVisit = getShopNodeByName(shoppingList[cnt++]);
 	 			firstNodeFromShop = getNodeCloseToShop(currentRouteNode);
 	 			if(currentRouteNode === firstNodeFromShop){
 	 				finalizeRoute();
 	 			} else{
 	 				route(currentRouteNode);
 	 			}	 			 	 			
 	 		}while( cnt < shoppingList.length);
 	 		console.log("Done Preparation.")
 	 		console.log(pathsToShow);
 		} else {
 			console.log("nodes not populated");
 		}
 	}
 	
 	theFirstStep();
}



$(function(){
	canvas = document.getElementById("canvas");
	ctx = canvas.getContext("2d");
	
	var container = document.getElementById("canvasContainer");
	canvas.width = $(container).width();
    canvas.height = $(container).height();
	
	// in future will make function to load map according to some param	
	mapimg.src = 'maps/MallMap1.jpg';
	mapimg.onload = function(){
		$(".back-to-top").css( "display","block"); 
	}
	prepareRoute();
	trackTransforms(ctx);
	//redraw();
	
	// attach
	var lastX=canvas.width/2, lastY=canvas.height/2;
	var dragStart,dragged;
	canvas.addEventListener('mousedown',function(evt){
		document.body.style.mozUserSelect = document.body.style.webkitUserSelect = document.body.style.userSelect = 'none';
		lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
		lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
		dragStart = ctx.transformedPoint(lastX,lastY);
		dragged = false;
	},false);
	canvas.addEventListener('mousemove',function(evt){
		lastX = evt.offsetX || (evt.pageX - canvas.offsetLeft);
		lastY = evt.offsetY || (evt.pageY - canvas.offsetTop);
		dragged = true;
		if (dragStart){
			var pt = ctx.transformedPoint(lastX,lastY);
			ctx.translate(pt.x-dragStart.x,pt.y-dragStart.y);
			redraw();
		}
	},false);
	canvas.addEventListener('mouseup',function(evt){
		dragStart = null;
		if (!dragged) zoom(evt.shiftKey ? -1 : 1 );
	},false);

	var scaleFactor = 1.1;
	var zoom = function(clicks){
		var pt = ctx.transformedPoint(lastX,lastY);
		ctx.translate(pt.x,pt.y);
		var factor = Math.pow(scaleFactor,clicks);
		ctx.scale(factor,factor);
		ctx.translate(-pt.x,-pt.y);
		redraw();
	}

	var handleScroll = function(evt){
		var delta = evt.wheelDelta ? evt.wheelDelta/40 : evt.detail ? -evt.detail : 0;
		if (delta) zoom(delta);
		return evt.preventDefault() && false;
	};
	canvas.addEventListener('DOMMouseScroll',handleScroll,false);
	canvas.addEventListener('mousewheel',handleScroll,false);
});

function redraw(){
	// Clear the entire canvas
	var p1 = ctx.transformedPoint(0,0);
	var p2 = ctx.transformedPoint(canvas.width,canvas.height);
	ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);

	ctx.drawImage(mapimg,0,0);
	showRoute();
}

// Adds ctx.getTransform() - returns an SVGMatrix
// Adds ctx.transformedPoint(x,y) - returns an SVGPoint
function trackTransforms(ctx){
	var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
	var xform = svg.createSVGMatrix();
	ctx.getTransform = function(){ return xform; };
	
	var savedTransforms = [];
	var save = ctx.save;
	ctx.save = function(){
		savedTransforms.push(xform.translate(0,0));
		return save.call(ctx);
	};
	var restore = ctx.restore;
	ctx.restore = function(){
		xform = savedTransforms.pop();
		return restore.call(ctx);
	};

	var scale = ctx.scale;
	ctx.scale = function(sx,sy){
		xform = xform.scaleNonUniform(sx,sy);
		return scale.call(ctx,sx,sy);
	};
	var rotate = ctx.rotate;
	ctx.rotate = function(radians){
		xform = xform.rotate(radians*180/Math.PI);
		return rotate.call(ctx,radians);
	};
	var translate = ctx.translate;
	ctx.translate = function(dx,dy){
		xform = xform.translate(dx,dy);
		return translate.call(ctx,dx,dy);
	};
	var transform = ctx.transform;
	ctx.transform = function(a,b,c,d,e,f){
		var m2 = svg.createSVGMatrix();
		m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
		xform = xform.multiply(m2);
		return transform.call(ctx,a,b,c,d,e,f);
	};
	var setTransform = ctx.setTransform;
	ctx.setTransform = function(a,b,c,d,e,f){
		xform.a = a;
		xform.b = b;
		xform.c = c;
		xform.d = d;
		xform.e = e;
		xform.f = f;
		return setTransform.call(ctx,a,b,c,d,e,f);
	};
	var pt  = svg.createSVGPoint();
	ctx.transformedPoint = function(x,y){
		pt.x=x; pt.y=y;
		return pt.matrixTransform(xform.inverse());
	}
}
	
	
/**
 * Contains Functions to initialize various node lists 
 * for time being hard coded the Json to variables 
 * but ideally it should load from json file other wise angular controller should populate that 
 * */

function initShopNodes() {
	var shops = [
	             {
	            	   "name": "A",
	            	   "multiCoords": false,
	            	   "coords": [
	            	      {
	            	         "x": 81,  
	            	         "y": 407, 
	            	         "node": 1
	            	      },
	            	      {
	            	         "x": 0,
	            	         "y": 0,
	            	         "node": 0
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "B",
	            	   "multiCoords": false,
	            	   "coords": [
	            	      {
	            	         "x": 211,
	            	         "y": 407,
	            	         "node": 2
	            	      },
	            	      {
	            	         "x": 0,
	            	         "y": 0,
	            	         "node": 0
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "C",
	            	   "multiCoords": true,
	            	   "coords": [
	            	      {
	            	         "x": 388,
	            	         "y": 407,
	            	         "node": 3
	            	      },
	            	      {
	            	         "x": 454,
	            	         "y": 285,
	            	         "node": 4
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "D",
	            	   "multiCoords": false,
	            	   "coords": [
	            	      {
	            	         "x": 504,
	            	         "y": 192,
	            	         "node": 5
	            	      },
	            	      {
	            	         "x": 0,
	            	         "y": 0,
	            	         "node": 0
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "E",
	            	   "multiCoords": false,
	            	   "coords": [
	            	      {
	            	         "x": 620,
	            	         "y": 192,
	            	         "node": 6
	            	      },
	            	      {
	            	         "x": 0,
	            	         "y": 0,
	            	         "node": 0
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "F",
	            	   "multiCoords": false,
	            	   "coords": [
	            	      {
	            	         "x": 751,
	            	         "y": 192,
	            	         "node": 7
	            	      },
	            	      {
	            	         "x": 0,
	            	         "y": 0,
	            	         "node": 0
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "G",
	            	   "multiCoords": true,
	            	   "coords": [
	            	      {
	            	         "x": 522,
	            	         "y": 359,
	            	         "node": 8
	            	      },
	            	      {
	            	         "x": 840,
	            	         "y": 360,
	            	         "node": 9
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "H",
	            	   "multiCoords": true,
	            	   "coords": [
	            	      {
	            	         "x": 522,
	            	         "y": 462,
	            	         "node": 10
	            	      },
	            	      {
	            	         "x": 522,
	            	         "y": 628,
	            	         "node": 11
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "I",
	            	   "multiCoords": false,
	            	   "coords": [
	            	      {
	            	         "x": 840,
	            	         "y": 616,
	            	         "node": 12
	            	      },
	            	      {
	            	         "x": 0,
	            	         "y": 0,
	            	         "node": 0
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "J",
	            	   "multiCoords": false,
	            	   "coords": [
	            	      {
	            	         "x": 840,
	            	         "y": 512,
	            	         "node": 13
	            	      },
	            	      {
	            	         "x": 0,
	            	         "y": 0,
	            	         "node": 0
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "K",
	            	   "multiCoords": false,
	            	   "coords": [
	            	      {
	            	         "x": 522,
	            	         "y": 731,
	            	         "node": 14
	            	      },
	            	      {
	            	         "x": 0,
	            	         "y": 0,
	            	         "node": 0
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "L",
	            	   "multiCoords": false,
	            	   "coords": [
	            	      {
	            	         "x": 596,
	            	         "y": 866,
	            	         "node": 15
	            	      },
	            	      {
	            	         "x": 0,
	            	         "y": 0,
	            	         "node": 0
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "M",
	            	   "multiCoords": true,
	            	   "coords": [
	            	      {
	            	         "x": 781,
	            	         "y": 866,
	            	         "node": 16
	            	      },
	            	      {
	            	         "x": 840,
	            	         "y": 730,
	            	         "node": 17
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "N",
	            	   "multiCoords": false,
	            	   "coords": [
	            	      {
	            	         "x": 269,
	            	         "y": 716,
	            	         "node": 18
	            	      },
	            	      {
	            	         "x": 0,
	            	         "y": 0,
	            	         "node": 0
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "O",
	            	   "multiCoords": false,
	            	   "coords": [
	            	      {
	            	         "x": 76,
	            	         "y": 716,
	            	         "node": 19
	            	      },
	            	      {
	            	         "x": 0,
	            	         "y": 0,
	            	         "node": 0
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "P",
	            	   "multiCoords": false,
	            	   "coords": [
	            	      {
	            	         "x": 529,
	            	         "y": 966,
	            	         "node": 20
	            	      },
	            	      {
	            	         "x": 0,
	            	         "y": 0,
	            	         "node": 0
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "Q",
	            	   "multiCoords": false,
	            	   "coords": [
	            	      {
	            	         "x": 671,
	            	         "y": 966,
	            	         "node": 21
	            	      },
	            	      {
	            	         "x": 0,
	            	         "y": 0,
	            	         "node": 0
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "R",
	            	   "multiCoords": false,
	            	   "coords": [
	            	      {
	            	         "x": 898,
	            	         "y": 966,
	            	         "node": 22
	            	      },
	            	      {
	            	         "x": 0,
	            	         "y": 0,
	            	         "node": 0
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "S",
	            	   "multiCoords": false,
	            	   "coords": [
	            	      {
	            	         "x": 1289,
	            	         "y": 966,
	            	         "node": 23
	            	      },
	            	      {
	            	         "x": 0,
	            	         "y": 0,
	            	         "node": 0
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "T",
	            	   "multiCoords": true,
	            	   "coords": [
	            	      {
	            	         "x": 932,
	            	         "y": 479,
	            	         "node": 24
	            	      },
	            	      {
	            	         "x": 1223,
	            	         "y": 567,
	            	         "node": 25
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "U",
	            	   "multiCoords": false,
	            	   "coords": [
	            	      {
	            	         "x": 1223,
	            	         "y": 783,
	            	         "node": 26
	            	      },
	            	      {
	            	         "x": 0,
	            	         "y": 0,
	            	         "node": 0
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "V",
	            	   "multiCoords": false,
	            	   "coords": [
	            	      {
	            	         "x": 932,
	            	         "y": 763,
	            	         "node": 27
	            	      },
	            	      {
	            	         "x": 0,
	            	         "y": 0,
	            	         "node": 0
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "W",
	            	   "multiCoords": false,
	            	   "coords": [
	            	      {
	            	         "x": 932,
	            	         "y": 355,
	            	         "node": 28
	            	      },
	            	      {
	            	         "x": 0,
	            	         "y": 0,
	            	         "node": 0
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "X",
	            	   "multiCoords": false,
	            	   "coords": [
	            	      {
	            	         "x": 1164,
	            	         "y": 294,
	            	         "node": 29
	            	      },
	            	      {
	            	         "x": 0,
	            	         "y": 0,
	            	         "node": 0
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "Y",
	            	   "multiCoords": false,
	            	   "coords": [
	            	      {
	            	         "x": 991,
	            	         "y": 192,
	            	         "node": 30
	            	      },
	            	      {
	            	         "x": 0,
	            	         "y": 0,
	            	         "node": 0
	            	      }
	            	   ]
	            	},
	            	 {
	            	   "name": "Z",
	            	   "multiCoords": false,
	            	   "coords": [
	            	      {
	            	         "x": 1289,
	            	         "y": 192,
	            	         "node": 31
	            	      },
	            	      {
	            	         "x": 0,
	            	         "y": 0,
	            	         "node": 0
	            	      }
	            	   ]
	            	}
	            	];
	//displayShopsOnMap(shops);
	return shops;
}

function initRouteNodes() {
	var nodes = [
	          {
   "name": 1,
   "x": 81,
   "y": 427,
   "next":[2,19]
 },
 {
   "name": 2,
   "x": 211,
   "y": 427,
   "next":[1,3]
 },
 {
   "name": 3,
   "x": 388,
   "y": 427,
   "next":[2,37]
 },
 {
   "name": 4,
   "x": 488,
   "y": 285,
   "next":[9,35]
 },
 {
   "name": 5,
   "x": 504,
   "y": 241,
   "next":[6,35]
 },
 {
   "name": 6,
   "x": 620,
   "y": 241,
   "next":[5,7]
 },
 {
   "name": 7,
   "x": 751,
   "y": 241,
   "next":[6,32]
 },
 {
   "name": 8,
   "x": 884,
   "y": 360,
   "next":[28,24]
 },
 {
   "name": 9,
   "x": 488,
   "y": 359,
   "next":[4,37]
 },
 {
   "name": 10,
   "x": 488,
   "y": 462,
   "next":[11,37]
 },
 {
   "name": 11,
   "x": 488,
   "y": 628,
   "next":[10,34]
 },
 {
   "name": 12,
   "x": 884,
   "y": 616,
   "next":[17,13]
 },
 {
   "name": 13,
   "x": 884,
   "y": 512,
   "next":[12,24]
 },
 {
   "name": 14,
   "x": 488,
   "y": 731,
   "next":[34,36]
 },
 {
   "name": 15,
   "x": 596,
   "y": 914,
   "next":[20,21]
 },
 {
   "name": 16,
   "x": 781,
   "y": 914,
   "next":[21,33]
 },
 {
   "name": 17,
   "x": 884,
   "y": 730,
   "next":[12,27]
 },
 {
   "name": 18,
   "x": 269,
   "y": 696,
   "next":[19,34]
 },
 {
   "name": 19,
   "x": 76,
   "y": 696,
   "next":[1,18]
 },
 {
   "name": 20,
   "x": 529,
   "y": 914,
   "next":[36,15]
 },
 {
   "name": 21,
   "x": 671,
   "y": 914,
   "next":[16,15]
 },
 {
   "name": 22,
   "x": 908,
   "y": 914,
   "next":[33,23]
 },
 {
   "name": 23,
   "x": 1289,
   "y": 914,
   "next":[22,26]
 },
 {
   "name": 24,
   "x": 884,
   "y": 479,
   "next":[13,8]
 },
 {
   "name": 25,
   "x": 1289,
   "y": 567,
   "next":[26,31]
 },
 {
   "name": 26,
   "x": 1289,
   "y": 783,
   "next":[25,23]
 },
 {
   "name": 27,
   "x": 884,
   "y": 763,
   "next":[17,33]
 },
 {
   "name": 28,
   "x": 884,
   "y": 355,
   "next":[32,8]
 },
 {
   "name": 29,
   "x": 1164,
   "y": 241,
   "next":[30,31]
 },
 {
   "name": 30,
   "x": 991,
   "y": 241,
   "next":[32,29]
 },
 {
   "name": 31,
   "x": 1289,
   "y": 241,
   "next":[25,29]
 },
 {
   "name": 32,
   "x": 884,
   "y": 241,
   "next":[7,28,30]
 },
 {
   "name": 33,
   "x": 884,
   "y": 914,
   "next":[16,27,22]
 },
 {
   "name": 34,
   "x": 488,
   "y": 696,
   "next":[11,14,18]
 },
 {
   "name": 35,
   "x": 488,
   "y": 241,
   "next":[4,5]
 },
 {
   "name": 36,
   "x": 488,
   "y": 914,
   "next":[20,14]
 },
 {
   "name": 37,
   "x": 488,
   "y": 427,
   "next":[3,9,10]
 },
 {
   "name": 38,
   "x": 71,
   "y": 562,
   "next":[1, 19]
 },
 {
   "name": 39,
   "x": 1289,
   "y": 431,
   "next":[31, 25]
 }
	        	];
	//displayNodesOnMap(nodes, "route");
	return nodes;
}

function initEntryNodes() {
	var entries = [32, 38, 39];
	//displayNodesOnMap(entries, "entry");
	return entries;
}

/*
function loadJSON(callback, file) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.onreadystatechange = function () {
      if (xobj.readyState == 4 && xobj.status == "200") {
        // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
        callback(xobj.responseText);
      }
    };
    xobj.open('GET', file, true); 
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
*/
/**
 * Contains All functions related to Drawing on the CANVAS
 * */

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
	drawPath(lastNode.x, lastNode.y, shop.coords[coordinate].x, shop.coords[coordinate].y, color);
}