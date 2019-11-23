// A generic onclick callback function.
function genericOnClick(info, tab) {
    //console.log("item " + info.menuItemId + " was clicked"); ("info: " + JSON.stringify(info));("tab: " + JSON.stringify(tab));
    //console.log(info.selectionText);
    var str = info.selectionText;
    if (typeof str == 'undefined' || !str || str.length === 0 || str === "" || !/[^\s]/.test(str) || /^\s*$/.test(str) || str.replace(/\s/g,"") === "") {
        var popup_width = 680 || screen.width - parseInt(screen.width / 2);
        var popup_height = 480 || screen.height - parseInt(screen.height / 2);
        chrome.windows.create({
            url: 'popup.html',
            type: 'popup',
            width: popup_width,
            height: popup_height,
            top: parseInt((screen.height / 2) - (popup_height / 2)),
            left: parseInt((screen.width / 2) - (popup_width / 2)),
            focused: true
        });
    }
    else {
      searchCangjie(info.selectionText.charAt(0));
    }
}

function searchCangjie(char){ 
    // http://input.foruto.com/cjdict/Search_1.php?Hanzi=劉
    var searchObj = {
        Step: 'DoSearch',
        Hanzi: char
    };
    // 'Hanzi': '劉''%BCB'
    post('http://input.foruto.com/cjdict/Search_1.php', searchObj, 'post');
}

getSelection(function(tx) { 
  var title = "Test '" + tx + "' menu item";
  var id = chrome.contextMenus.create({"title": title, "contexts":["selection"],
                                      "onclick": sendSearch(tx)});
  console.log("selection item:" + id);
})


chrome.contextMenus.create({
  title: "查詢 '%s' 倉頡字根(取第1個字)", 
  contexts:["selection"], 
  onclick: function(info, tab) {
    searchCangjie(info.selectionText.charAt(0));
  }
});
// Create one test item for each context type.
// ["page", "selection", "link", "editable", "image", "video", "audio"];
var contexts = ["page", "editable"];
for (var i = 0; i < contexts.length; i++) {
  var context = contexts[i];
  var title = "開啟倉頡字根查詢";
  debugger;
  var id = chrome.contextMenus.create({"title": title, "contexts":[context], "onclick": genericOnClick});
  //console.log("'" + context + "' item:" + id);
}

/**
 * sends a request to the specified url from a form. this will change the window location.
 * @param {string} path the path to send the post request to
 * @param {object} params the paramiters to add to the url
 * @param {string} [method=post] the method to use on the form
 */
function post(path, params, method='post') {
    // The rest of this code assumes you are not using a library. It can be made less wordy if you use one.
    const form = document.createElement('form');
    form.method = method;
    form.action = path;
    form.setAttribute("target", "_blank");
    //form.setAttribute("enctype", "application/x-www-form-urlencoded");
    form.setAttribute("accept", "BIG5");
    form.setAttribute("accept-charset", "BIG5");
  
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const inputField = document.createElement('input');
        inputField.type = 'hidden';
        inputField.name = key;
        inputField.value = params[key];
        form.appendChild(inputField);
      }
    }
  
    document.body.appendChild(form);
    form.submit();
  }