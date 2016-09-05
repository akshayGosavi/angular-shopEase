function performRouting(){
	
	var canvasVar = document.getElementById("canvas");
	var canvasContext = canvasVar.getContext("2d");
	
	var nodes = [];
 	var entries = [];
 	var shops = [];
	
 	var shoppingList = ['A','K','S','H','Y'];
 	
 	var shopToVisit = null;
 	var firstNodeFromShop = null;
 	var currentRouteNode = null;
 	
 	var movement = [];
 	
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
 	
 	function getDistaceObjNodeToShop(node, shop, type){
 		if(shop.multiCoords){
 			var dist0 = getDistanceBetweenTwoPoints(node, shop.coords[0]);
 			var dist1 = getDistanceBetweenTwoPoints(node, shop.coords[1]);
 			if(dist0 <= dist1){
 				var dist = {
 		 	 			coord : (type === "preset") ? -1 : 0,
 		 	 			dist : (type === "preset") ? 999999 : dist0
 		 	 		};
 			} else {
 				var dist = {
 		 	 			coord : (type === "preset") ? -1 : 1,
 		 	 			dist : (type === "preset") ? 999999 : dist1
 		 	 		};
 			}
 		} else {
 			var dist = {
 	 	 			coord : (type === "preset") ? -1 : 0,
 	 	 			dist : (type === "preset") ? 999999 : getDistanceBetweenTwoPoints(node, shop.coords[0])
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
				distanceArr.push(getDistaceObjNodeToShop(getRouteNodeByName(nodeList[0]), shopToVisit, null));
				distanceArr.push(getDistaceObjNodeToShop(getRouteNodeByName(nodeList[1]), shopToVisit, null));
				distanceArr.push(getDistaceObjNodeToShop(null, shopToVisit, "preset"));
				distanceArr.push(getDistaceObjNodeToShop(null, shopToVisit, "preset"));
				break;
			case 3:
				distanceArr.push(getDistaceObjNodeToShop(getRouteNodeByName(nodeList[0]), shopToVisit, null));
				distanceArr.push(getDistaceObjNodeToShop(getRouteNodeByName(nodeList[1]), shopToVisit, null));
				distanceArr.push(getDistaceObjNodeToShop(getRouteNodeByName(nodeList[2]), shopToVisit, null));
				distanceArr.push(getDistaceObjNodeToShop(null, shopToVisit, "preset"));
				break;
			case 4:
				distanceArr.push(getDistaceObjNodeToShop(getRouteNodeByName(nodeList[0]), shopToVisit, null));
				distanceArr.push(getDistaceObjNodeToShop(getRouteNodeByName(nodeList[1]), shopToVisit, null));
				distanceArr.push(getDistaceObjNodeToShop(getRouteNodeByName(nodeList[2]), shopToVisit, null));
				distanceArr.push(getDistaceObjNodeToShop(getRouteNodeByName(nodeList[3]), shopToVisit, null));
				break;
			}
 			
 			return  getRouteNodeByName(shopToVisit.coords[sortAndReturnSmallest(distanceArr).coord].node);
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
 		//console.log(currentRouteNode.name);
 		//console.log("->");
 		$.each(movement, function(i, obj){
 			console.log(obj.name);
 			console.log("->");
 		});
 		movement = [];
 		console.log(firstNodeFromShop.name);
 		console.log("->");
 		console.log(shopToVisit.name);
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
 				nextNode = getNodeCloseToSpecificNode(node, firstNodeFromShop); // need to implement
 			}
 			route(nextNode);
 		}
 	}
 	
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
 		} else {
 			console.log("nodes not populated");
 		}
 	}
 	
 	theFirstStep();
}