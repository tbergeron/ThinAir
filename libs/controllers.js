var ThinAir = require('../../libs/thinair');

module.exports = ThinAir.createController({
    Lists: null,

    setup: function(done) {
        this.Lists = this.repositories.Lists;

        // never forget to tell when the controller has finished setup
        done();
    },

    index: function(req, res, params) {
        var that = this;

        this.Lists.getAll(function(lists) {
            that.sendTemplate(req, res, 'lists/list', { lists: lists });
        });
    },

    add: function(req, res, params) {
        this.sendTemplate(req, res, 'lists/edit', { addMode: true });
    },

    edit: function(req, res, params) {
        var that = this;

        // response from the form
        if (this.isPost(req)) {

            var list = params.post.list;

            list.items = [];

            that.Lists.save(params.post.list, function(list, errors) {
                var message = (errors) ? errors[0] : 'success'
                    opts = { message: message, list: list };

                that.sendTemplate(req, res, 'lists/edit', opts);
            });
        } else {
            this.Lists.getOneByCode(params.list_code, function(list) {
                that.sendTemplate(req, res, 'lists/edit', { list: list });
            });
        }
    },

    delete: function(req, res, params) {
        var that = this;

        this.Lists.delete(params.list_code, function(err) {
            // TODOTB: how to pass this while redirect? { messages: 'List deleted succesfully.'}
            that.redirect(req, res, "/lists");
        });
    },

    getItems: function(req, res, params) {
        var that = this;

        this.Lists.getOneByCode(params.list_code, function(list) {
            that.sendJson(res, list.items);
        });
    },

    addItem: function(req, res, params) {
        var that = this;

        if (this.isPost(req)) {
            if (params.post.list_code) {
                // getting list
                this.Lists.getOneByCode(params.post.list_code, function(list) {
                    if (list) {
                        // adding item to list
                        list.items.push(params.post.item);

                        // saving list
                        that.Lists.save(list, function(list, errors) {
                            that.sendHtml(res, 'true');
                        });
                    }
                });
            } else {
                this.sendHtml(res, 'false');
            }
        } else {
            this.errorPage(req, res, 403);
        }
    }

});