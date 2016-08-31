	$(function(){
			// place base map image in the background 
		    var canvas=document.getElementById("canvas");
		    var ctx=canvas.getContext("2d");
			
		    ctx.canvas.width = window.innerWidth;
		    ctx.canvas.height = window.innerHeight;
		    
		    var canvasOffset=$("#canvas").offset();
		    var offsetX=canvasOffset.left;
		    var offsetY=canvasOffset.top;
		
		    var img=new Image();
		    img.onload=function(){
		        canvas.width=img.width;
		        canvas.height=img.height;
		        ctx.drawImage(img,0,0);
		     	// start painting the routes
			    performRouting();
		    }
		    img.src="MallMap1.jpg";
		}); 
	
		function performRouting(){
			
			var canvasVar = document.getElementById("canvas");
			var canvasContext = canvasVar.getContext("2d");
			
			var nodes = [
		 	             {},
		 			{x:	545,	y:	647},//1
		 			{x:	545,	y:	315},//2
		 			{x:	545,	y:	980},//3
		 			{x:	945,	y:	315},//4
		 			{x:	945,	y:	980},//5
		 			{x:	1335,	y:	315},//6
		 			{x:	1335,	y:	980},//7
		 			{x:	945,	y:	647},//8
		 			{x: 545,	y:	430},//9
		 			{x: 945,	y:	433},//10
		 			{x: 1335,	y:	550},//11
		 			{x: 1210,	y:	983},//12
		 			{x: 820,	y:	315}//13
	 			];

		 	var entries = [];

		 	var shops = [];
		 	
		 	function initEntries(){
		 		entries = [
							{
								x:	80,
								y:	647,
								pathUp:	null,
								pathDown:	null,
								pathLeft:	null,
								pathRight:	nodes[1],
								name:	"Main Entrance"
							},
							{
								x:	1365,
								y:	520,
								pathUp:	null,
								pathDown:	null,
								pathLeft:	nodes[11],
								pathRight:	null,
								name:	"Escalator"
							}
							
						];
		 	}
		 	
			function initShops(){
			 	shops =	[
						 {
							x:	586,
							y:	647,
							exitx:	586,
							exity:	647,
							entryNode:	nodes[1],
							exitNode:	nodes[1],
							name:	"shop_1"
	   					 },
			             {
	   						x:	820,
	   						y:	370,
	   						exitx:	901,
							exity:	433,
							entryNode:	nodes[13],
							exitNode:	nodes[10],
							name:	"shop_2"
						},
						{
							x:	1210,
							y:	940,
							exitx:	1210,
							exity:	940,
							entryNode:	nodes[12],
							exitNode:	nodes[12],
							name:	"shop_3"
						},
						{
							x:	1286,
							y:	550,
							exitx:	1286,
							exity:	550,
							entryNode:	nodes[11],
							exitNode:	nodes[11],
							name:	"shop_4"
						}
					];
			}
		
		 	function initNodes(){	
		 		
				nodes[1] = {
						x:	545,
						y:	647,
						pathUp:	nodes[9],
						pathDown:	nodes[3],
						pathLeft:	entries[0],
						pathRight:	null,
						name:	"node_1"
					};
				
				nodes[2] = {
						x:	545,
						y:	315,
						pathUp:	null,
						pathDown:	nodes[9],
						pathLeft:	null,
						pathRight:	nodes[13],
						name:	"node_2"
					};
				
				nodes[3] = {
						x:	545,
						y:	980,
						pathUp:	nodes[1],
						pathDown:	null,
						pathLeft:	null,	
						pathRight:	nodes[5],
						name:	"node_3"
					};
				
				nodes[4] = {
						x:	945,
						y:	315,
						pathUp:	null,
						pathDown:	nodes[10],
						pathLeft:	nodes[13],
						pathRight:	nodes[6],
						name:	"node_4"
					};
				
				nodes[5] = {
						x:	945,
						y:	980,
						pathUp:	nodes[8],
						pathDown:	null,
						pathLeft:	nodes[3],
						pathRight:	nodes[12],
						name:	"node_5"
					};
				
				nodes[6] = {
						x:	1335,
						y:	315,
						pathUp:	null,
						pathDown:	nodes[11],
						pathLeft:	nodes[4],
						pathRight:	null,
						name:	"node_6"
					};
				
				nodes[7] = {
						x:	1335,
						y:	980,
						pathUp:	nodes[11],
						pathDown:	null,
						pathLeft:	nodes[12],
						pathRight:	null,
						name:	"node_7"
					};
				
				nodes[8] = {
						x:	945,
						y:	647,
						pathUp:	nodes[10],
						pathDown:	nodes[5],
						pathLeft:	null,
						pathRight:	null,
						name:	"node_8"
					};
				
				nodes[9] = {
						x:	545,
						y:	430,
						pathUp:	nodes[2],
						pathDown:	nodes[1],
						pathLeft:	null,
						pathRight:	null,
						name:	"node_9"
						};
				
				nodes[10] = {
						x:	945,
						y:	433,
						pathUp:	nodes[4],
						pathDown:	nodes[8],
						pathLeft:	null,
						pathRight:	null,
						name:	"node_10"
						};
				
				nodes[11] = {
						x:	1335,
						y:	550,
						pathUp:	nodes[6],
						pathDown:	nodes[7],
						pathLeft:	null,
						pathRight:	null,
						name:	"node_11"
						};
				
				nodes[12] = {
						x:	1210,
						y:	983,
						pathUp:	null,
						pathDown:	null,
						pathLeft:	nodes[5],
						pathRight:	nodes[7],
						name:	"node_12"
						};
				
				nodes[13] = {
						x:	820,
						y:	315,
						pathUp:	null,
						pathDown:	null,
						pathLeft:	nodes[2],
						pathRight:	nodes[4],
						name:	"node_13"
						};

			}
		 	
		 	var path = [];
		 	var movement = [];
		 	var currentStartNode = null;
		 	var currentShopToVisit = null;
		 	var previouslyVisitedShop = null;
		 	var nextStartNode = null;
		 	var firstNode = null;
		 	var exitNode = null;
		 	var exitPath = [];
			
			function showPointOnMap(node, type){
				var canvasVar = document.getElementById("canvas");
				var canvasContext = canvasVar.getContext("2d");
				
				if(type === "shop"){
					canvasContext.fillStyle = "#AC94CC";
				} else if(type === "node"){
					canvasContext.fillStyle = "#FF0000";
				} else if(type === "entry"){
					canvasContext.fillStyle = "#0A0DD0";
				}
				var radius = type === "shop" ? 8 : 5;
				
				canvasContext.beginPath();
				canvasContext.arc(node.x, node.y, radius, 0, 2*Math.PI);
				canvasContext.fill();
			} // END : showPointOnMap
			
			function showNodesOnMap(arrayObj, type){
				$.each(arrayObj, function(i, node) {
					showPointOnMap(node, type);
				});
			} // END : showNodesOnMap
			
			var flagToAlternateMapLineColor = false;
			
			function drawPath(x1, y1, x2, y2){
				canvasContext.lineWidth = 5;
				canvasContext.beginPath();
				canvasContext.moveTo(x1,y1);
				canvasContext.lineTo(x2,y2);
				canvasContext.stroke();
			} // END : drawPath
			
			function showPathForCurrentShop(){
				if(flagToAlternateMapLineColor){
					canvasContext.strokeStyle = "#D41CB0";
					flagToAlternateMapLineColor = false;
				}else {
					canvasContext.strokeStyle = "#24781D";
					flagToAlternateMapLineColor = true;
				}
				if(previouslyVisitedShop && !areSameNode(previouslyVisitedShop.entryNode, previouslyVisitedShop.exitNode)){
					drawPath(previouslyVisitedShop.exitx, previouslyVisitedShop.exity, path[0].x, path[0].y);
				}				
				for(i = 0 ; i < path.length-1 ; i++){
					drawPath(path[i].x, path[i].y, path[i+1].x, path[i+1].y);
				}
				
				drawPath(firstNode.x, firstNode.y, currentShopToVisit.x, currentShopToVisit.y);
			} // END : showPathForCurrentShop
			
			function closeRouteAndShow(){
				$.each(movement, function(i, item){
					path.push(item);
				});
				path.push(firstNode);
				console.log("Route prepared for ",currentShopToVisit.name);
				showPathForCurrentShop();
				path = [];
				movement = [];
			} // END : closeRouteAndShow
			
			function removeVisitedShopFromList(shopToRemove){
				$.each(shops, function(i,shop){
					if(shop.x === shopToRemove.x && shop.y === shopToRemove.y){
						shops.splice(i, 1);	
						return false;
					}
				})		    
			} // END : removeVisitedShopFromList
			
			function doWeNeedToContinue(){
				if( shops.length <1 )
					return false;
				else
					return true;
			} // END : doWeNeedToContinue 
			
			function SortByDistance(a, b){
			  var aDist = a.dist;
			  var bDist = b.dist; 
			  return ((aDist < bDist) ? -1 : ((aDist > bDist) ? 1 : 0));
			} // END : SortByDistance - custom sort function 
			
			function sortTheDistanceArrayAndReturnTheSmallest(distance){
		 		var idOfSmallestDistanceShop = 0;
		 		var smallest = distance[0].dist;
		 		$.each(distance, function(i, node){
		 			if(smallest > node.dist){
		 				smallest = node.dist;
		 				idOfSmallestDistanceShop = i;
		 			}
		 		});
		 		
		 		return distance[idOfSmallestDistanceShop];
		 	} // END : sortTheDistanceArrayAndReturnTheSmallest
			
		 	function getDistanceBetweenTwoPoints(aPosition, bPosition){
				var dx = aPosition.x - bPosition.x;
				var dy = aPosition.y - bPosition.y;
				return Math.sqrt((dx * dx) + (dy * dy));
		 	} // END : getDistanceBetweenTwoPoints
			
		 	function getDistanceObj(nodeA, nodeB){
				var distanceBetweenAB = {
						dist: 	getDistanceBetweenTwoPoints(nodeA, nodeB),
						node:	nodeA
					};
				
				return distanceBetweenAB;
			} // END : getDistanceObj
			
		 	function getDistanceObjWithSpecifiedValues(dist_value, node_value){
		 		var distanceBetweenAB = {
						dist: 	dist_value,
						node:	node_value
					};
				
				return distanceBetweenAB;
		 	} // END : getDistanceObjWithSpecifiedValues
			
			function getClosestShop(point){
				var distanceBetweenShopsAndStartNode = [];
				
				$.each(shops, function(i,shop){
					distanceBetweenShopsAndStartNode.push(getDistanceObj(shop, point));
				});
				
				var objWithSmallestDistance = sortTheDistanceArrayAndReturnTheSmallest(distanceBetweenShopsAndStartNode);
				return objWithSmallestDistance.node;
			} // END : getClosestShop
			
			function compareTwoNodesToGetClosetNode(nodeA, nodeB, fixedNode){
				var distA = getDistanceBetweenTwoPoints(fixedNode, nodeA);
				var distB = getDistanceBetweenTwoPoints(fixedNode, nodeB);
				return (distA <= distB) ? distA : distB;
			} // END : compareTwoNodesToGetClosetNode
			
			function areSameNode(nodeA, nodeB){
				if(nodeA && nodeB 
						&& nodeA.x === nodeB.x
						&& nodeA.y === nodeB.y){
					return true;
				} else {
					return false;
				}
			} // END : areSameNode
			
			function getEntryNodeOfShop(shopNode){
				if(shopNode.entryNode){
					return shopNode.entryNode;
				} else{
					return shopNode;
				}
			} // END : getEntryNodeOfShop
			
			function getExitNodeOfShop(shopNode){
				if(shopNode.exitNode){
					return shopNode.exitNode;
				} else{
					return shopNode;
				}
			} // END : getExitNodeOfShop
			
			function areTwoNodesDirectlyReachable(nodeA, nodeB){
				// From nodeA
				if(nodeA.pathUp != null && (nodeA.pathUp.x == nodeB.x && nodeA.pathUp.y == nodeB.y))
		 			return true;
		 		else if(nodeA.pathDown != null && (nodeA.pathDown.x == nodeB.x && nodeA.pathDown.y == nodeB.y))
		 			return true;
		 		else if(nodeA.pathLeft != null && (nodeA.pathLeft.x == nodeB.x && nodeA.pathLeft.y == nodeB.y))
		 			return true;
		 		else if(nodeA.pathRight!=null && (nodeA.pathRight.x == nodeB.x && nodeA.pathRight.y == nodeB.y))
		 			return true;		
				else if(nodeB.pathUp != null && (nodeB.pathUp.x == nodeA.x && nodeB.pathUp.y == nodeA.y))
		 			return true;
		 		else if(nodeB.pathDown != null && (nodeB.pathDown.x == nodeA.x && nodeB.pathDown.y == nodeA.y))
		 			return true;
		 		else if(nodeB.pathLeft != null && (nodeB.pathLeft.x == nodeA.x && nodeB.pathLeft.y == nodeA.y))
		 			return true;
		 		else if(nodeB.pathRight!=null && (nodeB.pathRight.x == nodeA.x && nodeB.pathRight.y == nodeA.y))
		 			return true;
		 		else 
		 			return false;
			} // END : areTwoNodesDirectlyReachable
				
			function findClosestNodeFromCurrentPosition(nodeToMap, ignoreCount){
				var distanceFromAllSides = [];
			
				if(nodeToMap.pathUp != null){
					distanceFromAllSides.push(getDistanceObj(nodeToMap.pathUp, firstNode));
				} else {
					distanceFromAllSides.push(getDistanceObjWithSpecifiedValues(999999, nodeToMap.pathUp));
				}
				
				if(nodeToMap.pathDown != null){
					distanceFromAllSides.push(getDistanceObj(nodeToMap.pathDown, firstNode));
				} else {
					distanceFromAllSides.push(getDistanceObjWithSpecifiedValues(999999, nodeToMap.pathDown));
				}
				
				if(nodeToMap.pathLeft != null){
					distanceFromAllSides.push(getDistanceObj(nodeToMap.pathLeft, firstNode));
				} else {
					distanceFromAllSides.push(getDistanceObjWithSpecifiedValues(999999, nodeToMap.pathLeft));
				}
				
				if(nodeToMap.pathRight != null){
					distanceFromAllSides.push(getDistanceObj(nodeToMap.pathRight, firstNode));
				} else {
					distanceFromAllSides.push(getDistanceObjWithSpecifiedValues(999999, nodeToMap.pathRight));
				}
				
				var sortedDistanceFromAllSides = distanceFromAllSides.sort(SortByDistance);
				return sortedDistanceFromAllSides[ignoreCount].node;
			} // END : findClosestNodeFromCurrentPosition
			
			function findClosestNodeFromCurrentPosition_exit(nodeToMap, ignoreCount){
				var distanceFromAllSides = [];
			
				if(nodeToMap.pathUp != null){
					distanceFromAllSides.push(getDistanceObj(nodeToMap.pathUp, exitNode));
				} else {
					distanceFromAllSides.push(getDistanceObjWithSpecifiedValues(999999, nodeToMap.pathUp));
				}
				
				if(nodeToMap.pathDown != null){
					distanceFromAllSides.push(getDistanceObj(nodeToMap.pathDown, exitNode));
				} else {
					distanceFromAllSides.push(getDistanceObjWithSpecifiedValues(999999, nodeToMap.pathDown));
				}
				
				if(nodeToMap.pathLeft != null){
					distanceFromAllSides.push(getDistanceObj(nodeToMap.pathLeft, exitNode));
				} else {
					distanceFromAllSides.push(getDistanceObjWithSpecifiedValues(999999, nodeToMap.pathLeft));
				}
				
				if(nodeToMap.pathRight != null){
					distanceFromAllSides.push(getDistanceObj(nodeToMap.pathRight, exitNode));
				} else {
					distanceFromAllSides.push(getDistanceObjWithSpecifiedValues(999999, nodeToMap.pathRight));
				}
				
				var sortedDistanceFromAllSides = distanceFromAllSides.sort(SortByDistance);
				return sortedDistanceFromAllSides[ignoreCount].node;
			} // END : findClosestNodeFromCurrentPosition
			
			function isAlreadyVisited(nodeA){
				var alreadyVisitedNode = false;
				$.each(movement, function(i, move){
					if(areSameNode(move, nodeA)){
						alreadyVisitedNode = true;
					}
				});
				
				return alreadyVisitedNode;
			} // END : isAlreadyVisited
			
			function isAlreadyVisited_exit(nodeA){
				var alreadyVisitedNode = false;
				$.each(exitPath, function(i, move){
					if(areSameNode(move, nodeA)){
						alreadyVisitedNode = true;
					}
				});
				
				return alreadyVisitedNode;
			} // END : isAlreadyVisited
			
			
			function route(node){
				console.log("route() called with " , node.name);
				if(areTwoNodesDirectlyReachable(firstNode, node)){
					movement.push(node);
					closeRouteAndShow();
				} else {
					movement.push(node);
					console.log("route() " , node.name ," is pushed to movement");
					var nodeToCheckNext = null;
					for(n = 0 ; n < 4 ; n++){
						var next = findClosestNodeFromCurrentPosition(node,n);
						if(!isAlreadyVisited(next)){
							nodeToCheckNext = next;
							break;
						}
					}
					route(nodeToCheckNext);
				}
			} // END : route
	 		
			function getClosestExit(point){
				var distanceBetweenShopsAndStartNode = [];
				
				$.each(entries, function(i, entry){
					distanceBetweenShopsAndStartNode.push(getDistanceObj(entry, point));
				});
				
				var objWithSmallestDistance = sortTheDistanceArrayAndReturnTheSmallest(distanceBetweenShopsAndStartNode);
				return objWithSmallestDistance.node;
			} // END : getClosestShop
			
			function showExit(){
				canvasContext.strokeStyle = "#311208";
				if(previouslyVisitedShop && !areSameNode(previouslyVisitedShop.entryNode, previouslyVisitedShop.exitNode)){
					drawPath(previouslyVisitedShop.exitx, previouslyVisitedShop.exity, exitPath[0].x, exitPath[0].y);
				}
				for(i = 0 ; i < exitPath.length-1 ; i++){
					drawPath(exitPath[i].x, exitPath[i].y, exitPath[i+1].x, exitPath[i+1].y);
				}
				var l = exitPath.length;
				drawPath(exitPath[l-1].x, exitPath[l-1].y, exitNode.x, exitNode.y);
			}
			
			function routeToExit(node){
				console.log("Exit() called with " , node.name);
				if(areTwoNodesDirectlyReachable(exitNode, node)){
					exitPath.push(node);
					showExit();
				} else {
					exitPath.push(node);
					console.log("Exit() " , node.name ," is pushed to exitPath");
					var nodeToCheckNext = null;
					for(n = 0 ; n < 4 ; n++){
						var next = findClosestNodeFromCurrentPosition_exit(node,n);
						if(!isAlreadyVisited_exit(next)){
							nodeToCheckNext = next;
							break;
						}
					}
					routeToExit(nodeToCheckNext);
				}
			} // END : routeToExit
			
			
			function exitNow(currentPosition){
				console.log("exit called");
				exitNode = getClosestExit(currentPosition);
				routeToExit(currentPosition);
			}
			
			function letsBegin(){
				nextStartNode = entries[1];
				do{
					currentStartNode = nextStartNode;
					previouslyVisitedShop = currentShopToVisit;
					currentShopToVisit = getClosestShop(currentStartNode);
					removeVisitedShopFromList(currentShopToVisit);
					firstNode = getEntryNodeOfShop(currentShopToVisit);
					nextStartNode = getExitNodeOfShop(currentShopToVisit);
					route(currentStartNode);
					alert("moving ahead");
				}while(doWeNeedToContinue());
				exitNow(nextStartNode);

			}
			
			
			for(i = 0 ; i < nodes.length ; i++){
				initNodes();	
			}
			initShops();
			initEntries();
			showNodesOnMap(entries, "entry");
			showNodesOnMap(nodes, "node");
			showNodesOnMap(shops, "shop");		
			letsBegin();
		} // END : performRouting