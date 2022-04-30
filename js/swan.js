function createSwan(p) {
	let size = 1
	let isMirrored = 0
	let ps = []
	let beakStart = p.copy()
	let beakAng = -PI05 * rndFloat(0.4, 0.7)
	let beakEnd = p.addAngle(beakAng, 60 * size).copy()
	let headMid = p
		.addAngle(beakAng - PI05 * rndFloat(0.4, 0.7), rndInt(20, 40) * size)
		.copy()
	let headEnd = p
		.addAngle(beakAng - PI05 * rndFloat(0.4, 0.7), 35 * size)
		.copy()
	let eyeP = p
		.copy()
		.addAngle(0, 25 * size)
		.addAngle(PI05, 10 * size)
	let neckAng = -rndFloat(0.1, 0.9) * PI05
	let neck0 = p.addAngle(-PI05 * 0.4, 100 * size).copy()
	let neck1 = p.addAngle(PI05 * 0.5, 140 * size).copy()
	let neckEnd = p.addAngle(PI05 * 1.2, 150 * size).copy()
	let body0 = p.addAngle(PI05 * 0.7, 50 * size).copy()
	let body1 = p.addAngle(-0.2, 250 * size).copy()
	let body2 = p.addAngle(-1.2, 120 * size).copy()
	ps.push(beakStart)
	ps.push(beakEnd)

	ps.push(headMid)
	ps.push(headEnd)
	ps.push(neck0)
	ps.push(neck1)
	ps.push(neckEnd)
	ps.push(body0)
	ps.push(body1)
	ps.push(body2)

	ps = ps.map(p => new Point(p))

	// ps.forEach((p, i) => {
	// 	c.fillStyle = "black"
	// 	c.globalCompositeOperation = "source-over"
	// 	// c.fillRect(p.x, p.y, 5, 5);
	// 	c.fillText(i, p.x, p.y)
	// })
	let speeds = [0, 0.2, 2, 1.7, 1.9, 1.9, 2.2, 5.5, 4.5, 0].map(
		val => val * size
	)
	let lastP = ps[0]
	ps.forEach((p, i) => {
		p.speed = speeds[i]
		p.angleChange = 0.05
		p.angle = lastP.angleTo(p)
		p.iterations = PI2 / 0.05
	})
	return ps
	// createCurve(ps, {
	// 	strokeStyle: "black",
	// 	speed: args => speeds[args.i],
	// 	dirChange: args => 0.05,
	// 	dir: args => args.ang,
	// 	lineWidth: size * 0.1,
	// 	ticks: 300 * size,
	// 	gco: "darken"
	// })

	ps = []
	ps.push(eyeP)
	ps.push(eyeP.copy().addAngle(0, 1 * size))
	ps.push(eyeP.copy().addAngle(PI, 1 * size))
	return ps
	// createCurve(ps, {
	// 	lineWidth: 5.5 * size,
	// 	strokeStyle: "white",
	// 	speed: args => 0.01 * size,
	// 	dirChange: args => 0.05,
	// 	dir: args => 0,
	// 	tick: 5
	// })
}
