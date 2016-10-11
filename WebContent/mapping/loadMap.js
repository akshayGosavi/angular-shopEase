/**
 * Contains Function to load MapImage on Canvas on document.ready()
 * */
$(function(){
	//showMap();
	prepareRoute();
});

function showMap(){
	// place base map image in the background 
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;
    
    var canvasOffset = $("#canvas").offset();

    var img = new Image();
    img.onload = function(){
        //canvas.width = img.width;
        //canvas.height = img.height;
        ctx.drawImage(img,0,0);
    }
    img.src = "maps/MallMap1.jpg";
}

function showMapAndRoute(i){
	// place base map image in the background 
    var canvas=document.getElementById("canvas");
    var ctx=canvas.getContext("2d");
	
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    var img = new Image();
    img.onload = function(){
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img,0,0);
        showRoute(i);
    }
    img.src = "maps/MallMap1.jpg";
}



