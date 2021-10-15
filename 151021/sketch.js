let geodata;
let treeData;
let quadtree = d3.quadtree();
let highlightObj = null;
let backgroundImg;
let stempel = [];

let bounds = {
  left: 8.20782,
  top: 47.094669,
  right: 8.365691,
  bottom: 47.024504,
};


function preload() {
  geodata = loadJSON("lucerne-trees.json");
  backgroundImg = loadImage("luzernalswald.png");
  Floresta = loadFont("FlorestaAfrikaPublicBeta.otf")
  Margin = loadFont("Margin DEMO.otf")
}


function setup() {
  createCanvas(900, 650);
  pixelDensity(3)
  noLoop();

  treeData = geodata.features;

  quadtree
    .x(function (d) {
      return d.geometry.coordinates[0];
    })
    .y(function (d) {
      return d.geometry.coordinates[1];
    })
    .addAll(treeData);
}


function draw() {
  background(218, 164, 172);
  image(backgroundImg, 0, 0, width, height);

  drawTrees;
  
  for (let i = 0; i < stempel.length; i++) {
    let s = stempel[i];
    triangle(s.x - 2, s.y, s.x + 2, s.y, s.x, s.y - 10)
  }

  noStroke();
  fill(238, 103, 40,80)
  triangle(mouseX-6, mouseY, mouseX+6, mouseY, mouseX, mouseY-30)
  fill(222, 37, 0,80)
  triangle(mouseX-6.5, mouseY, mouseX+6.5, mouseY, mouseX, mouseY-30.5)
  fill(255, 150, 62 ,80)
  triangle(mouseX-6.5, mouseY, mouseX+6.5, mouseY, mouseX, mouseY-23)

  //text
  textFont(Floresta);
  textSize(70);
  strokeWeight(0.5)
  fill(3, 111, 0, 90);
  text('LUZERN ALS WALD', 42, 65)
  text('LUZERN ALS WALD', 42, 65)
  text('LUZERN ALS WALD', 42, 65)
  textSize(10);
  
  fill(50, 111, 0);
  text('bäume gepflanzt: '+ stempel.length, 710, 640)
  
}


function mouseMoved() {
  let lon = map(mouseX, 0, width, bounds.left, bounds.right);
  let lat = map(mouseY, 0, height, bounds.top, bounds.bottom);
  highlightObj = quadtree.find(lon, lat);
  redraw();
}


function mouseClicked() {
  stempel.push({
      x: mouseX,
      y: mouseY
  })
  fill(3, 111, 0, 90);
  triangle(mouseX-2, mouseY, mouseX+2, mouseY, mouseX, mouseY-10)
  triangle(mouseX-2.5, mouseY, mouseX+2.5, mouseY, mouseX, mouseY-10.5)
  triangle(mouseX-1.5, mouseY, mouseX+1.5, mouseY, mouseX, mouseY-9.5)

  console.log(stempel)
}


function keyTyped() {
  saveCanvas("tree_background", "png");
}


function drawTrees() {
  for (let i = 0; i < treeData.length; i++) {
    let treeObject = treeData[i];
    let geometry = treeObject.geometry;
    let properties = treeObject.properties;
    let coordinates = geometry.coordinates;
    let lat = coordinates[1];
    let lon = coordinates[0];

    let x = map(lon, bounds.left, bounds.right, 0, width);
    let y = map(lat, bounds.top, bounds.bottom, 0, height);

  

    // strokeWeight(0.1)
    // fill('pink');
    // ellipse(x, y, 10, 10);
    // ellipse(x, y, 5, 5);
    // ellipse(x, y, 3, 3);
  }
}


// function drawTrees() {
//   if (highlightObj) {
//     let lon = highlightObj.geometry.coordinates[0];
//     let lat = highlightObj.geometry.coordinates[1];
//     let x = map(lon, bounds.left, bounds.right, 0, width);
//     let y = map(lat, bounds.top, bounds.bottom, 0, height);
//     stroke(0);
//     strokeWeight(0.5);
//     noFill();

//     triangle(x - 2, y, x + 2, y, x, y - 10)
    // ellipse (x,y,5,5);
    // line(x,y,mouseX,mouseY)


    // let hoehe = highlightObj.properties.BAUMHOEHE;
    // let gattung = highlightObj.properties.GATTUNG;

    // textFont(Floresta)
    // textSize(15)
    // text('baum NR ' + gattung + ' befindet sich:'+"\n" + lon.toString() + "\n" + lat.toString(), mouseX+10, mouseY)

    // fill(255,10)
    // noStroke()
    // rect(mouseX+5, mouseY-18, 260, 70)
    // rect(mouseX+3, mouseY-17, 259, 69)
    // rect(mouseX+4, mouseY-16, 258, 68)

