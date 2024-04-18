const database = include('/databaseConnection');


async function getAllProducts() {
	let sqlQuery = `
		SELECT purchase_item_id, item_name, item_description, cost, quantity
		FROM purchase_item;
	`;
	
	try {
		const results = await database.query(sqlQuery);
		console.log(results[0]);
		return results[0];
	}
	catch (err) {
		console.log("Error selecting from products table");
		console.log(err);
		return null;
	}
}
  
async function addItem(postData, callback) {     
	let sqlInsertSalt = `  INSERT INTO products (item_name, item_description, cost, quantity)   
	VALUES (:item_name, :item_description, :cost, :quantity);  `;     
	let params = {                 
		item_name: postData.item_name,             
		item_description: postData.item_description,
		cost: postData.cost,
		quantity: postData.quantity                 
	};     
	console.log(sqlInsertSalt);  
	database.query(sqlInsert, params, (err, results, fields) => {
		if (err) {
			console.log(err);
			callback(err, null);
		}
		else {
			console.log(results);
			callback(null, results);
		}
	});
} 

async function deleteItem(purchase_item_id) {     
	let sqlDeleteProduct = `   DELETE FROM products  WHERE purchase_item_id = :productID  `;       
	let params = {         
		productID: purchase_item_id     
	};     
	console.log(sqlDeleteProduct);  
	try {   
		await database.query(sqlDeleteProduct, params);   
		return true;  
	}  
	catch (err) {   
		console.log(err);   
		return false;  
	}         
} 


async function upItem(id) {
    try {

        const [currentQuantityRow] = await database.query('SELECT quantity FROM purchase_item WHERE purchase_item_id = ?', [id]);
        const currentQuantity = currentQuantityRow.quantity;

 
        await database.query('UPDATE purchase_item SET quantity = ? WHERE purchase_item_id = ?', [currentQuantity + 1, id]);
        
        return true;
    } catch (error) {
        console.error('Error increasing quantity:', error);
        return false;
    }
}

async function downItem(id) {
    try {
        const [currentQuantityRow] = await database.query('SELECT quantity FROM purchase_item WHERE purchase_item_id = ?', [id]);
        const currentQuantity = currentQuantityRow.quantity;

        if (currentQuantity === 0) {
            throw new Error('Quantity cannot be negative.');
        }
        await database.query('UPDATE purchase_item SET quantity = ? WHERE purchase_item_id = ?', [currentQuantity - 1, id]);
        
        return true;
    } catch (error) {
        console.error('Error decreasing quantity:', error);
        return false;
    }
}


module.exports = { getAllProducts, addItem, deleteItem, upItem, downItem }
