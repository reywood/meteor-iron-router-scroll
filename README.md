# iron-router-scroll

Sane default scroll behavior when navigating from page to page with iron:router.

Does it seem odd that when you've scrolled a ways down a page and then clicked a link, the new page doesn't automatically start with the scroll position at the top? This package should fix that. It also has a bit of support for:

* Scrolling to the user's position on the previous page when they hit the browser's "Back" button
* Scrolling to the appropriate `<a name="...">` when there is a hash (`#`) in the URL

## Installing & Using

To install:

```sh
$ meteor add reywood:iron-router-scroll
```

To enable the plugin, you will need to call `Router.plugin('pageScroll');` somewhere amongst your router code.

```javascript
Router.configure({
    ...
});

Router.plugin('pageScroll');

Router.route('/', {
    ...
});
```

--------------------------------------------------------

If you find a bug or would like to see an improvement made, please [file an issue or submit a pull request on GitHub](https://github.com/reywood/meteor-iron-router-scroll/issues).
