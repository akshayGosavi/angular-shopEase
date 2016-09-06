function performRouting(){
	
	var canvasVar = document.getElementById("canvas");
	var canvasContext = canvasVar.getContext("2d");
	
	var nodes = [];
 	var entries = [];
 	var shops = [];
	
 	var shoppingList = ['A','K','S','H','Y'];
 	
 	var shopToVisit = null;
 	var shopCoordChosen = null;
 	var firstNodeFromShop = null;
 	var currentRouteNode = null;
 	
 	var movement = [];
 	var pathsToShow = [];
 	
 	function getAllPossibleNodesFromShop(node){
 		var nodeArr = [];
 		nodeArr.push(node.coords[0].node);
 		if(node.mulitiCoords === true){
 			nodeArr.push(node.coords[1].node);
 		}
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
 	
 	
 	function getShopNodeByName(name){
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
 		var node = null;
 		$.each(nodes, function(i, obj){
 			if(name === obj.name){
 				node = obj;
 				return false;
 			}
 		});
 		
 		return node;
 	}
 	
 	function getEntryNodeByName(name){
 		var entry = null;
 		$.each(entries, function(i, obj){
 			if(name === obj.name){
 				entry = obj;
 				return false;
 			}
 		});
 		
 		return entry;
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
 	
 	function getCommonNodesElseNull( nodeA, nodeB){
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
 	
 	function finalizeRouteAndShow(){
 		var move = [];
 		$.each(movement, function(i, obj){
 			move.push(obj.name);
 		});
 		movement = [];
 		move.push(firstNodeFromShop.name);
 		pathsToShow.push({shop: shopToVisit, path: move});
 	}
 	
 	function route(node){
 		if(areTwoNodesConnected(firstNodeFromShop, node)){
 			movement.push(node);
 			finalizeRouteAndShow();
 			//end of road now print the path 
 		} else {
 			movement.push(node);
 			var nextNode = null;
 			var commonNodes = getCommonNodesElseNull(firstNodeFromShop, node);
 			
 			if( commonNodes != null){
 				if(commonNodes.length > 1){
 					nextNode = chooseNextNode(commonNodes); // need to implement
 				} else {
 					nextNode = getRouteNodeByName(commonNodes[0]);
 				}
 			} else {
 				nextNode = getNodeCloseToSpecificNode(node, firstNodeFromShop); 
 			}
 			route(nextNode);
 		}
 	}
 	
 	var flagToAlternateMapLineColor = false;
 	
 	function showPaths(){
 		console.log(pathsToShow);
 		
 		var noOfPaths = pathsToShow.length-1;
 		
 		for(i = 0 ; i <= noOfPaths ; i++ ){
 			var shop = pathsToShow[i].shop;
 			var path = pathsToShow[i].path;
 			var pathCount = path.length-1;
 			
 			if(flagToAlternateMapLineColor){
 				canvasContext.strokeStyle = "#D41CB0";
 				flagToAlternateMapLineColor = false;
 			}else {
 				canvasContext.strokeStyle = "#24781D";
 				flagToAlternateMapLineColor = true;
 			}
 			
 			for(j = 0 ; j < pathCount-1 ; j++){
 				var node1 = getRouteNodeByName(path[j]);
 				var node2 = getRouteNodeByName(path[j+1]);
 				
 				drawPath(node1.x, node1.y, node2.x, node2.y);
 			}

 			var lastNode = getRouteNodeByName(path[pathCount-1]);
 			drawPath(lastNode.x, lastNode.y, shop.coords[shopCoordChosen].x, shop.coords[shopCoordChosen].y);
 			
 		}
 	}
 	
 	function drawPath(x1, y1, x2, y2){
		canvasContext.lineWidth = 5;
		canvasContext.beginPath();
		canvasContext.moveTo(x1,y1);
		canvasContext.lineTo(x2,y2);
		canvasContext.stroke();
	} // END : drawPath
 	
 	function theFirstStep(){
 		nodes = initRouteNodes();
 	 	entries = initEntryNodes();
 	 	shops = initShopNodes();
 	 	
 		if( nodes != null && shops != null && entries != null ){
 			var cnt = 0;
 			shopToVisit = getShopNodeByName(shoppingList[cnt]);
 			firstNodeFromShop = getRouteNodeByName(38); // hand coding start node for time being
 	 		do{
 	 			currentRouteNode = firstNodeFromShop;
 	 			shopToVisit = getShopNodeByName(shoppingList[cnt++]);
 	 			firstNodeFromShop = getNodeCloseToShop(currentRouteNode);
 	 			if(currentRouteNode === firstNodeFromShop){
 	 				finalizeRouteAndShow();
 	 			} else{
 	 				route(currentRouteNode);
 	 			}	 			 	 			
 	 		}while( cnt < shoppingList.length);
 	 		
 	 		showPaths();
 		} else {
 			console.log("nodes not populated");
 		}
 	}
 	
 	theFirstStep();
}