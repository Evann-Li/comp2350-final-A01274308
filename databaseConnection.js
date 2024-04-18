const mysql = require('mysql2/promise');

const is_render = process.env.IS_RENDER || false;

const dbConfigRender = {
	host: "sql.freedb.tech",
	user: "freedb_2350_main",
	password: "yDE4P*$p@a2eupF",
	database: "freedb_comp2350-week2-A01274308",
	multipleStatements: false,
	namedPlaceholders: true
};

const dbConfigLocal = {
	host: "localhost",
	user: "root",
	password: "El11fordawin",
	database: "products", 
	multipleStatements: false,
	namedPlaceholders: true
};

if (is_render) {
	var database = mysql.createPool(dbConfigRender);
}
else {
	var database = mysql.createPool(dbConfigLocal);
}

module.exports = database;
		