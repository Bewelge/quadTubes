window.$fxhashFeatures = {}

let text0 = ` 
<div class="imgCont"><img src="./img/Banner.png"/></div>
</br>
</br>
This will be a small writeup about my last piece - <a href="https://www.fxhash.xyz/generative/11743">"QuadTubes - Abstract Variations"</a>. 

The piece features different arrangements of tube-structures. Some iterations feature very soft and organic looking tubes that contain these blobs that create a feeling of pressure and flow. Other iterations have a sharper, more uniform look often reminding of leafs or flower petals. 
The softer iterations have a distinct water-color look while the sharper ones look like they're drawn with colored pencils.
</br>
</br>

Because these tubes are somewhat difficult to describe, I decided to call them QuadTubes (=Tubes created with quadratic curves). 

</br>
</br>

They're created by continuously drawing smooth quadratic curves through a set of points which slowly rotate around a predefined orbit. 
I stumbled upon the technique by accident, but actually later noticed that it can produce quite similar results to 
the Sand Traveler by <a href="http://www.complexification.net/gallery/machines/sandTraveler/index.php">Jared Tarbell</a> which I had seen a couple of months earlier. So even if subconsciously, the technique was definitely inspired on some level by his work.
 Though for the QuadTubes I use lines to create tubes and Sand Traveler seems to be particle based and creates these flat, highway-like shapes. 
 But as far as I can tell it is based on the same concept of defining curves and then continuously rendering and shifting those curves.

</br>
</br>

Using this technique it's possible to produce a wide arrange of different styles and shapes by tweaking different parameters. I'll briefly explain how the algorithm works and go over some of the parameters I used to create the different styles among the iterations

</br>
</br>



The algorithm itself is actually quite simple: 
</br>
<ol>
<li> Define a set of points and define an orbit for each</li>

<li> Stroke a smooth curve through those points.</li>

<li> Rotate the points around a predefined orbit</li>

<li> Keep repeating Steps 2 & 3</li>
</ol>
</br>
</br>
</br>


<h3>1.  Define a set of points</h3>
</br>
We start off by defining a couple of points through which our tube should run. For this example I simply chose a couple of points distributed in a horizontal zig-zag pattern.
</br>
<div class="preDiv"><pre>
//Initialize points

let points = []
let pointAmount = 8
let amplitude = 200
let x = 50
let y = height / 2
let stepW = width / pointAmount
for (let i = 0; i < pointAmount; i++) {
	let point = {
		x: x + stepW * i,
		y: y + amplitude - (i % 2) * amplitude * 2
	}
	points.push(point)
}
</pre></div>
<div id="canvas00"></div>
</br>
</br>

<h3>2.  Stroke smooth line through points. </h3>

To get a set of smooth curves defined by the points, I used the method described by Homan on this <a href="https://stackoverflow.com/questions/7054272/how-to-draw-smooth-curve-through-n-points-using-javascript-html5-canvas">Stackoverflow question</a>.
It works by always using the next point as control point and curving towards the middle of the next two points. That way the curves themselves always form a smooth junction between each other. 
However, it also means that the curves never actually touch the points themselves, which might be problematic when you require exact positioning. But since I was making an abstract piece this method worked well enough.
</br>

<div id="canvas01"></div>
</br>
</br>

<h3>3.  Move points around orbit. </h3>
This can be done in a number of ways but I chose to define each orbit with a starting angle, a constant value that's added to the angle and a speed value. 
Each animation frame, all points will move towards their current angle by their speed value. Then the current angle will be adjusted by the constant change value.
It's easiest if we simply store these values in each point object:

<div class="preDiv"><pre>
//Initialize points

for (let i = 0; i < pointAmount; i++) {
	let iterations = 20
	let point = {
		x: x + stepW * i,
		y: y + amplitude - (i % 2) * amplitude * 2
		angleChange: Math.PI * 2 / iterations,
		speed: 15,
		angle: 0 
	}
	points.push(point)
}
</pre></div>
<div class="preDiv"><pre>
//Update points

points.forEach(point => {
	point.x += Math.cos(point.angle) * point.speed
	point.y += Math.sin(point.angle) * point.speed
	point.angle += point.angleChange
})
</pre></div>
So each point will start in the direction 0 (to the right) and move 15 pixels in its current direction. The current direction is then adjusted by the angleChange value.
The iterations variable denotes how many iterations are needed for full revolution. Click the canvas below to view one revolution. You can click multiple times to repeat the animation.


</br>
</br>

<div id="canvas0"></div>


By decreasing both the linewidth and speed and increase the iteration value we can achieve a much smoother look:
<div class="preDiv"><pre>
lineWidth = 0.1
speed = 1
iterations = 200
</pre></div>

</br>
</br>

<div id="canvas1"></div> 

Adjusting these values in different ways can create very diverse results. Below is a tube where each points' speed value is randomized between 0 and 10.
<div class="preDiv">
<pre>
speed = rndFloat(0,10)
</pre>
</div>

<div id="canvas2"></div>

As you can see the variation in the radi of the orbits cause the tube to become thinner (low speed values) and thicker (higher speed values) at different points. 

While this created a variation in thickness, it still produces sharp edges around the tube. 
This is because the speed value only determines how far a point will travel in each iteration but since they all share the same iterations value, every revolution finishes at the same time.
</br>
</br>
Let's now see what happens if we keep speed constant but vary the iterations value:

<div class="preDiv"> 
<pre >
iterations = rndInt(10,100)
</pre>
</div> 

<div id="canvas3"></div>


<p>
This produces really interesting shapes. But the orbits now take a varying amount of iterations to finish. Because we stop moving the points after one iteration and some finish before others, we get these solid lines at the end. 
To avoid this we can let the animation run infinitely.
</br>
</br>
You'll see that while the tube looks more irregular, there's still some cool periodic patterns that emerge,
 it just takes longer than one individual revolution. One difficulty is finding a good time to stop the animation, since eventually the tube just gets filled solid, losing all of its plasticity. 

</p>

 </br>
 </br>
<div id="canvas4"></div>
</br>
</br>



For the final piece, I decided to let the curves run continuously but automatically pause after a certain amount of time had passed. Keeping this time constant allowed me to create different levels of darkness by simply using different color settings. 
 However I also implemented an option to adjust the speed at which the animation runs so that the viewers can decide for themselves at which pace the  image is constructed. 
 I also allow the viewer to unpause the animation even after it had reached its "final" state to enable creating even stronger colors and clearer contours. 
</br>
</br>
I enjoy giving the viewer more control over the piece but it's always a balancing act since some viewers will expect the 
 piece to simply look the way it is supposed to, without their interaction. 
 I think pausing the animation at a predetermined point in time while still allowing to unpause it for those that want to play with it was a good middle ground. 
 
 </br>
 </br>

I used these varying orbits to create the soft looking transitions between the individual curves. And to create the iterations with sharp, clean-looking curves I kept the number of iterations for each orbit constant.

<div class="imgCont">

<div class="noBreak"><a href="https://www.fxhash.xyz/gentk/639303">#163 </a><a> &nbsp;&&nbsp;</a> <a href="https://www.fxhash.xyz/gentk/638976"> #141</a> </div> 
Varying orbital periods
<div class="imgRow">
	<a><img src="./img/163.png"/></a>
	<a><img src="./img/141.png"/></a>
</div>
</div>

Next we'll look at the starting angle and how it affects the curves' shapes. Assigning a completely random starting angle creates hard to predict shapes but sometimes these baloon-animal-like shapes emerge. 

</br>
</br>
<div id="canvas5"></div>
</br>
</br>

One trick that I've used a lot to control the shapes was to alternate between two different settings for even and uneven points. Here's  two curves, one alternating between a left & right and the other between up & down starting angles, keeping all other attributes constant: 

</br>
</br>
<div class="preDiv"><pre>
angle = i % 2 == 0 ? -Math.PI * 0.5 : Math.PI * 0.5
</pre></div>
<div id="canvas6"></div>
</br>
</br>
</br>
</br>
<div class="preDiv"><pre>
angle = i % 2 == 0 ? 0 : Math.PI 
</pre></div>
<div id="canvas7"></div>
</br>
</br>
Using left and right starting angles applied to a set of points on a straight line or curve is how I created the sharper, more clean looking iterations:

<div class="imgCont">
<div class="noBreak"><a href="https://www.fxhash.xyz/gentk/638761">#008</a> 
&nbsp;&nbsp;Constant orbital periods, alternating starting angles & points on straight line</div>
<img src="./img/zoom3.png"/>
</div>
<div class="imgCont">
<div class="noBreak"><a href="https://www.fxhash.xyz/gentk/639022">#147 </a>   
&nbsp;&nbsp;Constant orbital periods, alternating starting angles & points on curve</div>
<img src="./img/zoom2.png"/>
</div>

At last, you can also play with the direction of each orbit (clockwise or counter-clockwise). This can be done by assigning a negative angleChange values. Below is a curve with randomized directions:

<div id="canvas10"></div>
</br>
</br>
This sometimes creates a nice twirl effect but also causes these overlaps. I used this parameter quite sparingly since the results can differ so strongly depending on how the other parameters are set. 
</br>
</br>
To achieve the style in the images I further decreased the linewidth to 0.02. Additionally I colored every other stroke white or black and used a mixture of the globalCompositeOperations "hard-light" and "overlay". 
While creating a really smooth look in most browsers, this sadly also proved to create issues on some devices and browsers.  Here's a version with a strokewidth of 0.05 and random starting angles, iterations and speed. 
The first and last points are also assigned a speed value of 0 to make the tube appear closed at the ends.
</br>
</br>
<div id="canvas8"></div>
</br>
</br>

For this piece, it was my intention to display a wide arrange of different styles so I opted for a large parametric space and only restricted some settings for certain arrangements. But I think these individual settings can be explored much further since they create quite distinct styles.
 Since some of the shapes looked very organic I also wondered whether it's possible to use this technique to create drawings of plants. Below are a couple of concepts I came up with. 

 

<div class="imgCont"><div class="imgRow"><a href="./img/flower4.png"> <img src="./img/flower4.png"/></a> <a href="./img/flower9.png"> <img src="./img/flower9.png"/></a> </div> </div>
<div class="imgCont"><div class="imgRow"><a href="./img/flower2.png"> <img src="./img/flower2.png"/></a> <a href="./img/flower3.png"> <img src="./img/flower3.png"/></a> </div> </div>
<div class="imgCont"><div class="imgRow"><a href="./img/flower0.png"> <img src="./img/flower0.png"/></a> <a href="./img/flower5.png"> <img src="./img/flower5.png"/></a> </div> </div>
<div class="imgCont"><div class="imgRow"><a href="./img/flower1.png"> <img src="./img/flower1.png"/></a> <a href="./img/flower6.png"> <img src="./img/flower6.png"/></a> </div> </div>
<div class="imgCont"><div class="imgRow"><a href="./img/flower10.png"> <img src="./img/flower10.png"/></a> <a href="./img/flower11.png"> <img src="./img/flower11.png"/></a> </div> </div>
<div class="imgCont"><div class="imgRow"><a href="./img/bamboo0.png"> <img src="./img/bamboo0.png"/></a> <a href="./img/bamboo1.png"> <img src="./img/bamboo1.png"/></a> </div> </div>
<div class="imgCont"><div class="imgRow"><a href="./img/bamboo2.png"> <img src="./img/bamboo2.png"/></a> <a href="./img/bamboo3.png"> <img src="./img/bamboo3.png"/></a> </div> </div>


</br>
</br>

All these images were entirely rendered with this technique. But defining these curves and orbits in a way that they actually resemble something realistic is quite tedious and the rendering performance also suffers with an increasing amount of curves. 


I'll keep experimenting with this and hopefully see others find new variations and extensions of this technique. 
You can also try using straight lines or bezier curves, it's not necessarily limited to quadratic curves. Or make the points move in a different pattern (eg ellipse, straight lines, along a curve). 
</br>
</br>
For now: here's a swan and some more abstract outputs I came up with:

</br>
</br>
</br>
<div id="canvas9"></div>

</br>
</br>
<div class="imgCont"><div class="imgRow"><a href="abstract0.png"> <img src="./img/abstract0.png"/></a> <a href="abstract1.png"> <img src="./img/abstract1.png"/></a> </div> </div>
<div class="imgCont"><div class="imgRow"><a href="abstract2.png"> <img src="./img/abstract2.png"/></a> <a href="abstract3.png"> <img src="./img/abstract3.png"/></a> </div> </div>
 <div class="imgCont"><div class="imgRow"><a href="abstract4.png"> <img src="./img/abstract4.png"/></a> <a href="abstract5.png"> <img src="./img/abstract5.png"/></a> </div> </div>
 <div class="imgCont"><div class="imgRow"><a href="abstract8.png"> <img src="./img/abstract8.png"/></a> <a href="abstract12.png"> <img src="./img/abstract12.png"/></a> </div> </div>
<div class="imgCont"><div class="imgRow"><a href="abstract10.png"> <img src="./img/abstract10.png"/></a> <a href="abstract11.png"> <img src="./img/abstract11.png"/></a> </div> </div>
 
`

