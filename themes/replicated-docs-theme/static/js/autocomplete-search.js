const client = algoliasearch('5PHVQPX4AR', '92575152510e5cdaf7a0df17c446d879');
const otherIndex = client.initIndex('help_center_other');
const docsIndex = client.initIndex('help_center_docs');
const guidesIndex = client.initIndex('help_center_guides');

// Autocomplete search bar
autocomplete('#autocompletesearch-box', {
    hint: false,
    templates: {
        dropdownMenu: "<div class='aa-dataset-other'></div>" +
            "<div class='aa-dataset-docs'></div>"
    }
}, [{
        source: autocomplete.sources.hits(docsIndex, {
            hitsPerPage: 5
        }),
        displayKey: 'title',
        name: 'docs',
        templates: {
            header: '<h2 class="aa-header">Docs</h2>',
            suggestion: function(suggestion) {
                const hasDescription = (suggestion._highlightResult).hasOwnProperty("description");

                return '<h3 class="aa-suggestion-header">' +
                    suggestion._highlightResult.title.value + '</h3>' +
                    '<p class="aa-suggestion-description">' + (hasDescription ? suggestion._highlightResult.description.value : "") + '</p>' +
                    '<span class="icon u-documentationIcon"></span>'
            }
        },
        empty: "<div class='aa-empty'>No matching files</div>"
    },
    {
        source: autocomplete.sources.hits(guidesIndex, {
            hitsPerPage: 5
        }),
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
            }
        },
        empty: "<div class='aa-empty'>No matching files</div>"
    },
    {
        source: autocomplete.sources.hits(otherIndex, {
            hitsPerPage: 5
        }),
        displayKey: 'title',
        name: 'other',
        templates: {
            header: '<h2 class="aa-header">Other</h2>',
            suggestion: function(suggestion) {
                const hasDescription = (suggestion._highlightResult).hasOwnProperty("description");
                const hasTitle = (suggestion._highlightResult).hasOwnProperty("title");

                return '<h3 class="aa-suggestion-header">' +
                    (hasTitle ? suggestion._highlightResult.title.value : "") + '</h3>' +
                    '<p class="aa-suggestion-description">' + (hasDescription ? suggestion._highlightResult.description.value : "") + '</p>'
            }
        },
        empty: "<div class='aa-empty'>No matching files</div>"
    }
]).on('autocomplete:selected', function(e, suggestion, dataset) {
    // Fix for weird bug that places <em> tags in uri
    window.location.href = suggestion._highlightResult.uri.value.replace(/<\/?[^>]+(>|$)/g, "");
});