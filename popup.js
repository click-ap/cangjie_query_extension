
debugger;






document.addEventListener('DOMContentLoaded', function () {
    //dumpBookmarks();
    debugger;
    document.querySelector('input[type=submit]').addEventListener('click',
        function () {
            //chrome.tabs.create({
            //    'url':'https://chrome.google.com/webstore',
            //    'selected':true
            //});
            //window.close();
            debugger;
            var form = document.querySelector('form');
            //form.setAttribute("target", "_parent");
            form.method = 'post';
            form.action = 'http://input.foruto.com/cjdict/Search_1.php';
            //form.setAttribute("target", "_blank");
            form.submit();
        });

});