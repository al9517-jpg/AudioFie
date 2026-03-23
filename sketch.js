let s, ft, img
let rot = 0
let part = []

function preload(){
  s = loadSound('Two_Birds.mp3')
  img = loadImage('Ding.png')
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES)
  ft = new p5.FFT()
  imageMode(CENTER)
}

function draw() {
  
  background(0);
  stroke(255)
  noFill()
  
  let Stereo = new disc()
  Stereo.draw()
  
  let w = ft.waveform()
  
  for(let t=-1; t<=1; t+=2){
    beginShape()
  for(let i=0; i<=180; i+= 0.5){
    let j = floor(map(i, 0, 180, 0, w.length-1))
    let r = map(w[j], -1, 1, 150, 350)
    let x = r*sin(i) * t
    let y = r*cos(i)
    vertex(x, y)
  }
  endShape()
  }
  
  let p = new ball()
  part.push(p)
  
  
  for(let i=part.length; i>=0; i--){
    //if(!part[i].edges()){
      //part[i].update()
      //part[i].show()
    //}
    part.splice(i,1)
  }
}

function mouseClicked(){
  if(s.isPlaying()){
    s.pause()
    noLoop()
  }
  else{
    s.play()
    loop()
  }
}

class ball{
  constructor(){
    this.p = p5.Vector.random2D().mult(250)
    this.v = createVector(0, 0)
    this.a = this.p.copy().mult(random(0.0001, 0.00001))
    this.w = random(3, 5)
    this.col = [random(200, 255), random(200, 255), random(200, 255)]
  }
  update(){
    this.v.add(this.a)
    this.p.add(this.v)
  }
  edges(){
    if(this.p.x<-width/2 || this.p.x>width/2 || this.p.y<-height/2 || this.p.y>height/2){
      return true
    }
    else{
      return false
    }
  }
  show(){
    noStroke()
    fill(this.col)
    ellipse(this.p.x, this.p.y, this.w)
  }
}

class disc{
  constructor()
  {

  }
  
  draw(){
    translate(width/2,height/2)
    push()
    rotate(rot)
    image(img, 0, 0, 400, 400)
    pop()
    rot +=1
  }
}