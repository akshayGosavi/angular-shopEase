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
			
			var nodes = [
		 	             {},
		 			{x:	545,	y:	647},
		 			{x:	545,	y:	315},
		 			{x:	545,	y:	980},
		 			{x:	945,	y:	315},
		 			{x:	945,	y:	980},
		 			{x:	1335,	y:	315},
		 			{x:	1335,	y:	980},
		 			{x:	945,	y:	647},
		 			{x: 545,	y:	430},
		 			{x: 945,	y:	433},
		 			{x: 1335,	y:	550}
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
							}
						];
		 	}
		 	
			function initShops(){
			 	shops =	[
						 {
							x:	586,
							y:	647,
							pathUp:	null,
							pathDown:	null,
							pathLeft:	nodes[1],
							pathRight:	null,
							name:	"shop_1"
	   					 },
			             {
							x:	900,
							y:	433,
							pathUp:	nodes[4],
							pathDown:	nodes[8],
							pathLeft:	null,
							pathRight:	nodes[10],
							name:	"shop_2"
						},
						{
							x:	1210,
							y:	940,
							pathUp:	null,
							pathDown:	null,
							pathLeft:	nodes[5],
							pathRight:	nodes[7],
							name:	"shop_3"
						},
						{
							x:	1286,
							y:	550,
							pathUp:	nodes[6],
							pathDown:	nodes[7],
							pathLeft:	null,
							pathRight:	nodes[11],
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
						pathRight:	nodes[4],
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
						pathDown:	nodes[5],
						pathLeft:	nodes[2],
						pathRight:	nodes[6],
						name:	"node_4"
					};
				
				nodes[5] = {
						x:	945,
						y:	980,
						pathUp:	nodes[8],
						pathDown:	null,
						pathLeft:	nodes[3],
						pathRight:	nodes[7],
						name:	"node_5"
					};
				
				nodes[6] = {
						x:	1335,
						y:	315,
						pathUp:	null,
						pathDown:	nodes[7],
						pathLeft:	nodes[4],
						pathRight:	null,
						name:	"node_6"
					};
				
				nodes[7] = {
						x:	1335,
						y:	980,
						pathUp:	nodes[6],
						pathDown:	null,
						pathLeft:	nodes[5],
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
	
				
				
		 		
			}
		 	
		 	var path = [];
		 	var movement = [];
		 	var currentStartNode = null;
		 	var currentShopToVisit = null; 
		 	var nextStart = null;
			
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
			
			function drawPath(x1, y1, x2, y2, canvasContext){
				canvasContext.lineWidth = 5;
				canvasContext.beginPath();
				canvasContext.moveTo(x1,y1);
				canvasContext.lineTo(x2,y2);
				canvasContext.stroke();
			} // END : drawPath
			
			function showPathForCurrentShop(){
				var canvasVar = document.getElementById("canvas");
				var canvasContext = canvasVar.getContext("2d");
				if(flagToAlternateMapLineColor){
					canvasContext.strokeStyle = "#D41CB0";
					flagToAlternateMapLineColor = false;
				}else {
					canvasContext.strokeStyle = "#24781D";
					flagToAlternateMapLineColor = true;
				}
				for(i = 0 ; i < path.length-1 ; i++){
					drawPath(path[i].x, path[i].y, path[i+1].x, path[i+1].y, canvasContext);
				}
			} // END : showPathForCurrentShop
			
			function closeRouteAndShow(){
				$.each(movement, function(i, item){
					path.push(item);
				});
				path.push(nextStart);
				path.push(currentShopToVisit);
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
				var start = point;
				var distanceBetweenShopsAndStartNode = [];
				
				$.each(shops, function(i,shop){
					distanceBetweenShopsAndStartNode.push(getDistanceObj(shop, start));
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
			
			function findClosestNode(nodeToMap){
				var distanceFromAllSides = [];
			
				if(nodeToMap.pathUp != null){
					distanceFromAllSides.push(getDistanceObj(nodeToMap.pathUp, nodeToMap));
				} else {
					distanceFromAllSides.push(getDistanceObjWithSpecifiedValues(999999, nodeToMap.pathUp));
				}
				
				if(nodeToMap.pathDown != null){
					distanceFromAllSides.push(getDistanceObj(nodeToMap.pathDown, nodeToMap));
				} else {
					distanceFromAllSides.push(getDistanceObjWithSpecifiedValues(999999, nodeToMap.pathDown));
				}
				
				if(nodeToMap.pathLeft != null){
					distanceFromAllSides.push(getDistanceObj(nodeToMap.pathLeft, nodeToMap));
				} else {
					distanceFromAllSides.push(getDistanceObjWithSpecifiedValues(999999, nodeToMap.pathLeft));
				}
				
				if(nodeToMap.pathRight != null){
					distanceFromAllSides.push(getDistanceObj(nodeToMap.pathRight, nodeToMap));
				} else {
					distanceFromAllSides.push(getDistanceObjWithSpecifiedValues(999999, nodeToMap.pathRight));
				}
				
				var objWithSmallestDistance = sortTheDistanceArrayAndReturnTheSmallest(distanceFromAllSides);

				return objWithSmallestDistance.node;
			} // END : findClosestNodeForShop
			
			
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
					distanceFromAllSides.push(getDistanceObj(nodeToMap.pathUp, currentStartNode));
				} else {
					distanceFromAllSides.push(getDistanceObjWithSpecifiedValues(999999, nodeToMap.pathUp));
				}
				
				if(nodeToMap.pathDown != null){
					distanceFromAllSides.push(getDistanceObj(nodeToMap.pathDown, currentStartNode));
				} else {
					distanceFromAllSides.push(getDistanceObjWithSpecifiedValues(999999, nodeToMap.pathDown));
				}
				
				if(nodeToMap.pathLeft != null){
					distanceFromAllSides.push(getDistanceObj(nodeToMap.pathLeft, currentStartNode));
				} else {
					distanceFromAllSides.push(getDistanceObjWithSpecifiedValues(999999, nodeToMap.pathLeft));
				}
				
				if(nodeToMap.pathRight != null){
					distanceFromAllSides.push(getDistanceObj(nodeToMap.pathRight, currentStartNode));
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
			
			
			function route(node){
				console.log("route() called with " , node.name);
				if(areTwoNodesDirectlyReachable(nextStart, node)){
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
	 		
			function letsBegin(){
				nextStart = entries[0];
				do{
					currentStartNode = nextStart;
					currentShopToVisit = getClosestShop(currentStartNode);
					removeVisitedShopFromList(currentShopToVisit);
					nextStart = findClosestNode(currentShopToVisit) 
					route(currentStartNode);
				}while(doWeNeedToContinue());
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