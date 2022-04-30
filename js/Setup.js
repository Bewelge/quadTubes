let maxDim = 800
let thePallete =
	Object.keys(colorPalletes)[rndInt(0, Object.keys(colorPalletes).length - 1)]

let width = 1200
let height = 400
let cnv = createCanvas(width, height)
let c = cnv.getContext("2d")
let bgCnv = createCanvas(500, 500)
let cBg = bgCnv.getContext("2d")
var paused = false

document.body.appendChild(cnv)
