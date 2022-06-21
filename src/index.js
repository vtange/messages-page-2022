document.getElementById("nojs-cover").style.display = "none";

function init() {
    let gallery_a = new SimpleLightbox('#artbook-gallery a');
    gallery_a.on('error.simplelightbox', function (e) {
        console.log(e); // some usefull information
    });
}
var root = document.getElementById('cards');
var sky = document.getElementById('sky');
var nplb = document.getElementById('nplb');

var Hello = {
    view: function () {
        return m("section.postcards", data.messages.map(o =>
            m(".postcard",
                m(".border",
                    m(".border-thin",
                        [m(".postcard-header",
                                m(".user-info",
                                    [m("span.user-name", o.name),
                                    (o.twit?m("span.user-twitter", "@"+o.twit):"")])),
                            m(".messages",
                                [m('div[lang="' + (o.isJP ? 'ja' : 'en') + '"]',
                                        m("p", o.msg)),
                                    (o.msg_jp ? m('div[lang="ja"]', m("p", o.msg_jp)) : ""),
                                    (o.art ? m(".msg-art", m('a[href="' + o.art.replace(/\_\./g, ".").replace(/art(.*)\/min/g, "art$1") + '"]', m('img[src="' + o.art + '"][alt=""][title=""]'))) : "")
                                ]
                            )
                        ])))
        ));
    }
}

if (data) {
    m.mount(root, Hello)
}

function toggleMessagesPopup(bool) {
    document.body.classList.toggle("showMessages",bool);
}

function toggleCreditsPopup(bool) {
    document.body.classList.toggle("showCredits",bool);
}

var colors = ["red","orange","yellow","green","aqua","blue","purp"];
// Fireworks stuff
function generateFirework(e){
    var newFireworkCont = document.createElement("div");
    newFireworkCont.className = "firework-"+colors[Math.floor(Math.random()*colors.length)];
    newFireworkCont.style.position = "absolute";
    newFireworkCont.style.top = e.y+"px";
    newFireworkCont.style.left = e.x+"px";
    var newFirework = document.createElement("div");
    newFirework.className = Math.round(Math.random()) ? "firework" : "fireworkwithcolorchange";
    var newUchiage = document.createElement("div");
    newUchiage.className = "uchiage";
    var newSparkle = document.createElement("div");
    newSparkle.className = "sparkle";
    var newSparkle1 = document.createElement("div");
    newSparkle1.className = "sparkle1";
    var newSparkle2 = document.createElement("div");
    newSparkle2.className = "sparkle2";
    newUchiage.appendChild(newSparkle);
    newUchiage.appendChild(newSparkle1);
    newUchiage.appendChild(newSparkle2);
    newFireworkCont.appendChild(newFirework);
    newFireworkCont.appendChild(newUchiage);
    sky.appendChild(newFireworkCont);
    window.setTimeout(function(){
        nplb.style.filter = "brightness(2)";
        resetBrightness();
    },1150);
    window.setTimeout(function(){
        sky.removeChild(newFireworkCont);
    },3000);
}

var resetBrightness = debounce(function(){
    nplb.style.filter = "brightness(1.2)";
},1500);
function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

var windowWidth = window.outerWidth;
var windowHeight = window.outerHeight;
function recalcScreenSize(){
  windowWidth = window.outerWidth;
  windowHeight = window.outerHeight;
}
window.addEventListener("resize", debounce(recalcScreenSize,200));
var lastClick = 1;
// window.setInterval(function(){
// if(Date.now() - lastClick > 5000) {
//     generateFirework({
//         x:Math.random()*windowWidth*.9,
//         y:Math.min(0.5,Math.random())*windowHeight
//     })
// }
// },5000);

sky.addEventListener("click", function(e){
    lastClick = Date.now();
    generateFirework(e);
});