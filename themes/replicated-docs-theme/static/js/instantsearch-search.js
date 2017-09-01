const otherSearch = instantsearch({
    appId: '5PHVQPX4AR',
    apiKey: '92575152510e5cdaf7a0df17c446d879',
    indexName: 'help_center_other', 
});

const docsSearch = instantsearch({
    appId: '5PHVQPX4AR',
    apiKey: '92575152510e5cdaf7a0df17c446d879',
    indexName: 'help_center_docs',
});

const searchBox = instantsearch.widgets.searchBox({
    container: '#instantsearch-box'
});

docsSearch.addWidget(searchBox);
otherSearch.addWidget(searchBox);

// NOTE: The hitsperPage option is only available in v1 of instantSearch (currently using)
docsSearch.addWidget(
    instantsearch.widgets.hits({
        container: '#docs-hits',
        hitsPerPage: 10,
        templates: {
            item: function(suggestion) {
                const hasDescription = (suggestion._highlightResult).hasOwnProperty("description");

                return '<div class="wrapper" data-href="' + suggestion._highlightResult.uri.value + '" >' + '<h3>' +  suggestion._highlightResult.title.value.replace(/<\/?[^>]+(>|$)/g, "") + '</h3>' + 
                '<p>'+ (hasDescription ? suggestion._highlightResult.description.value : "") + '</p>' +
                 '<span class="icon u-documentationIcon"></span>' + '</div>' 
            }
        }
    })
);

otherSearch.addWidget(
    instantsearch.widgets.hits({
        container: '#other-hits',
        hitsPerPage: 5,
        templates: {
            item: function(suggestion) {
                const hasDescription = (suggestion._highlightResult).hasOwnProperty("description");

                return '<div class="wrapper" data-href="' + suggestion._highlightResult.uri.value + '" >' + '<h3>' +  suggestion._highlightResult.title.value.replace(/<\/?[^>]+(>|$)/g, "") + '</h3>' + 
                '<p>'+ (hasDescription ? suggestion._highlightResult.description.value : "") + '</p>' + '</div>'
            }
        }    
    })
);

const renderHandler = function() {
    const resultCount = document.getElementById("result-count");
    const docsCount = document.getElementById("docs-count");
    const otherCount = document.getElementById("other-count");
    const searchMade = document.getElementById("search-made")

    const searchBoxValue = document.getElementById("instantsearch-box").value;
    const items = document.getElementsByClassName('ais-hits--item');
    const docsItems = document.getElementById("docs-hits").getElementsByTagName("div");
    const otherItems = document.getElementById("other-hits").getElementsByTagName("div");

    docsCount.innerHTML = getNumberOfHits(docsItems);
    otherCount.innerHTML = getNumberOfHits(otherItems);

    resultCount.innerHTML = items.length;

    for(item of items) {
        item.addEventListener('click', itemClickHandler, false);
    }
    
    if(searchBoxValue !== "") {
        searchMade.innerHTML = "for " + searchBoxValue;
    } else {
        searchMade.innerHTML = "";
    }
}

const itemClickHandler = function(e) {
    const pathDiv = this.firstChild;
    const path = pathDiv.getAttribute("data-href");

    window.location.href = window.location.origin + '/' + path.replace(/<\/?[^>]+(>|$)/g, "");
}

const getNumberOfHits = function(items) {
    let count = 0;
    for (item of items) {
        if(item.getAttribute('class') == "ais-hits--item") {
            count++;
        }
    }
    
    return count;
}

// Only need to listen for both once, then items can be
// counted on one index search
docsSearch.on('render', renderHandler);
otherSearch.once('render', renderHandler);

otherSearch.start();
docsSearch.start();