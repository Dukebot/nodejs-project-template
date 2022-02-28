const MySQL = require('mysql');
const SqlQueryBuilder = require('./sql_query_builder');

class MySqlConnection {

    constructor(connection_settings) {
        this.connection = null;
        this.connect(connection_settings);
    }

    connect(connection_settings) {
        if (this.connection) throw new Error("Already connected to the database");

        console.log("Connection to database...", connection_settings);
        this.connection = MySQL.createConnection(connection_settings);
    }

    disconnect() {
        if (this.connection) {
            this.connection.end();
            this.connection = null;
            console.log("Connection to database closed...");
        } else {
            throw new Error("Connection was already closed");
        }
    }

    
    static query(sentence, connection_settings) {
        const mySqlCon = new MySqlConnection(connection_settings);

        return mySqlCon.query(sentence).then(response => {
            mySqlCon.disconnect();
            return response;
        }).catch(error => {
            mySqlCon.disconnect();
            return error;
        });
    }

    query(sentence) {
        if (!this.connection) throw new Error("Can't query without opening a new connection");

        console.log("Query sentence -> " + sentence);

        return new Promise((resolve) => {
            this.connection.query(sentence, (error, response) => {
                if (error) throw error;
                return resolve(response);
            });
        });
    }


    static get(table, columns, where, connection_settings) {
        const mySqlCon = new MySqlConnection(connection_settings);

        return mySqlCon.get(table, columns, where).then(response => {
            mySqlCon.disconnect();
            return response;
        }).catch(error => {
            mySqlCon.disconnect();
            return error;
        });
    }

    get(table, columns, where) {
        return this.query(SqlQueryBuilder.select(table, columns, where));
    }


    static create(table, object, connection_settings) {
        const mySqlCon = new MySqlConnection(connection_settings);

        return mySqlCon.create(table, object).then(response => {
            mySqlCon.disconnect();
            return response;
        }).catch(error => {
            mySqlCon.disconnect();
            return error;
        });
    }

    create(table, object) {
        return this.query(SqlQueryBuilder.insert(table, object));
    }


    static update(table, values, where, connection_settings) {
        const mySqlCon = new MySqlConnection(connection_settings);

        return mySqlCon.update(table, values, where).then(response => {
            mySqlCon.disconnect();
            return response;
        }).catch(error => {
            mySqlCon.disconnect();
            return error;
        });
    }

    update(table, values, where) {
        return this.query(SqlQueryBuilder.update(table, values, where));
    }


    static delete(table, where, connection_settings) {
        const mySqlCon = new MySqlConnection(connection_settings);

        return mySqlCon.delete(table, where).then(response => {
            mySqlCon.disconnect();
            return response;
        }).catch(error => {
            mySqlCon.disconnect();
            return error;
        });
    }

    delete(table, where) {
        return this.query(SqlQueryBuilder.delete(table, where));
    }


    static drop(table, connection_settings) {
        const mySqlCon = new MySqlConnection(connection_settings);

        return mySqlCon.drop(table).then(response => {
            mySqlCon.disconnect();
            return response;
        }).catch(error => {
            mySqlCon.disconnect();
            return error;
        });
    }

    drop(table) {
        return this.query(SqlQueryBuilder.drop(table));
    }


    static truncate(table, connection_settings) {
        const mySqlCon = new MySqlConnection(connection_settings);

        return mySqlCon.truncate(table).then(response => {
            mySqlCon.disconnect();
            return response;
        }).catch(error => {
            mySqlCon.disconnect();
            return error;
        });
    }

    truncate(table) {
        return this.query(SqlQueryBuilder.truncate(table));
    }
}

module.exports = MySqlConnection;
