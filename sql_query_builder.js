function getWhereCondition(where) {
    let whereCondition = "";

    if (typeof where === "string") {
        whereCondition = where;
    }
    else if (typeof where === "object") {
        for (const key in where) {
            const value = where[key];

            if (whereCondition !== "") whereCondition += " AND ";
            whereCondition += "`" + key + "` = '" + value + "'";
        }
    }

    return whereCondition;
}

const SqlQueryBuilder = {
    select(table, columns = ["*"], where = false) {
        if (typeof columns === 'string') columns = [columns];

        let colsToGet = "";
        for (const col of columns) {
            if (colsToGet !== "") colsToGet += ", ";
            colsToGet += col;
        }

        let query = "SELECT " + colsToGet + " FROM " + table;
        if (where) query += " WHERE " + getWhereCondition(where);

        return query;
    },
    insert(table, object) {
        let colsToInsert = "";
        let valuesToInsert = "";

        for (const key in object) {
            if (colsToInsert !== "") colsToInsert += ", ";
            if (valuesToInsert !== "") valuesToInsert += ", ";

            colsToInsert += '`' + key + '`';

            if (object[key] !== null) {
                valuesToInsert += "'" + object[key] + "'";
            } else {
                valuesToInsert += object[key];
            }
        }

        return 'INSERT INTO ' + table + ' (' + colsToInsert + ') VALUES (' + valuesToInsert + ')';
    },
    update(table, values, where) {
        let valuesToUpdate = "";

        for (const colName in values) {
            if (valuesToUpdate !== "") valuesToUpdate += ", ";
            valuesToUpdate += "`" + colName + "` = '" + values[colName] + "'";
        }

        return "UPDATE " + table + " SET " + valuesToUpdate + " WHERE (" + getWhereCondition(where) + ")";
    },
    delete(table, where) {
        return "DELETE FROM " + table + " WHERE (" + getWhereCondition(where) + ")";
    },
    drop(table) {
        return `DROP TABLE IF EXISTS ${table};`
    },
    truncate(table) {
        return `TRUNCATE TABLE ${table}`;
    },
    in(column_name, array) {
        let text = "";
        for (const item of array) {
            if (text !== "") text += ", ";
            text += "'" + item + "'";
        }
        return column_name + " IN (" + text + ")";
    }
}

module.exports = SqlQueryBuilder;