var fontPath
opentype.load("./fonts/OfficeCodePro-Medium.ttf", function (err, font) {
	if (err) {
		// alert("Font could not be loaded: " + err)
	} else {
		fontPath = font.getPath("QuadTubes", 50, 260, 200)

		fontPath.commands.forEach((p, i) => {
			if (p.hasOwnProperty("x")) {
				let iterations = rndInt(70, 100)
				let turns = 1
				p.speed = i % 2 == 0 ? 0.2 : rndFloat(0.2, 0.3)

				p.angleChange = (PI2 / iterations) * rndFloat(0.5, 1)
				p.angle = i % 2 == 0 ? 0 : 0
				p.iterations = iterations * turns
				p.ticker = 0
			}
		})
	}
})

let text0Div = createTextDiv(text0)
document.body.appendChild(text0Div)

class CodePreview {
	constructor(opts) {
		this.width = 1200
		this.height = 600
		this.opts = opts
		this.renderPoints = opts.renderPoints
		this.speed = opts.speed
		this.angle = opts.angle
		this.iterations = opts.iterations
		this.lineWidth = opts.lineWidth
		this.infinite = opts.infinite || false
		this.firstClick = true
		this.stopOnClick = opts.stopOnClick || false
		this.noCurve = opts.noCurve || false
		this.noInteraction = opts.noInteraction || false
		this.drawDebug = opts.drawDebug || false
		this.end = false
		this.points = opts.points ? opts.points.slice(0) : []
		this.strokeStyle = opts.strokeStyle || "rgba(0,90,0,1)"

		this.initDom()

		this.init()
		if (!this.noInteraction) {
			this.cnv.addEventListener("click", () => {
				this.restart()
			})
		}
	}
	initDom() {
		this.cont = document.createElement("div")
		this.cont.classList.add("previewCont")
		// this.gui = new dat.GUI()
		// this.gui.add(this, "iterations", 1, 1000, 1).onChange(t => this.restart())
		// this.cont.appendChild(this.gui.domElement)
		this.cnv1 = createCanvas(this.width, this.height)
		this.c0 = this.cnv1.getContext("2d")
		this.cnv0 = createCanvas(this.width, this.height)
		this.c1 = this.cnv0.getContext("2d")
		this.cnv = createCanvas(this.width, this.height)
		this.c = this.cnv.getContext("2d")
		this.cont.appendChild(this.cnv)
	}

