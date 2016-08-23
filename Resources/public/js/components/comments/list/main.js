/*
 * This file is part of Sulu.
 *
 * (c) MASSIVE ART WebServices GmbH
 *
 * This source file is subject to the MIT license that is bundled
 * with this source code in the file LICENSE.
 */

define(['text!./list.html'], function(list) {

    var defaults = {
        templates: {
            list: list
        },

        translations: {
            title: 'sulu_comment.comment.title'
        }
    };

    return {

        defaults: defaults,

        header: function() {
            return {
                title: function() {
                    return this.translations.title;
                }.bind(this),
                underline: false,

                toolbar: {
                    buttons: {
                        deleteSelected: {}
                    }
                }
            };
        },

        layout: {
            content: {
                width: 'max'
            }
        },

        initialize: function() {
            this.render();

            this.bindCustomEvents();
        },

        render: function() {
            this.$el.html(this.templates.list());

            this.sandbox.sulu.initListToolbarAndList.call(this,
                'comments',
                '/admin/api/comment/fields',
                {
                    el: this.$find('#list-toolbar-container'),
                    instanceName: 'comments',
                    template: this.sandbox.sulu.buttons.get({
                        settings: {
                            options: {
                                dropdownItems: [
                                    {
                                        type: 'columnOptions'
                                    }
                                ]
                            }
                        }
                    })
                },
                {
                    el: this.sandbox.dom.find('#comments-list'),
                    url: '/admin/api/comments',
                    searchInstanceName: 'comments',
                    searchFields: ['title'],
                    resultKey: 'comments',
                    instanceName: 'comments',
                    viewOptions: {
                        table: {
                            actionIconColumn: 'title'
                        }
                    }
                }
            );
        },

        deleteItems: function(ids) {
            for (var i = 0, length = ids.length; i < length; i++) {
                this.deleteItem(ids[i]);
            }
        },

        deleteItem: function(id) {
            this.sandbox.util.save('/admin/api/comments/' + id, 'DELETE').then(function() {
                this.sandbox.emit('husky.datagrid.comments.record.remove', id);
            }.bind(this));
        },

        bindCustomEvents: function() {
            this.sandbox.on('husky.datagrid.comments.number.selections', function(number) {
                var postfix = number > 0 ? 'enable' : 'disable';
                this.sandbox.emit('sulu.header.toolbar.item.' + postfix, 'deleteSelected', false);
            }.bind(this));

            this.sandbox.on('sulu.toolbar.delete', function() {
                this.sandbox.emit('husky.datagrid.comments.items.get-selected', this.deleteItems.bind(this));
            }.bind(this));
        }
    };
});
