var wasBrowserNavButtonPressed = false;
var lastUrlVisited;

if (Package['iron:router']) {
    initPlugin();
    handleBrowserNavButtonPresses();
} else if (console.warn) {
    console.warn('Package iron:router not installed');
}


function initPlugin() {
    Iron.Router.plugins['reywood:iron-router-scroll'] = function pageScrollPlugin(router) {
        router.onAfterAction(scrollToCorrectPositionWhenReady);
        router.onStop(saveScrollPosition);
    };

    Iron.Router.plugins.pageScroll = function deprecatedPageScrollPlugin(router) {
        console.warn('reywood:iron-router-scroll: Initializing this plugin with the name "pageScroll" ' +
                     'has been deprecated. Please use Router.plugin(\'reywood:iron-router-scroll\') instead.');
        Iron.Router.plugins['reywood:iron-router-scroll'].call(this, router);
    };
}

function handleBrowserNavButtonPresses() {
    $(window).on('popstate', function() {
        wasBrowserNavButtonPressed = true;
    });
}


function scrollToCorrectPositionWhenReady() {
    if (this.ready()) {
        ifUrlHasActuallyChanged(function scrollWhenDomIsReady() {
            deferUntilDomIsReady(function scroll() {
                $('body').scrollTop(getAppropriateScrollPosition());
            });
        });
    }
}

function saveScrollPosition() {
    var urlSessionKey = getCurrentUrlSessionKey();
    var position = $('body').scrollTop();
    Session.set(urlSessionKey, position);
}

function ifUrlHasActuallyChanged(callback) {
    deferUntilWindowLocationUpdated(function() {
        var currentUrl = window.location.href;
        if (currentUrl !== lastUrlVisited) {
            lastUrlVisited = currentUrl;
            callback();
        }
    });
}

function deferUntilWindowLocationUpdated(callback) {
    Meteor.defer(callback);
}

function deferUntilDomIsReady(callback) {
    Tracker.afterFlush(callback);
}

function getAppropriateScrollPosition() {
    if (wasBrowserNavButtonPressed) {
        var urlSessionKey = getCurrentUrlSessionKey();
        var position = Session.get(urlSessionKey) || 0;
        wasBrowserNavButtonPressed = false;
        return position;
    }

    var hash = window.location.hash;
    if (hash && hash.length > 1) {
        hash = hash.substr(1);

        var $anchor = $('a[name="' + hash + '"]');
        if ($anchor.length > 0) {
            return $anchor.offset().top;
        }

        var $element = $('#' + hash);
        if ($element.length > 0) {
            return $element.offset().top;
        }
    }

    return 0;
}

function getCurrentUrlSessionKey() {
    return 'page-scroll-' + normalizeUrl(Router.current().url);
}

function normalizeUrl(url) {
    return url.replace(/^https?:\/\/[^\/]+/, '');
}