	restart() {
		this.points = []
		if (this.opts.points) {
			this.points = this.opts.points.slice(0)
			this.points.forEach(point => (point.ticker = 0))
		}
		if (this.stopOnClick && this.isRunning) {
			this.end = true
			return
		}
		if (this.end) {
			return
		}
		if (!this.firstClick) {
			this.c0.clearRect(0, 0, this.width, this.height)
			this.init()
		} else {
			this.firstClick = false
		}
		this.isRunning = true
		this.c0.clearRect(0, 0, this.width, this.height)
		this.draw()
	}
	init() {
		this.c.clearRect(0, 0, this.width, this.height)

		let pointAmount = 8
		let w = this.width - 400
		let x = 170 + w / (pointAmount * 2)
		let y = this.height / 2
		if (!this.opts.points) {
			for (let i = 0; i < pointAmount; i++) {
				let iterations = this.iterations(i)
				let point = {
					x: x + (w / pointAmount) * i,
					y: y + 50 - (i % 2) * 100,
					angleChange: PI2 / iterations,
					speed: this.speed(i),
					angle: this.angle(i),
					iterations: this.infinite ? Infinity : Math.abs(iterations) + 1,
					name: "P" + i
				}
				this.points.push(new Point(point))
			}
		}
		this.tube = new QuadTube(this.points, {
			lineWidth: this.lineWidth,
			renderPoints: this.renderPoints,
			drawDebug: this.drawDebug,
			noCurve: this.noCurve,
			strokeStyle: this.strokeStyle
		})

		this.c1.fontBaseline = "top"
		this.tube.render(this.c0, this.c1)
		if (!this.noInteraction) {
			this.c1.font = "25px Arial black"
			this.c1.fillStyle = "rgba(90,90,90,1)"
			this.c1.fillText("Click to start", 50, this.height - 50)
			this.cnv.style.cursor = "pointer"
		}
		this.c.drawImage(this.cnv1, 0, 0)
		this.c.drawImage(this.cnv0, 0, 0)
	}

