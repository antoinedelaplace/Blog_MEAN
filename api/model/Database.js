export default class Database {

    constructor() {
        this.mongoose = require('mongoose');
    }

    connect() {
        this.mongoose.connect('mongodb://localhost/blog', function(err) {
            if (err) { throw err; }
        });
    }
}