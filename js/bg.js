var bgTicks = 0
var BG_TICKS_MAX = 1000
var BG_STROKES = "rgba(0, 0, 0, 0.5)"
var BG_COLOR = "rgba(255,255,255,1)"
var BG_STROKE_WIDTH = 0.1

function initBg() {
	// cBg.fillStyle = BG_COLOR
	// cBg.fillRect(0, 0, width, height)

	for (let i = 0; i < rndInt(150, 250); i++) {
		renderBgTexture()
	}

	document.body.style.backgroundImage = "url(" + cBg.canvas.toDataURL() + ")"
}
function renderBgTexture() {
	if (bgTicks > BG_TICKS_MAX) {
		return
	}
	bgTicks++
	cBg.fillStyle = "black"
	// cBg.beginPath()
	// cBg.arc(Vec2.middle().x, Vec2.middle().y, 700, 0, PI2)
	// cBg.fill()
	cBg.globalCompositeOperation = "source-over"
	cBg.strokeStyle = BG_STROKES
	cBg.lineWidth = BG_STROKE_WIDTH
	cBg.beginPath()
	for (let i = 0; i < 15; i++) {
		let p = Vec2.random(0, 500, 500)

		cBg.moveTo(p.x + rndInt(-2, 2), p.y + rndInt(-2, 2))
		cBg.lineTo(p.x + rndInt(-2, 2), p.y + rndInt(-2, 2))
	}
	cBg.stroke()
	cBg.closePath()
}
