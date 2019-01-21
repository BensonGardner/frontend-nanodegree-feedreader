# Feed Reader Testing

This webpage tests RSS feeds using [Jasmine](http://jasmine.github.io/). 

## The Application

Using the feed reader site should be self-explanatory. Load the index and scroll down to see the results of the Jasmine test suite.

## The Tests

The Jasmine tests:

* check whether the allFeeds variable has been defined, and that it is not empty;

* whether each feed has a URL and name defined and that both properties are not empty;

* that the menu element is hidden by default on page load, and that clicking the menu icon toggles its visibility;

* that when the page loads, there is at least a single .entry element within the .feed container. 

* that when a new feed is loaded, the content of the page changes.

## Credit

Tests created by Benson Gardner as part of a course through Udacity.com.




