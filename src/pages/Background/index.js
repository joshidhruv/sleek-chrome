console.log('This is the background page.');
console.log('Put the background scripts here.');


// var rule1 = {
//     conditions: [
//         new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: { hostEquals: 'www.google.com', schemes: ['https'] },
//             css: ["input[type='password']"]
//         })
//     ],
//     actions: [new chrome.declarativeContent.ShowPageAction()]
// };
// var rule2 = {
//     conditions: [
//         new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: { hostEquals: 'www.google.com', schemes: ['https'] },
//             css: ["input[type='password']"]
//         }),
//         new chrome.declarativeContent.PageStateMatcher({
//             css: ["video"]
//         })
//     ],
//     actions: [new chrome.declarativeContent.ShowPageAction()]
// };


// chrome.runtime.onInstalled.addListener(function (details) {
//     chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
//         chrome.declarativeContent.onPageChanged.addRules([rule2]);
//     });
// });
// function sendCurrentUrl() {
//     chrome.tabs.query(null, function (tab) {
//         var tablink = tab.url
//         console.log(tablink)
//     })
chrome.tabs.getCurrent((d) => {
    console.log(d)
})
chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
    function (tabs) {
        console.log("I am Here", tabs)
        // alert(tabs[0].url);
    }
);
chrome.runtime.onInstalled.addListener(async () => {

    // While we could have used `let url = "hello.html"`, using runtime.getURL is a bit more robust as
    // it returns a full URL rather than just a path that Chrome needs to be resolved contextually at
    // runtime.

    let url = chrome.runtime.getURL("hello.html");


    // Open a new tab pointing at our page's URL using JavaScript's object initializer shorthand.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer#new_notations_in_ecmascript_2015
    //
    // Many of the extension platform's APIs are asynchronous and can either take a callback argument
    // or return a promise. Since we're inside an async function, we can await the resolution of the
    // promise returned by the tabs.create call. See the following link for more info on async/await.
    // https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await
    let tab = await chrome.tabs.create({ url });

    // Finally, let's log the ID of the newly created tab using a template literal.
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
    //
    // To view this log message, open chrome://extensions, find "Hello, World!", and click the
    // "service worker" link in th card to open DevTools.
    console.log(`Created tab ${tab.id}`);
    chrome.declarativeContent.onPageChanged.removeRules(undefined, () => {
        // Declare a rule to enable the action on example.com pages
        let exampleRule = {
            conditions: [
                new chrome.declarativeContent.PageStateMatcher({
                    pageUrl: { hostSuffix: '.google.com' },
                })
            ],
            actions: [new chrome.declarativeContent.ShowAction()],
        };
        console.log({ exampleRule })
        // Finally, apply our new array of rules
        let rules = [exampleRule];
        console.log({ rules })
        chrome.declarativeContent.onPageChanged.addRules(rules);
    })
});
