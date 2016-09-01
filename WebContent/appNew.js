function performRouting(){
	
	var canvasVar = document.getElementById("canvas");
	var canvasContext = canvasVar.getContext("2d");
	
	var nodes = initRouteNodes();
 	var entries = initEntryNodes();
 	var shops = initShopNodes();
	
 	var shoppingList = ['A','K','S','H','Y'];
 	
 	var shopToVisit = null;
 	var firstNodeFromShop = null;
 	var currentRouteNode = null;
 	
 	var movement = [];
 	
 	function getAllPossibleNodesFrom(node){
 		var nodeArr = [];
 		nodeArr.push(node.coords[0].node);
 		if(node.mulitiCoords === true){
 			nodeArr.push(node.coords[1].node);
 		}
 	}
 	
 	function getDistanceBetweenTwoNodes(nodeA, nodeB){
 		var dx = nodeA.x - nodeB.x;
 		var dy = nodeA.y - nodeB.y;
 		return Math.sqrt((dx*dx) + (dy*dy));
 	}
 	
 	function getDistanceObj(nodeA, nodeB, type){
 		var dist = {
 			node : nodeA,
 			dist : (type === "preset") ? 999999 : getDistanceBetweenTwoNodes(nodeA, nodeB)
 		};
 		
 		return dist;
 	}
 	
 	function sortAndReturnSmallest(arr){
 		var idOfSmallest = 0;
 		var smallest = arr[0].dist;
 		$.each(distance, function(i, node){
 			if(smallest > node.dist){
 				smallest = node.dist;
 				idOfSmallest = i;
 			}
 		});
 		
 		return arr[idOfSmallest];
 	}
 	
 	function getNodeCloseToShop(fromNode){
 		var nodeList = getAllPossibleNodesFrom(node);
 		if(nodeList.length == 1){
 			return nodeList[0];
 		} else {
 			var cnt = nodeList.length;
 			var distanceArr = [];
 			switch (cnt) {
			case 2:
				distanceArr.push(getDistanceObj(nodeList[0], shopToVisit, null));
				distanceArr.push(getDistanceObj(nodeList[1], shopToVisit, null));
				distanceArr.push(getDistanceObj(null, shopToVisit, "preset"));
				distanceArr.push(getDistanceObj(null, shopToVisit, "preset"));
				break;
			case 3:
				distanceArr.push(getDistanceObj(nodeList[0], shopToVisit, null));
				distanceArr.push(getDistanceObj(nodeList[1], shopToVisit, null));
				distanceArr.push(getDistanceObj(nodeList[2], shopToVisit, null));
				distanceArr.push(getDistanceObj(null, shopToVisit, "preset"));
				break;
			case 4:
				distanceArr.push(getDistanceObj(nodeList[0], shopToVisit, null));
				distanceArr.push(getDistanceObj(nodeList[1], shopToVisit, null));
				distanceArr.push(getDistanceObj(nodeList[2], shopToVisit, null));
				distanceArr.push(getDistanceObj(nodeList[3], shopToVisit, null));
				break;
			}
 			
 			return sortAndReturnSmallest(distanceArr);
 		}
 	}
 	
 	function getNodeCloseToSpecificNode(fromNode, ToNode){
 		var nodeList = getAllPossibleNodesFrom(node);
 		if(nodeList.length == 1){
 			return nodeList[0];
 		} else {
 			var cnt = nodeList.length;
 			var distanceArr = [];
 			switch (cnt) {
			case 2:
				distanceArr.push(getDistanceObj(nodeList[0], ToNode, null));
				distanceArr.push(getDistanceObj(nodeList[1], ToNode, null));
				distanceArr.push(getDistanceObj(null, ToNode, "preset"));
				distanceArr.push(getDistanceObj(null, ToNode, "preset"));
				break;
			case 3:
				distanceArr.push(getDistanceObj(nodeList[0], ToNode, null));
				distanceArr.push(getDistanceObj(nodeList[1], ToNode, null));
				distanceArr.push(getDistanceObj(nodeList[2], ToNode, null));
				distanceArr.push(getDistanceObj(null, ToNode, "preset"));
				break;
			case 4:
				distanceArr.push(getDistanceObj(nodeList[0], ToNode, null));
				distanceArr.push(getDistanceObj(nodeList[1], ToNode, null));
				distanceArr.push(getDistanceObj(nodeList[2], ToNode, null));
				distanceArr.push(getDistanceObj(nodeList[3], ToNode, null));
				break;
			}
 			
 			return sortAndReturnSmallest(distanceArr);
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
 		var nodelist = getAllPossibleNodesFrom(NodeFrom);
 		$.each(nodelist, function(i, obj){
 			if(NodeToCheck === obj){
 				isConnected = true;
 			}
 		});
 		
 		return isConnected;
 	}
 	
 	function getCommonNodesElseNull( nodeA, nodeB){
 		var nodelistA = getAllPossibleNodesFrom(nodeA);
 		var nodelistB = getAllPossibleNodesFrom(nodeB);
 		
 		var commonNodeList = null;
 		
 		$.each(nodelistA, function(i, objA){
 			$.each(nodelistB, function(j, objB){
 				if(objA === objB){
 					commonNodeList.push(objA);
 				}
 			});
 		});
 		
 		if( commonNodeList != null){
 			return commonNodeList;
 		} else{
 			return null;
 		}
 	}
 	
 	
 	function route(node){
 		if(areTwoNodesConnected(firstNodeFromShop, node)){
 			movement.push(node);
 			//end of road now print the path 
 		} else {
 			movement.push(node);
 			var nextNode = null;
 			if(getCommonNodesElseNull(firstNodeFromShop, node) != null){
 				var commonNodes = getCommonNodesElseNull(firstNodeFromShop, node);
 				if(commonNodes.length > 1){
 					nextNode = chooseNextNode(commonNodes); // need to implement
 				} else {
 					nextNode = commonNodes[0];
 				}
 			} else {
 				nextNode = getNextCloseNode(node); // need to implement
 			}
 		}
 	}
 	
 	function theFirstStep(){
 		var cnt = 0;
 		firstNodeFromShop = getNodeCloseToShop(getRouteNodeByName(1)); // hand coding start node for time being 
 		do{
 			currentRouteNode = firstNodeFromShop;
 			shopToVisit = getShopNodeByName(shoppingList[0]);
 			firstNodeFromShop = getNodeCloseToSpecificNode(currentRouteNode, shopToVisit);
 			route(currentRouteNode);
 		}while( cnt < shoppingList.length);
 	}
 	
}