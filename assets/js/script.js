var getEL = function(el) {
    return document.getElementById(el);
};

var acceptsTouch = function() {
    return 'ontouchstart' in document.documentElement;
};

function getStyle(oElm, strCssRule){
    var strValue = "";
    if(document.defaultView && document.defaultView.getComputedStyle){
        strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
    }
    else if(oElm.currentStyle){
        strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1){
            return p1.toUpperCase();
        });
        strValue = oElm.currentStyle[strCssRule];
    }
    return strValue;
}

var drag = function() {
    return {
        move: function(div, xpos, ypos) {
            div.style.top = ypos + "px";

        },
        startMoving: function(div, container, evt) {
            evt = evt || window.event;
            var posX = ((acceptsTouch()) ? evt.touches[0].clientX : evt.clientX),
                posY = ((acceptsTouch()) ? evt.touches[0].clientY : evt.clientY),
                divTop = div.style.top.replace('px', ''),
                divRight = div.style.right.replace('px', ''),
                offsetX = posX - divRight,
                offsetY = posY - divTop;
            if (acceptsTouch()) {
                document.ontouchmove = function(evt) {
                    evt.preventDefault();
                    evt = evt || window.event;
                    var posX = evt.touches[0].clientX,
                        posY = evt.touches[0].clientY,
                        cWidth = getStyle(getEL('container'),'width').replace('px',''),
                        dWidth = getStyle(getEL('slider'),'width').replace('px',''),
                        finalX = posX - offsetX,
                        finalY = posY - offsetY;
                    if (finalX < 0) {finalX = 0;}
                    if (finalY < 0) {finalY = 0;}
                    if(finalX <= cWidth - dWidth - 8){
                        drag.move(div, finalX, finalY);
                    }
                };
            } else {
                document.onmousemove = function(evt) {
                    evt.preventDefault();
                    evt = evt || window.event;
                    var posX = evt.clientX,
                        posY = evt.clientY,
                        cWidth = getStyle(getEL('container'),'width').replace('px',''), 
                        dWidth = getStyle(getEL('slider'),'width').replace('px',''), 
                        finalX = posX - offsetX,
                        finalY = posY - offsetY;
                    if (finalX < 0) {finalX = 0;}
                    if (finalY < 0) {finalY = 0;}
                    if(finalX <= cWidth - dWidth - 8){
                        drag.move(div, finalX, finalY);
                    }
                };
            }

        },
        stopMoving: function(div, container, evt) {
            if (acceptsTouch()) {
                div.style.right = "-30px";
            } else {
                document.getElementById(container).style.cursor = 'default';
                document.onmousemove = function() {};
                div.style.right="-30px";
            }
        },

    };
}();

(function(){
var el = getEL("slider");
if (acceptsTouch()) {
    el.addEventListener('touchstart', function(e) {
        drag.startMoving(this, 'container', event);
    }, false);

    el.addEventListener('touchend', function(e) {
        drag.stopMoving(this, 'container', event);
    }, false);
} else {
    el.addEventListener('mousedown', function(e) {
        drag.startMoving(this, 'container', event);
    }, false);

    el.addEventListener('mouseup', function(e) {
        drag.stopMoving(this, 'container', event);
    }, false);
}
})();


const $ballon = document.querySelector("#ballon");
const $button = document.querySelector("#inner");

let count = 0;
let isAnimation = false;
let finishAnimations = false;
let animationName = '';

$button.addEventListener('click', () => {
  
if (!isAnimation) {
    isAnimation = true;
    if (!finishAnimations) {
      animationName = 'inflate' + count;
      count = count + 1;
    } else {
      finishAnimations = false;
      animationName = 'deflate';
      count = 0;
    }
    $ballon.style.animationName = animationName;
}
  
  
if (!isAnimation && !finishAnimations) {
    isAnimation = true;
    animationName = 'inflate' + count;
    console.log(animationName);
    count = count + 1;
    $ballon.style.animationName = animationName;
  } 
  
});

/* $ballon.addEventListener('animationend', (event) => {
  console.log('animation finished');
  console.log(event.animationName);
  isAnimation = false;
  if (event.animationName === 'inflate3') {
    finishAnimations = true;
    $button.innerHTML = "Deflate";
  } else {
    $button.innerHTML = "Inflate";
  }
}) */