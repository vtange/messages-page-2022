document.getElementById("nojs-cover").style.display = "none";

function init() {
    let gallery_a = new SimpleLightbox('#artbook-gallery a');
    gallery_a.on('error.simplelightbox', function (e) {
        console.log(e); // some usefull information
    });
}
var root = document.getElementById('cards');

var count = 0 // added a variable

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