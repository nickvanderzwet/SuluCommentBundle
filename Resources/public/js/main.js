require.config({
    paths: {
        sulucomment: '../../sulucomment/js',
        sulucommentcss: '../../sulucomment/css'
    }
});

define(function() {

    'use strict';

    return {

        name: 'Sulu Comment Bundle',

        initialize: function(app) {

            app.components.addSource('sulucomment', '/bundles/sulucomment/js/components');

            app.sandbox.mvc.routes.push({
                route: 'comments',
                callback: function() {
                    return '<div data-aura-component="comments/list@sulucomment" />';
                }
            });

            app.sandbox.mvc.routes.push({
                route: 'threads',
                callback: function() {
                    return '<div data-aura-component="threads/list@sulucomment" />';
                }
            });
        }
    };
});