	draw() {
		this.c.clearRect(0, 0, this.width, this.height)
		this.tube.render(this.c0, this.c1)
		if (this.stopOnClick) {
			this.c1.font = "25px Arial black"
			this.c1.fillStyle = "rgba(90,90,90,1)"
			this.c1.fillText("Click to stop", 50, this.height - 50)
		}

		this.c.drawImage(this.cnv0, 0, 0)
		this.c.drawImage(this.cnv1, 0, 0)
		if (
			!this.end &&
			this.tube.points.filter(p => p.ticker < p.iterations).length
		) {
			window.requestAnimationFrame(() => this.draw(this))
		} else {
			this.isRunning = false
			this.end = false
			window.setTimeout(() => {
				if (!this.isRunning) {
					this.c.clearRect(0, 0, this.width, this.height)
					this.c.drawImage(this.cnv1, 0, 0)
				}
			}, 100)
		}
	}
	getDiv() {
		return this.cont
	}
}

class QuadTube {
	constructor(
		points,
		opts = {
			renderPoints: true,
			lineWidth: 1,
			drawDebug: false,
			noCurve: false
		}
	) {
		this.points = points
		this.lineWidth = opts.lineWidth
		this.renderPoints = opts.renderPoints
		this.drawDebug = opts.drawDebug
		this.noCurve = opts.noCurve
		this.strokeStyle = opts.strokeStyle || "rgba(0,90,0,1)"
	}
	render(ct0, ct1) {
		// ct1 = ct1 || ct0
		ct0.lineWidth = this.lineWidth
		ct0.strokeStyle = "black"
		ct1.fillStyle = "black"
		ct1.font = "25px Arial black"
		let psToUpdate = this.points.filter(
			(p, i) => (p.name = "P" + i) && p.ticker < p.iterations
		)

		if (ct1 != ct0) {
			ct1.clearRect(0, 0, ct1.canvas.width, ct1.canvas.height)
		}
		let curves = smoothLineThroughPoints(this.points)
		psToUpdate.forEach((p, i) => {
			if (this.renderPoints) {
				ct1.fillStyle = "black"
				ct1.strokeStyle = "black"
				ct1.fillText(p.name, p.x + 5, p.y - 12)
				ct1.beginPath()
				ct1.arc(p.x, p.y, 8, 0, PI2)

				// ct1.stroke()
				ct1.fill()
				ct1.closePath()
				ct1.lineWidth = 0.5
				ct1.beginPath()
				let pCopy = { x: p.x, y: p.y, angle: p.angle }
				ct1.moveTo(pCopy.x, pCopy.y)
				for (let i = 0; i < PI2 / Math.abs(p.angleChange); i++) {
					pCopy.x += Math.cos(pCopy.angle) * p.speed
					pCopy.y += Math.sin(pCopy.angle) * p.speed
					pCopy.angle += p.angleChange
					ct1.lineTo(pCopy.x, pCopy.y)
				}
				ct1.stroke()
				ct1.closePath()

				ct1.lineWidth = 1

				if (!this.noCurve) {
					ct1.beginPath()
					curves.forEach(curve => curve.doCurveTo(ct1))
					ct1.stroke()
					ct1.closePath()
				}
			}
			p.update()
		})
		// ct0.globalCompositeOperation = rndFloat() < 0.5 ? "hard-light" : "overlay"
		if (!this.noCurve) {
			if (psToUpdate.length) {
				ct0.strokeStyle = this.strokeStyle
				ct0.beginPath()
				curves.forEach(curve => curve.doCurveTo(ct0))
				ct0.stroke()
				ct0.closePath()
			}
		}
		if (this.drawDebug) {
			console.log(123123)
			ct1.strokeStyle = "black"
			ct1.lineWidth = 1
			curves.forEach(curve => curve.debug(ct1))
		}
	}
}

