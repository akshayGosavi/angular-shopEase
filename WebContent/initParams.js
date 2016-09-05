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

/*function initShopNodes() {
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

// for time being hard coing the JSONs - above functions are not working 
function initShopNodes() {
	var shops = [
	         {
	        	   "name": "A",
	        	   "multiCoords": false,
	        	   "coords": [
	        	      {
	        	         "x": 145,
	        	         "y": 481,
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
	        	         "x": 275,
	        	         "y": 481,
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
	        	         "x": 452,
	        	         "y": 481,
	        	         "node": 3
	        	      },
	        	      {
	        	         "x": 518,
	        	         "y": 359,
	        	         "node": 4
	        	      }
	        	   ]
	        	},
	        	 {
	        	   "name": "D",
	        	   "multiCoords": false,
	        	   "coords": [
	        	      {
	        	         "x": 568,
	        	         "y": 266,
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
	        	         "x": 684,
	        	         "y": 266,
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
	        	         "x": 815,
	        	         "y": 266,
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
	        	         "x": 586,
	        	         "y": 433,
	        	         "node": 8
	        	      },
	        	      {
	        	         "x": 904,
	        	         "y": 434,
	        	         "node": 9
	        	      }
	        	   ]
	        	},
	        	 {
	        	   "name": "H",
	        	   "multiCoords": true,
	        	   "coords": [
	        	      {
	        	         "x": 586,
	        	         "y": 536,
	        	         "node": 10
	        	      },
	        	      {
	        	         "x": 586,
	        	         "y": 702,
	        	         "node": 11
	        	      }
	        	   ]
	        	},
	        	 {
	        	   "name": "I",
	        	   "multiCoords": false,
	        	   "coords": [
	        	      {
	        	         "x": 904,
	        	         "y": 690,
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
	        	         "x": 904,
	        	         "y": 586,
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
	        	         "x": 586,
	        	         "y": 805,
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
	        	         "x": 660,
	        	         "y": 940,
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
	        	         "x": 845,
	        	         "y": 940,
	        	         "node": 16
	        	      },
	        	      {
	        	         "x": 904,
	        	         "y": 804,
	        	         "node": 17
	        	      }
	        	   ]
	        	},
	        	 {
	        	   "name": "N",
	        	   "multiCoords": false,
	        	   "coords": [
	        	      {
	        	         "x": 333,
	        	         "y": 790,
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
	        	         "x": 140,
	        	         "y": 790,
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
	        	         "x": 593,
	        	         "y": 1040,
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
	        	         "x": 735,
	        	         "y": 1040,
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
	        	         "x": 972,
	        	         "y": 1040,
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
	        	         "x": 1353,
	        	         "y": 1040,
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
	        	         "x": 996,
	        	         "y": 553,
	        	         "node": 24
	        	      },
	        	      {
	        	         "x": 1287,
	        	         "y": 641,
	        	         "node": 25
	        	      }
	        	   ]
	        	},
	        	 {
	        	   "name": "U",
	        	   "multiCoords": false,
	        	   "coords": [
	        	      {
	        	         "x": 1287,
	        	         "y": 857,
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
	        	         "x": 996,
	        	         "y": 837,
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
	        	         "x": 996,
	        	         "y": 429,
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
	        	         "x": 1228,
	        	         "y": 368,
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
	        	         "x": 1055,
	        	         "y": 266,
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
	        	         "x": 1353,
	        	         "y": 266,
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
	displayShopsOnMap(shops);
	return shops;
}

function initRouteNodes() {
	var nodes = [
	         {
	        	   "name": 1,
	        	   "x": 145,
	        	   "y": 501,
	        	   "next":[2,19]
	        	 },
	        	 {
	        	   "name": 2,
	        	   "x": 275,
	        	   "y": 501,
	        	   "next":[1,3]
	        	 },
	        	 {
	        	   "name": 3,
	        	   "x": 452,
	        	   "y": 501,
	        	   "next":[2,37]
	        	 },
	        	 {
	        	   "name": 4,
	        	   "x": 552,
	        	   "y": 359,
	        	   "next":[9,35]
	        	 },
	        	 {
	        	   "name": 5,
	        	   "x": 568,
	        	   "y": 315,
	        	   "next":[6,35]
	        	 },
	        	 {
	        	   "name": 6,
	        	   "x": 684,
	        	   "y": 315,
	        	   "next":[5,7]
	        	 },
	        	 {
	        	   "name": 7,
	        	   "x": 815,
	        	   "y": 315,
	        	   "next":[6,32]
	        	 },
	        	 {
	        	   "name": 8,
	        	   "x": 948,
	        	   "y": 434,
	        	   "next":[28,24]
	        	 },
	        	 {
	        	   "name": 9,
	        	   "x": 552,
	        	   "y": 433,
	        	   "next":[4,37]
	        	 },
	        	 {
	        	   "name": 10,
	        	   "x": 552,
	        	   "y": 536,
	        	   "next":[11,37]
	        	 },
	        	 {
	        	   "name": 11,
	        	   "x": 552,
	        	   "y": 702,
	        	   "next":[10,34]
	        	 },
	        	 {
	        	   "name": 12,
	        	   "x": 948,
	        	   "y": 690,
	        	   "next":[17,13]
	        	 },
	        	 {
	        	   "name": 13,
	        	   "x": 948,
	        	   "y": 586,
	        	   "next":[12,24]
	        	 },
	        	 {
	        	   "name": 14,
	        	   "x": 552,
	        	   "y": 805,
	        	   "next":[34,36]
	        	 },
	        	 {
	        	   "name": 15,
	        	   "x": 660,
	        	   "y": 988,
	        	   "next":[20,21]
	        	 },
	        	 {
	        	   "name": 16,
	        	   "x": 845,
	        	   "y": 988,
	        	   "next":[21,33]
	        	 },
	        	 {
	        	   "name": 17,
	        	   "x": 948,
	        	   "y": 804,
	        	   "next":[12,27]
	        	 },
	        	 {
	        	   "name": 18,
	        	   "x": 333,
	        	   "y": 770,
	        	   "next":[19,34]
	        	 },
	        	 {
	        	   "name": 19,
	        	   "x": 140,
	        	   "y": 770,
	        	   "next":[1,18]
	        	 },
	        	 {
	        	   "name": 20,
	        	   "x": 593,
	        	   "y": 988,
	        	   "next":[36,15]
	        	 },
	        	 {
	        	   "name": 21,
	        	   "x": 735,
	        	   "y": 988,
	        	   "next":[16,15]
	        	 },
	        	 {
	        	   "name": 22,
	        	   "x": 972,
	        	   "y": 988,
	        	   "next":[33,23]
	        	 },
	        	 {
	        	   "name": 23,
	        	   "x": 1353,
	        	   "y": 988,
	        	   "next":[22,26]
	        	 },
	        	 {
	        	   "name": 24,
	        	   "x": 948,
	        	   "y": 553,
	        	   "next":[13,8]
	        	 },
	        	 {
	        	   "name": 25,
	        	   "x": 1353,
	        	   "y": 641,
	        	   "next":[26,31]
	        	 },
	        	 {
	        	   "name": 26,
	        	   "x": 1353,
	        	   "y": 857,
	        	   "next":[25,23]
	        	 },
	        	 {
	        	   "name": 27,
	        	   "x": 948,
	        	   "y": 837,
	        	   "next":[17,33]
	        	 },
	        	 {
	        	   "name": 28,
	        	   "x": 948,
	        	   "y": 429,
	        	   "next":[32,8]
	        	 },
	        	 {
	        	   "name": 29,
	        	   "x": 1228,
	        	   "y": 315,
	        	   "next":[30,31]
	        	 },
	        	 {
	        	   "name": 30,
	        	   "x": 1055,
	        	   "y": 315,
	        	   "next":[32,29]
	        	 },
	        	 {
	        	   "name": 31,
	        	   "x": 1353,
	        	   "y": 315,
	        	   "next":[25,29]
	        	 },
	        	 {
	        	   "name": 32,
	        	   "x": 948,
	        	   "y": 315,
	        	   "next":[7,28,30]
	        	 },
	        	 {
	        	   "name": 33,
	        	   "x": 948,
	        	   "y": 988,
	        	   "next":[16,27,22]
	        	 },
	        	 {
	        	   "name": 34,
	        	   "x": 552,
	        	   "y": 770,
	        	   "next":[11,14,18]
	        	 },
	        	 {
	        	   "name": 35,
	        	   "x": 552,
	        	   "y": 315,
	        	   "next":[4,5]
	        	 },
	        	 {
	        	   "name": 36,
	        	   "x": 552,
	        	   "y": 988,
	        	   "next":[20,14]
	        	 },
	        	 {
	        	   "name": 37,
	        	   "x": 552,
	        	   "y": 501,
	        	   "next":[3,9,10]
	        	 },
	        	 {
	        	   "name": 38,
	        	   "x": 135,
	        	   "y": 636,
	        	   "next":[1, 19]
	        	 },
	        	 {
	        	   "name": 39,
	        	   "x": 1353,
	        	   "y": 505,
	        	   "next":[31, 25]
	        	 }
	        	];
	displayNodesOnMap(nodes, "route");
	return nodes;
}

function initEntryNodes() {
	var entries = [38, 39];
	
	//displayNodesOnMap(entries, "entry");
	return entries;
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