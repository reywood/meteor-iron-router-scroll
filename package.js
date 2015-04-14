Package.describe({
    name: 'reywood:iron-router-scroll',
    summary: 'Expected scroll functionality when navigating site with iron:router',
    version: '0.0.4',
    git: 'https://github.com/reywood/meteor-iron-router-scroll.git'
});

Package.on_use(function (api) {
    api.versionsFrom('METEOR@1.0.1');
    api.use([ 'iron:router@1.0.0', 'jquery' ], [ 'client' ]);
    api.imply('iron:router');

    api.add_files([ 'scroll.js' ], [ 'client' ]);
});
