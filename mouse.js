window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame;

var c = document.getElementById("canvas-club");
var w = c.width = window.innerWidth;
var h = c.height = window.innerHeight;
var ctx = c.getContext("2d");
var maxParticles = 100;
var particles = [];
var speed = .8;
var preview = true;

var clearColor = "rgba(0, 0, 0, .2)";
var mouse = {
    x: w/2,
    y: h/2
};

function P(){}

P.prototype = {
    init: function(){
        this.size = 10;
        this.x = mouse.x;
        this.y = mouse.y;
        this.follow = null;
    },
    
    draw: function(){
        ctx.strokeStyle = "hsla("+this.x+", 100%, 50%, .6)";
        ctx.fillStyle = "hsla("+this.x+", 100%, 50%, 1)";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        ctx.closePath();
        ctx.lineWidth = 5;
        ctx.stroke();
        this.update();
    },
    
    update: function(){
        if(!this.follow){
            var dx = mouse.x - this.x;
            var dy = mouse.y - this.y;
        } else {
            var dx = this.follow.x - this.x;
            var dy = this.follow.y - this.y;
        }
        
        if(Math.abs(dx) <= 1 && Math.abs(dy) <= 1){
//          ctx.fill();
        } else {
            this.x += (dx * speed);
            this.y += (dy * speed);
        }
        
    }
}

window.addEventListener("mousemove", function(e){
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    preview = false;
})

window.addEventListener("touchstart", touches);

window.addEventListener("touchmove", touches)

function touches(e) {
    var touches = e.touches;
    mouse.x = touches[0].clientX;
    mouse.y = touches[0].clientY;
    e.preventDefault();
    preview = false;
}

function setup(){
    for(var i=1; i<=maxParticles; i++) {
        setTimeout(function(){
            var p = new P();
            p.init();
            particles.push(p);
        }, i * 1)
        
    }
    
    // fake move mouse around for preview
    setTimeout(function(){
        if(preview){
            mouse.x = Math.random() * w;
            mouse.y = Math.random() * h;
            setTimeout(function(){
                if(preview){
                    mouse.x = Math.random() * w;
                    mouse.y = Math.random() * h;
                        setTimeout(function(){
                        mouse.x = Math.random() * w;
                        mouse.y = Math.random() * h;
                    }, 1000);
                }
            }, 1000);
        }
        
    }, 1000);
    // end preview
    
    anim();
}



function anim(){
    ctx.fillStyle = clearColor;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillRect(0,0,w, h);
    var follow = {
        x: mouse.x,
        y: mouse.y
    }
    for(var i in particles){
        var p = particles[i];
        p.follow = follow;
        p.draw();
        follow.x = p.x;
        follow.y = p.y;
    }
    requestAnimationFrame(anim);
}





setup();