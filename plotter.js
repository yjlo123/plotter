var canvas = document.getElementById("myCanvas");
var canvas2 = document.getElementById("myCanvas2");
var ctx = canvas.getContext("2d");
var ctx2 = canvas2.getContext("2d");
ctx2.strokeStyle = "red";

ctx.font = "15px courier";
ctx.lineWidth = 3;

var W = 210;
var H = 297;
var A = 182;

var curX = 0;
var curY = 0;

function drawLine(x1, y1, x2, y2){
	ctx.beginPath();
	ctx.moveTo(x1,y1);
	ctx.lineTo(x2,y2);
	ctx.stroke();
}

function drawArm(px, py){
	ctx.clearRect(0, 0, 800, 600);
	var degree = calArmDegree(px, py);
	var x = A*Math.cos(degree*Math.PI/180);
	var y = H-A*Math.sin(degree*Math.PI/180);
	drawLine(0,H,x,y);
	drawLine(x,y,px,py);
}

function calArmDegree(px, py){
	var x = px;
	var y = H-py;
	var a = Math.atan(y/x)/Math.PI*180;
	var s = Math.sqrt(Math.pow(x,2)+Math.pow(y,2))/2;
	var b = Math.acos(s/A)/Math.PI*180;
	var alpha = a-b;
	var beta = 180-2*(90-b);
	ctx.fillStyle = "#000000";
	ctx.fillText("alpha = "+Math.round(alpha),10,H+150);
	ctx.fillText("beta  = "+Math.round(beta),10,H+170);
	//console.log("alpha", alpha);
	//console.log("beta", beta);
	return alpha;
}


var points = [[10,10], [50,200], [200, 250], [180, 120], [20, 120]];

var interval = setInterval(updatePosition, 20, 0, 0);
ctx2.fillStyle = "#EEEEEE";
ctx2.fillRect(0,0,W,H);

var p = -1;
function next(){
	clearInterval(interval);
	p += 1;
	console.log(p)
	if(p < points.length){
		interval = setInterval(updatePosition, 20, points[p][0], points[p][1]);
	}
}

function updatePosition(x, y){
	ctx2.moveTo(curX,curY);
	if (curX < x) curX += 1;
	if (curX > x) curX -= 1;
	if (curY < y) curY += 1;
	if (curY > y) curY -= 1;
	ctx2.lineTo(curX,curY);
	ctx2.stroke();
	drawArm(curX, curY);
	if(curX == x && curY == y) next();
}