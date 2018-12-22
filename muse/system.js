// DeepCodex Muse System

// Router Init - Source: http://joakim.beng.se/blog/posts/a-javascript-router-in-20-lines.html
var routes = {};
function route(path, templateId, controller) {
  routes[path] = { templateId: templateId, controller: controller };
}

// Routes
route('/', 'mainframe', function () {
  this.title = 'Muse Mainframe'
  this.body = 'Linked Codex of various artists/styles/ideas who inspire my artworks'
  this.worlds = {
    india: {
      link: location.pathname.match(/.*(?=\/)/i)[0] + '/#/india',
      img: 'worlds/india/tn.jpg'
    },
    future: {
      link: location.pathname.match(/.*(?=\/)/i)[0] + '/#/future',
      img: 'worlds/future.gif'
    },
    ksbd: {
      link: location.pathname.match(/.*(?=\/)/i)[0] + '/#/ksbd',
      img: 'worlds/ksbd.jpg'
    },
    alchemy: {
      link: location.pathname.match(/.*(?=\/)/i)[0] + '/#/alchemy',
      img: 'worlds/alchemy.jpg'
    },
    champa: {
      link: location.pathname.match(/.*(?=\/)/i)[0] + '/#/champa',
      img: 'worlds/champa/champa.jpg'
    }
  }
});

route('/india', 'artboard', function () {
  this.title = 'India'
  this.body = 'Sources: <a target="_blank" href="https://www.sahapedia.org/">Sahapedia</a> '
  this.worlds = {
    'K.C.S. Panicker': {
      link: location.pathname.match(/.*(?=\/)/i)[0] + '#/india/panicker',
      img: 'worlds/india/panicker.jpg'
    },
    'Architecture': {
      link: location.pathname.match(/.*(?=\/)/i)[0] + '#/india/arch',
      img: 'worlds/india/arch.jpg'
    }
  }
    this.imgs = showcase('india')
});

route('/india/panicker', 'artboard', function () {
  this.title = 'K.C.S Panicker'
  this.body = 'A metaphysical and abstract painter from the 60s and 70s that drew on ancient sources. '
            + '<a target="_blank" href="https://en.wikipedia.org/wiki/K._C._S._Paniker">Wiki</a>'
  this.worlds = 'nil'
  this.imgs = data.india.panicker
});

route('/india/arch', 'artboard', function () {
  this.title = 'Architecture'
  this.body = 'A sampling of the architecture of India'
  this.worlds = 'nil'
  this.imgs = data.india.arch
});

route('/future', 'artboard', function () {
  this.title = 'The Future Is Now'
  this.body = 'Art by <a href="https://ixcitadel.com/">Josan Gonzalez</a>'
  this.worlds = 'nil'
  this.imgs = data.future.gonzalez
});

route('/ksbd', 'artboard', function () {
  this.title = 'Kill Six Billion Demons'
  this.body = 'Art by <a href="https://killsixbilliondemons.com">Abbadon</a>'
  this.worlds = 'nil'
  this.imgs = data.ksbd
});

route('/alchemy', 'artboard', function () {
  this.title = 'Collection of Alchemical Drawings'
  this.body = 'Guide to <a href="https://ultraculture.org/blog/2015/11/13/psychonaut-field-manual/">Chaos Magick</a>'
  this.worlds = 'nil'
  this.imgs = data.alchemy
});

route('/champa', 'artboard', function () {
  this.title = 'Champa'
  this.body = 'Inspiration for my Painting at Longson Mui Ne'
  this.worlds = {
    'temples': {
      link: location.pathname.match(/.*(?=\/)/i)[0] + '#/champa/temples',
      img: 'worlds/champa/temples.jpg'
    },
    'figures': {
      link: location.pathname.match(/.*(?=\/)/i)[0] + '#/champa/figures',
      img: 'worlds/champa/figures.jpg'
    }
  }
  this.imgs = data.champa.mainframe
});

route('/champa/temples', 'artboard', function () {
  this.title = 'Temples'
  this.body = ''
  this.worlds = 'nil'
  this.imgs = data.champa.temples
});

route('/champa/figures', 'artboard', function () {
  this.title = 'Figures'
  this.body = ''
  this.worlds = 'nil'
  this.imgs = data.champa.figures
});

var el = null;
function router () {
  el = el || document.getElementById('view');
  var url = location.hash.slice(1) || '/';
  var route = routes[url];
  if (el && route.controller) { el.innerHTML = tmpl(route.templateId, new route.controller()) }
}
window.addEventListener('hashchange', router);
window.addEventListener('load', router);

// Simple JavaScript Templating by John Resig - https://johnresig.com/ - MIT Licensed

(function() {
    var cache = {}
    this.tmpl = function tmpl(str, data) {
	var fn = !/\W/.test(str) ? cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) :
	    new Function("obj", "var p=[], print = function() { p.push.apply(p, arguments) };with(obj){p.push('" + str
			 .replace(/[\r\t\n]/g, " ")
			 .split("<%").join("\t")
			 .replace(/((^|%>)[^\t]*)'/g, "$1\r")
			 .replace(/\t=(.*?)%>/g, "',$1,'")
			 .split("\t").join("');")
			 .split("%>").join("p.push('")
			 .split("\r").join("\\'")
			 + "');}return p.join('');");
    return data ? fn( data ) : fn;
  };
})();

// Helper functions
function showcase(world) {
  imgs = []
  for (var i = 0; i < Object.keys(data[world.toString()]).length; i++) {
    imgs.push.apply(imgs, data[world.toString()][Object.keys(data.india)[i]])
  }
  return shuffle(imgs).slice(0, 10)
}

function capitalize(word) {
  return word.replace(/^\w/, function (chr) { return chr.toUpperCase() })
}

function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
  return array
}
