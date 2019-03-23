var myApp = new Framework7({
    tapHold: false
});
var $$ = Dom7;


$(document).ready(function() {
    $$('.known, .unknown, .notAnalyzed').on('popup:opened', function() {
        reloadWords();
    });
    $("#btnSwitch").change(function() {
        reloadWords();
    });
    reloadWords();
});

function reloadWords() {
    $("#wordList").html("");
    $("#baladWordList").html("");
    $("#nabaladWordList").html("");
    var baladList = getWordList("BALAD");
    var nabaladList = getWordList("NABALAD");

    if (!$("#btnSwitch")[0].checked) {
        $("#wordList").css("direction", "ltr");
        $("#baladWordList").css("direction", "ltr");
        $("#nabaladWordList").css("direction", "ltr");
    }
    else {
        $("#wordList").css("direction", "rtl");
        $("#baladWordList").css("direction", "rtl");
        $("#nabaladWordList").css("direction", "rtl");
    }
    for (var i = 0; i < WORDLIST.length; i++) {
        var isBalad = baladList.includes(WORDLIST[i].id);
        var isNaBalad = nabaladList.includes(WORDLIST[i].id);
        var li = $("<li></li>");
        li.addClass("item-content");
        var div = $("<div></div>");
        div.addClass("item-inner");

        var div1 = $("<div></div>");
        div1.addClass("item-title");
        var key = WORDLIST[i].eng;
        var value = WORDLIST[i].per;
        if (!$("#btnSwitch")[0].checked) {
            div1.html(key);
            div1.data("trans", value);
        }
        else {
            div1.html(value);
            div1.data("trans", key);
        }
        div1.click(function() {
            var trans = $(this).data().trans;
            myApp.alert("", trans);
        });

        var after = $("<div></div>");
        after.addClass("item-after");

        var balad = $("<a/>");
        balad.addClass("button");
        balad.addClass("color-blue");
        balad.addClass("baladButton");
        balad.html("بلدم");
        balad.data("id", WORDLIST[i].id);
        balad.click(function() {
            addWordToLIST($(this).data().id, "BALAD");
            $(this).parent().parent().parent().remove();
        });

        var nabalad = $("<a/>");
        nabalad.addClass("button");
        nabalad.addClass("color-red");
        nabalad.addClass("baladButton");
        nabalad.html("بلد نیستم");
        nabalad.data("id", WORDLIST[i].id);
        nabalad.click(function() {
            addWordToLIST($(this).data().id, "NABALAD");
            $(this).parent().parent().parent().remove();
        });

        if (!isBalad && !isNaBalad) {
            after.append(balad);
            after.append(nabalad);
        }
        else if (isNaBalad) {
            var yad = $("<a/>");
            yad.addClass("button");
            yad.addClass("color-green");
            yad.addClass("baladButton");
            yad.html("یاد گرفتم");
            yad.data("id", WORDLIST[i].id);
            yad.click(function() {
                removeWordFromLIST($(this).data().id, "NABALAD");
                addWordToLIST($(this).data().id, "BALAD");
                $(this).parent().parent().parent().remove();
            });
            after.append(yad);
        } else if (isBalad) {
            var yad = $("<a/>");
            yad.addClass("button");
            yad.addClass("color-red");
            yad.addClass("baladButton");
            yad.html("یادم رفته");
            yad.data("id", WORDLIST[i].id);
            yad.click(function() {
                removeWordFromLIST($(this).data().id, "BALAD");
                addWordToLIST($(this).data().id, "NABALAD");
                $(this).parent().parent().parent().remove();
            });
            after.append(yad);
        }
        div.append(div1);
        div.append(after);
        li.append(div);
        if (isBalad) {
            $("#baladWordList").append(li);
        }
        else if (isNaBalad) {
            $("#nabaladWordList").append(li);
        }
        else {
            $("#wordList").append(li);
        }
    }
}

function addWordToLIST(wordId, listName) {
    var prefix = "ENG_";
    if ($("#btnSwitch")[0].checked) {
        prefix = "FA_";
    }
    var list = JSON.parse(localStorage.getItem(prefix + listName));
    if (list === null) {
        list = [];
    }
    list.push(wordId);
    localStorage.setItem(prefix + listName, JSON.stringify(list));
}
function removeWordFromLIST(wordId, listName) {
    var prefix = "ENG_";
    if ($("#btnSwitch")[0].checked) {
        prefix = "FA_";
    }
    var list = JSON.parse(localStorage.getItem(prefix + listName));
    if (list === null) {
        list = [];
    }
    list = jQuery.grep(list, function(value) {
        return value !== wordId;
    });
    localStorage.setItem(prefix + listName, JSON.stringify(list));
}
function getWordList(listName) {
    var prefix = "ENG_";
    if ($("#btnSwitch")[0].checked) {
        prefix = "FA_";
    }
    var list = JSON.parse(localStorage.getItem(prefix + listName));
    if (list === null) {
        list = [];
    }
    return list;
}