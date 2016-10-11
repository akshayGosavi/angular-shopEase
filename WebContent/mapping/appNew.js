var pathsToShow = [];

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
	var shoppingList = ['M','R','A','K','S','H','Y'];
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

function sortAndReturn(arr){
    function SortByDistance(a, b){
        var aDist = a.dist;
        var bDist = b.dist;
        return ((aDist < bDist) ? -1 : ((aDist > bDist) ? 1 : 0));
    }

    return arr.sort(SortByDistance);
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
            var sortedArr = sortAndReturn(distanceArr);
            var i = 0;
            var sortedArrLength = sortedArr.length - 1;
            var returnNode = null;
            do{
                returnNode = sortedArr[i++].node;
            }while( i <= sortedArrLength && isAlreadyInPath(returnNode.name));
 			return returnNode;
 		}
 	}

    function isAlreadyInPath(nodeName){
        var isPresent = false;
        $.each(movement, function(i, obj){
            if(angular.equals(obj.name, nodeName)){
                isPresent = true;
            }
        });

        return isPresent;
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

    function determineFirstNode() {
        var entries = getEntries();
        var closest = [];

        $.each(entries, function(i, nodeIndex){
            var node = getRouteNodeByName(nodeIndex);
            var closeNode = getNodeCloseToShop(node);
            var distObj = getDistaceObjNodeToShop(closeNode, shopToVisit);
            closest.push({ node: node, dist: distObj.dist});
        });

        return sortAndReturnSmallest(closest).node;
    }

 	function theFirstStep(){
 		if( nodes != null && shops != null){
 			var cnt = 0;
 			shopToVisit = getShopNodeByName(shoppingList[cnt]);
 			firstNodeFromShop = determineFirstNode();
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