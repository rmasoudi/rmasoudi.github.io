var myApp = new Framework7({
    tapHold: false,
    popup: {
        closeByBackdropClick: false
    },
    methods: {
        onBackKeyDown: function () {
            if ($('.modal-in').length > 0) {
                myApp.dialog.close();
                myApp.popup.close();
                return false;
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

