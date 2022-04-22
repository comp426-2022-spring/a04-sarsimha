"use strict";
// Require better-sqlite.
const Database = require('better-sqlite3');

// Connect to a database or create one if it doesn't exist yet.
const db = new Database('log.db');
const stmt = db.prepare(`SELECT name FROM sqlite_master WHERE type='table' and name='accesslog';`)
// Define row using `get()` from better-sqlite3
let row = stmt.get();
// Check if there is a table. If row is undefined then no table exists.
if (row == undefined){
    console.log('Log database appears to be empty. Create log database...')
    const sq1Init = ` CREATE TABLE accesslog ( 
        id INTEGER PRIMARY KEY,
        remoteaddr VARCHAR,
        remoteuser VARCHAR,
        time VARCHAR,
        method VARCHAR,
        url VARCHAR,
        protocol VARCHAR,
        httpversion NUMERIC,
        secure VARCHAR,
        status INTEGER,
        referer VARCHAR,
        useragent VARCHAR 
        );`
    db.exec(sq1Init);
} else {
    console.log('Log Databse exists')
}

module.exports = db;