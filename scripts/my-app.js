history.pushState(null, null, window.top.location.pathname + window.top.location.search);
window.addEventListener('popstate', () => {
    if ($('.modal-in').length == 0) {
        myApp.confirm('آیا اطمینان دارید؟', "خروج", function () {
            navigator.app.clearHistory(); navigator.app.exitApp();
        });
    }
    else {
        myApp.closeModal();
    }
    history.pushState(null, null, window.top.location.pathname + window.top.location.search);
});
myApp = new Framework7({
    tapHold: false,
    pushState: true,
    popup: {
        closeByBackdropClick: false
    },
    methods: {
        onBackKeyDown: function () {
            var leftp = myApp.panel.left && myApp.panel.left.opened;
            var rightp = myApp.panel.right && myApp.panel.right.opened;
            if (leftp || rightp) {
                myApp.panel.close();
                return false;
            } else if ($('.modal-in').length > 0) {
                myApp.dialog.close();
                return false;
            } else if (myApp.views.main.router.url == '/') {
                myApp.dialog.confirm('Are you sure you want to exit?', 'Exit MyApp', function () {
                    navigator.app.exitApp();
                },
                    function () {
                    });
            } else {
                mainView.router.back();
            }
        }
    }
});
var $$ = Dom7;


$(document).ready(function () {
    $("#btnWordMore").click(function () {
        var nextIndex = $("#wordList li").length;
        var items = getNotAnalyzedList(nextIndex, 20);
        for (var i = 0; i < items.length; i++) {
            $('#wordList').append(getListItem(items[i], false, false));
        }
    });
    $("#btnBaladMore").click(function () {
        var nextIndex = $("#baladWordList li").length;
        var items = getBaladList(nextIndex, 20);
        for (var i = 0; i < items.length; i++) {
            $('#baladWordList').append(getListItem(items[i], true, false));
        }
    });
    $("#btnNaBaladMore").click(function () {
        var nextIndex = $("#nabaladWordList li").length;
        var items = getNaBaladList(nextIndex, 20);
        for (var i = 0; i < items.length; i++) {
            $('#nabaladWordList').append(getListItem(items[i], false, true));
        }
    });
    $$('.notAnalyzed').on('popup:opened', function () {
        loadInitialItems();
    });
    $$('.known').on('popup:opened', function () {
        loadBaladItems();
    });
    $$('.unknown').on('popup:opened', function () {
        loadNaBaladItems();
    });
    // $("#btnSwitch").change(function() {
    //     reloadWords();
    // });
    // reloadWords();
});

