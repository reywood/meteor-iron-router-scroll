# iron-router-scroll

Sane default scroll behavior when navigating from page to page with iron:router.

Does it seem odd that when you've scrolled a ways down a page and then clicked a link, the new page doesn't automatically start with the scroll position at the top? This package should fix that. It also has a bit of support for:

* Scrolling to the user's position on the previous page when they hit the browser's "Back" button
* Scrolling to the appropriate `<a name="...">` when there is a hash (`#`) in the URL