class Point extends Vec2 {
	constructor(opts) {
		super(opts.x, opts.y)
		this.opts = opts
		//The points position
		// this.x = opts.x
		// this.y = opts.y
		//Constant value by which the points direction changes each tick
		this.angleChange = opts.angleChange
		//Starting direction of the point
		this.angle = opts.angle
		//Distance which the point travels each tick
		this.speed = opts.speed
		//to keep count of how often this points has been updated
		this.ticker = 0
		//the amount of times the point should be updated in total
		this.iterations = opts.iterations || Infinity
	}
	update() {
		this.ticker++
		if (this.iterations > this.ticker) {
			//Translate the point towards its current direction ...
			this.addAngle(this.angle, this.speed)
			// this.x += Math.cos(this.angle) * this.speed
			// this.y += Math.sin(this.angle) * this.speed

			//... and then add the constant angleChange value to its direction
			this.angle += this.angleChange
		}
	}
}

let canvas00 = new CodePreview({
	renderPoints: true,
	speed: () => 0,
	angle: () => 0,
	iterations: () => 0,
	lineWidth: 1,
	noInteraction: true,
	noCurve: true
})
document.getElementById("canvas00").appendChild(canvas00.getDiv())
let canvas01 = new CodePreview({
	renderPoints: true,
	speed: () => 0,
	angle: () => 0,
	iterations: () => 0,
	lineWidth: 1,
	noInteraction: true,
	drawDebug: true
})
document.getElementById("canvas01").appendChild(canvas01.getDiv())
let canvas0 = new CodePreview({
	renderPoints: true,
	speed: () => 15,
	angle: () => 0,
	iterations: () => 20,
	lineWidth: 1
})
document.getElementById("canvas0").appendChild(canvas0.getDiv())

