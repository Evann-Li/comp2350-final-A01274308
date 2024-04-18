const router = require('express').Router();
const database = include('databaseConnection');
const dbModel = include('databaseAccessLayer');
//const dbModel = include('staticData');

router.get('/', async (req, res) => {
	console.log("page hit");
	
	try {
		const result = await dbModel.getAllProducts();
		res.render('index', {allProducts: result});

		//Output the results of the query to the Heroku Logs
		console.log(result);
	}
	catch (err) {
		res.render('error', {message: 'Error reading from MySQL'});
		console.log("Error reading from mysql");
	}
});

router.post('/addItem', (req, res) => {     
	console.log("form submit");     
	console.log(req.body); 
}); 

router.post('/addItem', async (req, res) => {     
	console.log("form submit");     
	console.log(req.body);    
	try {   
		const success = await dbModel.addItem(req.body);   
		if (success) {    res.redirect("/");   
	}   else {    
		res.render('error', {message: "Error writing to MySQL"});    
		console.log("Error writing to MySQL");   
		}  
	}  
	catch (err) {   
		res.render('error', {message: "Error writing to MySQL"});   
		console.log("Error writing to MySQL");   
		console.log(err);  
	} 
});

router.get('/deleteItem', async (req, res) => {     
	console.log("delete restaurant");    
	console.log(req.query);   
	let purchaseId = req.query.id;    
	if (purchaseId) {   
		const success = await dbModel.deleteItem(purchaseId);   
		if (success) {    
			res.redirect("/");   
		}   else {    
			res.render('error', {message: 'Error writing to MySQL'});    
			console.log("Error writing to mysql");    
			console.log(err);   
		}  
	} 
}); 

router.get('/upItem', async (req, res) => {
    const { id } = req.query;
    const success = await dbModel.upItem(id);
    if (success) {
        res.redirect('/'); 
    } else {
        res.status(500).send('Failed to increase quantity.');
    }
});


router.get('/downItem', async (req, res) => {
    const { id } = req.query;
    const success = await dbModel.downItem(id);
    if (success) {
        res.redirect('/');
    } else {
        res.status(500).send('Failed to decrease quantity.');
    }
});
module.exports = router;
