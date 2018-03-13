const client = algoliasearch('5PHVQPX4AR', '92575152510e5cdaf7a0df17c446d879');
const otherIndex = client.initIndex('help_center_other');
const docsIndex = client.initIndex('help_center_docs_swarm');
const guidesIndex = client.initIndex('help_center_guides');
const discourseIndex = client.initIndex('discourse-posts');

autocomplete('#search-field', {
    hint: false,
    templates: {
        dropdownMenu: "<div class='aa-dataset-other'></div>" +
            "<div class='aa-dataset-docs'></div>"
    },
}, [{
        source: _.debounce(autocomplete.sources.hits(docsIndex, {
            hitsPerPage: 3
        }), 200),
        displayKey: 'title',
        name: 'docs',
        templates: {
            header: '<h2 class="aa-header">Docs</h2>',
            suggestion: function(suggestion) {
                const hasDescription = (suggestion._highlightResult).hasOwnProperty("description");

                return '<h3 class="aa-suggestion-header">' +
                    suggestion._highlightResult.title.value + '</h3>' +
                    '<p class="aa-suggestion-description">' + (hasDescription ? suggestion._highlightResult.description.value : "") + '</p>' +
                    `<span class="icon small u-${suggestion.icon ? suggestion.icon : "documentationIcon"}"></span>`
            },
            empty: "<div class='aa-empty'>No results</div>"
        },
    },
    {
        source: _.debounce(autocomplete.sources.hits(guidesIndex, {
            hitsPerPage: 2
        }), 200),
        displayKey: 'title',
        name: 'guides',
        templates: {
            header: '<h2 class="aa-header">Guides</h2>',
            suggestion: function(suggestion) {
                const hasDescription = (suggestion._highlightResult).hasOwnProperty("description");

                return '<h3 class="aa-suggestion-header">' +
                    suggestion._highlightResult.title.value + '</h3>' +
                    '<p class="aa-suggestion-description">' + (hasDescription ? suggestion._highlightResult.description.value : "") + '</p>' +
                    '<span class="icon u-guidesIcon"></span>'
            },
            empty: "<div class='aa-empty'>No results</div>"
        }
    },
    {
        source: _.debounce(autocomplete.sources.hits(otherIndex, {
            hitsPerPage: 2
        }), 200),
        displayKey: 'title',
        name: 'replicated-other',
        templates: {
            header: '<h2 class="aa-header">Other</h2>',
            suggestion: function(suggestion) {
                const hasDescription = (suggestion._highlightResult).hasOwnProperty("description");
                const hasTitle = (suggestion._highlightResult).hasOwnProperty("title");

                return '<h3 class="aa-suggestion-header">' +
                    (hasTitle ? suggestion._highlightResult.title.value : "") + '</h3>' +
                    '<p class="aa-suggestion-description">' + (hasDescription ? suggestion._highlightResult.description.value : "") + '</p>'
            },
            empty: "<div class='aa-empty'>No results</div>"
        }
    },
    {
        source: _.debounce(autocomplete.sources.hits(discourseIndex, {
            hitsPerPage: 2
        }), 200),
        displayKey: 'title',
        name: 'discourse',
        templates: {
            header: '<h2 class="aa-header">Community</h2>',
            suggestion: function(suggestion) {
                const hasDescription = (suggestion._highlightResult.content).hasOwnProperty("value");
                const title = suggestion._highlightResult.topic.title.value;
                return '<h3 class="aa-suggestion-header">' + title + '</h3>' +
                       '<p class="aa-suggestion-description">' + ( hasDescription ? suggestion._highlightResult.content.value : "") + '</p>'
                       //`<span class="icon small u-${suggestion.icon ? suggestion.icon : "documentationIcon"}"></span>`
            },
            empty: "<div class='aa-empty'>No matching files</div>"
        }
    },
]).on('autocomplete:selected', function(e, suggestion, dataset) {
    // Fix for weird bug that places <em> tags in uri
    window.location.href = dataset === "discourse" ? 
        `https://help.replicated.com/community${suggestion.url}` : window.location.origin + "/" +suggestion._highlightResult.uri.value.replace(/<\/?[^>]+(>|$)/g, "");
}).on('autocomplete:shown', function(e){
    $(this).keypress(function(e) {
        if(e.which === 13) {
           window.location.href = window.location.origin + '/search?q=' + this.value;  
        }
    });
});