let canvas1 = new CodePreview({
	renderPoints: true,
	speed: () => 2.5,
	angle: () => 0,
	iterations: () => 100,
	lineWidth: 0.1
})
document.getElementById("canvas1").appendChild(canvas1.getDiv())

let canvas2 = new CodePreview({
	renderPoints: true,
	speed: () => rndFloat(0, 5),
	angle: () => 0,
	iterations: () => 100,
	lineWidth: 0.1
})
document.getElementById("canvas2").appendChild(canvas2.getDiv())

let canvas3 = new CodePreview({
	renderPoints: true,
	speed: () => 5,
	angle: () => 0,
	iterations: () => rndInt(10, 150),
	lineWidth: 0.1
})
document.getElementById("canvas3").appendChild(canvas3.getDiv())

let canvas4 = new CodePreview({
	renderPoints: true,
	speed: i => 5,
	angle: () => 0,
	iterations: () => rndInt(10, 150),
	lineWidth: 0.1,
	infinite: true,
	stopOnClick: true
})
document.getElementById("canvas4").appendChild(canvas4.getDiv())

let canvas5 = new CodePreview({
	renderPoints: true,
	speed: i => 5,
	angle: () => rndAng(),
	iterations: () => 100,
	lineWidth: 0.1,
	infinite: true,
	stopOnClick: true
})
document.getElementById("canvas5").appendChild(canvas5.getDiv())
let canvas6 = new CodePreview({
	renderPoints: true,
	speed: i => 5,
	angle: i => (i % 2 == 0 ? 0 : PI),
	iterations: () => 100,
	lineWidth: 0.1,
	infinite: true,
	stopOnClick: true
})

