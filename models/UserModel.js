const mysql = require('mysql');
const pool = mysql.createPool({
    connectionLimit: 10, // maximum number of connections to create at once
    host: 'boehkzigmgofd06e21h6-mysql.services.clever-cloud.com',
    user: 'usnww8izsyt7e0ca',
    password: 'wgrOoGNvFJkoOPKdeGV2',
    database: 'boehkzigmgofd06e21h6'
});

exports.getAllInstitutions = function(callback) {
    pool.query('SELECT * FROM institution', (err, results) => {
        if (err) {
            console.error(err);
            return callback(err, null);
        }
        callback(null, results);
    });
};

exports.getInstitutionById = function(id, callback) {
    pool.query('SELECT * FROM institution WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            return callback(err, null);
        }
        if (results.length === 0) {
            return callback({ message: 'Institution not found' }, null);
        }
        callback(null, results[0]);
    });
};

exports.createInstitution = function(name, physical_code, email, phone, callback) {
    pool.query('INSERT INTO institution (name, physical_code, email, phone) VALUES (?, ?, ?, ?)', [name, physical_code, email, phone], (err, results) => {
        if (err) {
            console.error(err);
            return callback(err, null);
        }
        callback(null, { message: 'Institution created successfully' });
    });
};

exports.updateInstitution = function(id, name, physical_code, email, phone, callback) {
    pool.query('UPDATE institution SET name = ?, physical_code = ?, email = ?, phone = ? WHERE id = ?', [name, physical_code, email, phone, id], (err, results) => {
        if (err) {
            console.error(err);
            return callback(err, null);
        }
        if (results.affectedRows === 0) {
            return callback({ message: 'Institution not found' }, null);
        }
        callback(null, { message: 'Institution updated successfully' });
    });
};

exports.partiallyUpdateInstitution = function(id, updateData, callback) {
    // Construct the SET clause dynamically based on the fields provided in updateData
    let updateQuery = 'UPDATE institution SET ';
    let params = [];
    for (let key in updateData) {
        updateQuery += `${key} = ?, `;
        params.push(updateData[key]);
    }
    // Remove the trailing comma and add the WHERE clause
    updateQuery = updateQuery.slice(0, -2) + ' WHERE id = ?';
    params.push(id);

    // Perform the query
    pool.query(updateQuery, params, (err, results) => {
        if (err) {
            console.error(err);
            return callback(err, null);
        }
        if (results.affectedRows === 0) {
            return callback({ message: 'Institution not found' }, null);
        }
        callback(null, { message: 'Institution updated successfully' });
    });
};


exports.deleteInstitution = function(id, callback) {
    pool.query('DELETE FROM institution WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            return callback(err, null);
        }
        if (results.affectedRows === 0) {
            return callback({ message: 'Institution not found' }, null);
        }
        callback(null, { message: 'Institution deleted successfully' });
    });
};
