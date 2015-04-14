var wasBrowserNavButtonPressed = false;

if (Package['iron:router']) {
    initPlugin();
    handleBrowserNavButtonPresses();
} else if (console.warn) {
    console.warn('Package iron:router not installed');
}


function initPlugin() {
    Iron.Router.plugins.pageScroll = function pageScrollPlugin(router) {
        router.onAfterAction(scrollToCorrectPosition);
        router.onStop(saveScrollPosition);
    };
}

function handleBrowserNavButtonPresses() {
    $(window).on('popstate', function() {
        wasBrowserNavButtonPressed = true;
    });
}


function scrollToCorrectPosition() {
    if (this.ready()) {
        deferUntilDomIsReady(function () {
            var position = getAppropriateScrollPosition();
            $('body').scrollTop(position);
        });
    }
}

function saveScrollPosition() {
    var urlSessionKey = getCurrentUrlSessionKey();
    var position = $('body').scrollTop();
    Session.set(urlSessionKey, position);
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
    }

    return 0;
}

function getCurrentUrlSessionKey() {
    return 'page-scroll-' + normalizeUrl(Router.current().url);
}

function normalizeUrl(url) {
    return url.replace(/^https?:\/\/[^\/]+/, '');
}