document.getElementById("canvas6").appendChild(canvas6.getDiv())
let canvas7 = new CodePreview({
	renderPoints: true,
	speed: i => 5,
	angle: i => (i % 2 == 0 ? -PI05 : PI05),
	iterations: () => 100,
	lineWidth: 0.1,
	infinite: true,
	stopOnClick: true
})
document.getElementById("canvas7").appendChild(canvas7.getDiv())
let canvas8 = new CodePreview({
	renderPoints: true,
	speed: i => (i == 0 || i == 7 ? 0 : rndFloat(0, 5)),
	angle: i => rndAng(),
	iterations: () => rndInt(100, 110),
	lineWidth: 0.05,
	infinite: true,
	stopOnClick: true
})
document.getElementById("canvas8").appendChild(canvas8.getDiv())

let canvas10 = new CodePreview({
	renderPoints: true,
	speed: i => 5,
	angle: i => rndAng(),
	iterations: () => Math.sign(rndFloat(-10, 10)) * rndInt(100, 100),

	lineWidth: 0.05,
	infinite: true,
	stopOnClick: true
})
document.getElementById("canvas10").appendChild(canvas10.getDiv())

let swan = createSwan(new Point({ x: 340, y: 220 }))
let canvas9 = new CodePreview({
	renderPoints: true,
	speed: i => (i == 0 || i == 7 ? 0 : rndFloat(0, 5)),
	angle: i => rndAng(),
	iterations: () => rndInt(100, 110),
	lineWidth: 0.05,
	strokeStyle: "black",
	infinite: true,
	stopOnClick: true,
	points: swan
})
document.getElementById("canvas9").appendChild(canvas9.getDiv())

initBg()
function render() {
	if (paused) {
		window.requestAnimationFrame(render)
		return
	}
	if (fontPath) {
		c.strokeStyle = rndFloat() < 0.5 ? "rgba(0,15,0,1)" : "rgba(0,0,0,1)"
		c.lineWidth = 0.1
		let amountToDraw = 0
		fontPath.commands.forEach(p => {
			try {
				p.ticker++
				if (p.ticker < p.iterations) {
					amountToDraw++
					p.x += Math.cos(p.angle) * p.speed
					p.y += Math.sin(p.angle) * p.speed
					p.angle += p.angleChange
				}
			} catch (e) {}
		})
		if (amountToDraw > 0) {
			c.stroke(new Path2D(fontPath.toPathData()))
		}
	}
	for (let i = 0; i < 10; i++) {
		// quadTubes.forEach(tube => tube.render(c))
	}
	window.requestAnimationFrame(render)
}

window.addEventListener("click", render)
render()
