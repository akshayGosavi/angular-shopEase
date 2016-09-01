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