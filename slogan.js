$(function(){
    
    var $slogans = $("p.slogan").find("strong");
    var $holder = $("#holder");
    
    //set via JS so they're visible if JS disabled
    $slogans.parent().css({position : "absolute", top:"0px"});
    
    //settings
    var transitionTime = 0.4;
    var slogansDelayTime = 3;
    var loop = 0;
    //internal
    var totalSlogans = $slogans.length;
    
    var oldSlogan = 0;
    var currentSlogan = -1;
    
    //initialize    
    switchSlogan();
    
    function switchSlogan(){
        
        oldSlogan = currentSlogan;
        var stop = 0;
        if(currentSlogan < totalSlogans-1){
            currentSlogan ++
        } else {
            if (loop) {
                currentSlogan = 0;    
            }else{
                stop = 1;    
            }
            
            
        }
        
        
        if (loop || !stop) {
            TweenLite.to($slogans.eq(oldSlogan), transitionTime, {top:-20, alpha:0, rotationX: 90});
            TweenLite.fromTo($slogans.eq(currentSlogan), transitionTime, {top:20, alpha:0, rotationX: -90 }, {top:0, alpha:1, rotationX:0});
            TweenLite.delayedCall(slogansDelayTime, switchSlogan);
        }
    }
    
});