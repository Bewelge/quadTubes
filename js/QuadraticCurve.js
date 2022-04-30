class QuadraticCurve {
	constructor(p0, c0, p1) {
		this._c0 = c0
		this._p0 = p0
		this._p1 = p1
	}
	get p1() {
		return this._p1
	}
	get p0() {
		return this._p0
	}
	get c0() {
		return this._c0
	}
	debug(c) {
		c.beginPath()
		c.moveTo(this.p0.x, this.p0.y)
		c.lineTo(this.c0.x, this.c0.y)
		c.stroke()
		c.closePath()

		c.beginPath()
		c.arc(this.p0.x, this.p0.y, 3, 0, PI2)
		c.stroke()
		c.closePath()
	}
	translate(vec) {
		this._p1.addVector(vec)
		this._p0.addVector(vec)
		this._c0.addVector(vec)
	}
	getPointAt(t) {
		//B(t) = (1-t)**3 p0 + 3(1 - t)**2 t P1 + 3(1-t)t**2 P2 + t**3 P3
		let x =
			(1 - t) * (1 - t) * (1 - t) * this.p0.x +
			3 * (1 - t) * (1 - t) * t * this.c0.x +
			3 * (1 - t) * t * t * this.c0.x +
			t * t * t * this.p1.x
		let y =
			(1 - t) * (1 - t) * (1 - t) * this.p0.y +
			3 * (1 - t) * (1 - t) * t * this.c0.y +
			3 * (1 - t) * t * t * this.c0.y +
			t * t * t * this.p1.y
		return new Vec2(x, y)
	}
	curveTo(path) {
		path.quadraticCurveTo(this.c0.x, this.c0.y, this.p1.x, this.p1.y)
	}
	doCurveTo(path) {
		path.moveTo(this.p0.x, this.p0.y)
		path.quadraticCurveTo(this.c0.x, this.c0.y, this.p1.x, this.p1.y)
	}
}
