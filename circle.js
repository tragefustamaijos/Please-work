var canvas = document.createElement("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;
var c = canvas.getContext("2d");
document.body.insertBefore(canvas, document.body.firstChild);
const maxRadius = 70;
const proximity = 100;
var colorArray = [
    '#1A2E40',
    '#426A8C',
    '#88AABF',
    '#403E26',
    '#8C855E'
]

var Mouse = {
    x : undefined,
    y : undefined 
}

window.addEventListener('mousemove', function(event)
{
    Mouse.x = event.x;
    Mouse.y = event.y;
})
function rand(min, max)
{
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function Circle(x, y, radius)
{
    this.color = colorArray[rand(0, colorArray.length-1)];
    this.dx = rand(-2, 2);
    this.dy = rand(-2, 2);
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.originalRadius = radius;
    this.update = function()
    {
        if(Math.abs(this.x - Mouse.x) < proximity && Math.abs(this.y - Mouse.y) < proximity)
            {if(this.radius < maxRadius)
                this.radius++;
            }
        else
            if(this.radius > this.originalRadius)
            this.radius--;

        if(this.x + this.radius > innerWidth || this.x - this.radius < 0)
            this.dx = -this.dx;

        if(this.y + this.radius > innerHeight || this.y - this.radius < 0)
            this.dy = -this.dy;
        
        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
    this.draw = function()
    {
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fill()
    }
}
var circleArray = [];
for(var i=0; i<1000; i++)
{
    var radius = rand(2, 7);
    var x = rand(radius, innerWidth-radius);
    var y = rand(radius, innerHeight - radius);
    circleArray.push(new Circle(x, y, radius));
}

function animate()
{
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    for(i = 0; i<circleArray.length; i++)
    {var cerc = circleArray[i]
        cerc.update();
    }
}
animate();
