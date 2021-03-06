/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    
    describe('RSS Feeds', function() {
        /* This tests to make sure that the allFeeds variable 
         * has been defined and that it is not empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Loop through each feed in the allFeeds object and 
         * ensure it has a URL defined and that the URL is not
         * empty.
         */
        it('contains only defined, non-empty URLs', function() {
            allFeeds.forEach(function(element) {
                var feed = element;
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });     

        /* Loop through each feed in the allFeeds object and
         * ensure it has a name defined and that the name is not 
         * empty.
         */        
         it('contains only defined, non-empty feed names', function() {
            allFeeds.forEach(function(element) {
                var feed = element;
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        }); 
        
    });


    describe('The Menu', function() {
        
        /* Ensure the menu element is hidden by default
         * on page load. 
         * We use "toContain" rather than "toBe" in case 
         * additional classes are added later. 
         */
        it('should be hidden by defaut', function() {
            expect(document.body.className).toContain('menu-hidden');
        });
        
         /* Ensure the menu changes visibility when the menu icon 
          * is clicked. We have two expectations: does the menu 
          * display when clicked and does it hide when clicked 
          * again.
          */
        it('should change visibility on click', function() {
 
            var icon = $('.menu-icon-link');         
            icon.click();
            expect(document.body.className).not.toContain('menu-hidden');
            icon.click();
            expect(document.body.className).toContain('menu-hidden');
        });
        
    });

    describe('Initial Entries', function() {
        /* Ensure that when the loadFeed function is called and completes
         * its work, there is at least a single .entry element within the 
         * .feed container. Because loadFeed() is asynchronous, this test
         * uses Jasmine's beforeEach and asynchronous done() function.
         */ 
        
        beforeEach(function(done) {
           loadFeed(0, done);
        });
        
        it('should contain at least one entry', function() {
            var firstFeedEntry = document.querySelector('.feed').querySelector('.entry');
            expect(firstFeedEntry).not.toBe(null);
        });
    }); 

    describe('New Feed Selection', function() {
        
        /* Ensure that when a new feed is loaded,
         * the content actually changes. Because 
         * loadFeed() is asynchronous, we use beforeEach
         * and done. 
         */
               
        var firstFeed,
            secondFeed;
    
        /* Load a feed, then store the HTML content which is displayed;
         * then load a second feed and store its content separately.
         */
        beforeEach(function(done) {
            loadFeed(1, function() {
                firstFeed = document.getElementsByClassName('feed').item(0).innerHTML;
                loadFeed(0, function() {
                    secondFeed = document.getElementsByClassName('feed').item(0).innerHTML;
                    done(); 
                });
            });
        });
        
        // Teardown: reset DOM to initial load-state.
        afterAll(function() {
            loadFeed(0);
        });
        
        /* Ensure the page content was different depending 
         * on which feed was loaded above.
         */ 
        it('should load new feed', function() {
            expect(firstFeed).not.toEqual(secondFeed);
        });
    });
}());
