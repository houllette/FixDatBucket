chrome.webRequest.onBeforeSendHeaders.addEventListener(function(details) {
    var newRef = details.url+".html";
    var gotRef = false;
    for (var n in details.requestHeaders) {
        gotRef = details.requestHeaders[n].name.toLowerCase()=="referer";
        if (gotRef) {
            details.requestHeaders[n].value = newRef;
            break;
        }
    }
    if (!gotRef) {
        details.requestHeaders.push({name:"Referer",value:newRef});
    }
    return {
        requestHeaders:details.requestHeaders
    };
},{
    urls:["http://*.photobucket.com/*"],
    types: ["image"]
},[
    "requestHeaders",
    "blocking"
]);
