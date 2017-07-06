chrome.webRequest.onBeforeSendHeaders.addEventListener(function(details) {
    console.log("starting");
    console.log("working with: "+details.url);
    var newRef = details.url+".html";
    var isRef = false;
    for (var n in details.requestHeaders) {
        isRef = details.requestHeaders[n].name.toLowerCase()=="referer";
        if (isRef) {
            console.log("assigning ref "+newRef);
            details.requestHeaders[n].value = newRef;
            break;
        }
    }
    if (!isRef) {
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
