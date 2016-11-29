var increase = true,
    i = 0,
    max = 6,
    last = false;

function inc() {
  var el = document.querySelectorAll('.inner' + i),
      length = el.length;
  
  i++;

  for (var k = 0; k < el.length; k++) {
    var node = document.createElement('div');
    
    node.classList.add('inner', 'inner' + i);
    
    el[k].appendChild(node);
  }

  if (i == max) {
    increase = false;
  }
}

function dec() {
  var el = document.querySelectorAll('.inner' + i),
      length = el.length;

  for (var k = 0; k < length; k++) {
    el[k].classList.add('hide');

    (function(k){
      setTimeout(function() {
        el[k].parentElement.removeChild(el[k]);
      }, 500);
    })(k);
  }

  i--;

  if (i == 0) {
    increase = true;
    last = true;
  }
}

function call() {
  setTimeout(function() {
    if (increase) {
      inc();
    } else {
      dec();
    }
    call();
  }, Math.floor(Math.random() * (3000 - 1000 + 1) + 1000));
}

setTimeout(function() {
  call();
}, 9000);