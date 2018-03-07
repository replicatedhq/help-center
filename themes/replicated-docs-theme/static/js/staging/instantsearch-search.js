const otherSearch = instantsearch({
    appId: '5PHVQPX4AR',
    apiKey: '92575152510e5cdaf7a0df17c446d879',
    indexName: 'help_center_staging_other', 
    urlSync: true
});

const docsSearch = instantsearch({
    appId: '5PHVQPX4AR',
    apiKey: '92575152510e5cdaf7a0df17c446d879',
    indexName: 'help_center_staging_docs',
    urlSync: true
});

const discourseSearch = instantsearch({
    appId: '5PHVQPX4AR',
    apiKey: '92575152510e5cdaf7a0df17c446d879',
    indexName: 'discourse-posts',
    urlSync: true
});

const searchBox = instantsearch.widgets.searchBox({
    container: '#instantsearch-box'
});

docsSearch.addWidget(searchBox);
otherSearch.addWidget(searchBox);
discourseSearch.addWidget(searchBox);

// NOTE: The hitsperPage option is only available in v1 of instantSearch (currently using)
docsSearch.addWidget(
    instantsearch.widgets.hits({
        container: '#docs-hits',
        hitsPerPage: 10,
        templates: {
            item: function(suggestion) {
                const hasDescription = (suggestion._highlightResult).hasOwnProperty("description");

                return '<div class="wrapper" id="docs-wrapper" data-href="' + suggestion._highlightResult.uri.value + '" >' + '<h3>' +  suggestion._highlightResult.title.value.replace(/<\/?[^>]+(>|$)/g, "") + '</h3>' + 
                '<p>'+ (hasDescription ? suggestion._highlightResult.description.value : "") + '</p>' +
                `<span class="icon small u-${suggestion.icon ? suggestion.icon : "documentationIcon"}"></span>`
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

                return '<div class="wrapper" id="other-wrapper" data-href="' + suggestion._highlightResult.uri.value + '" >' + '<h3>' +  suggestion._highlightResult.title.value.replace(/<\/?[^>]+(>|$)/g, "") + '</h3>' + 
                '<p>'+ (hasDescription ? suggestion._highlightResult.description.value : "") + '</p>' + '</div>'
            }
        }    
    })
);

discourseSearch.addWidget(
    instantsearch.widgets.hits({
        container: '#discourse-hits',
        hitsPerPage: 5,
        templates: {
            item: function(suggestion) {
                const hasDescription = (suggestion._highlightResult.content).hasOwnProperty("value");
                const title = suggestion._highlightResult.topic.title.value;

                return '<div class="wrapper" id="discourse-wrapper" data-href="' + suggestion.url + '" >' + '<h3>' +  title.replace(/<\/?[^>]+(>|$)/g, "") + '</h3>' + 
                '<p>'+ (hasDescription ? suggestion._highlightResult.content.value : "") + '</p>' + '</div>'
            }
        }    
    })
);

const renderHandler = function() {
    const resultCount = document.getElementById("result-count");
    const docsCount = document.getElementById("docs-count");
    const otherCount = document.getElementById("other-count");
    const discourseCount = document.getElementById("discourse-count");
    const searchMade = document.getElementById("search-made");

    const searchBoxValue = document.getElementById("instantsearch-box").value;
    const items = document.getElementsByClassName('ais-hits--item');
    const docsItems = document.getElementById("docs-hits").getElementsByTagName("div");
    const otherItems = document.getElementById("other-hits").getElementsByTagName("div");
    const discourseItems = document.getElementById("discourse-hits").getElementsByTagName("div");

    docsCount.innerHTML = getNumberOfHits(docsItems);
    otherCount.innerHTML = getNumberOfHits(otherItems);
    discourseCount.innerHTML = getNumberOfHits(discourseItems); 

    resultCount.innerHTML = items.length;

    for(item of items) {
        item.addEventListener('click', itemClickHandler, false);
    }
    
    if(searchBoxValue !== "") {
        searchMade.innerHTML = "for " + autocomplete.escapeHighlightedString(searchBoxValue);
    } else {
        searchMade.innerHTML = "";
    }
}

const itemClickHandler = function(e) {
    const pathDiv = this.firstChild;
    const path = pathDiv.getAttribute("data-href");
    const id = pathDiv.getAttribute("id");
    const isDiscourse = id.includes("discourse-wrapper");

    window.location.href = isDiscourse ? 
        'https://help.replicated.com/community' + path.replace(/<\/?[^>]+(>|$)/g, "") : 
        window.location.origin + '/' + path.replace(/<\/?[^>]+(>|$)/g, "");
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
discourseSearch.once('render', renderHandler);

otherSearch.start();
docsSearch.start();
discourseSearch.start();
