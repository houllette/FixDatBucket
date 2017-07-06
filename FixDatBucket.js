var requestFilter = {
    urls: [ "<all_urls>" ]
  },
  extraInfoSpec = ['requestHeaders','blocking'],
  handler = function( details ) {
    var headers = details.requestHeaders, blockingResponse = {};

    for( var i = 0, l = headers.length; i < l; ++i ) {
      if( headers[i].name == 'Referer' ) {
        var url = details.url;
        var search = url.search(/photobucket/i);
        if (search != -1) {
          headers[i].value = url+".html";
          alert(headers[i].value);
        }
        break;
      }
    }

    blockingResponse.requestHeaders = headers;
    return blockingResponse;
  };

chrome.webRequest.onBeforeSendHeaders.addListener( handler, requestFilter, extraInfoSpec );
