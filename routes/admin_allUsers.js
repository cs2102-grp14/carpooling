var express = require('express');
var router = express.Router();

const { Pool } = require('pg')

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

// query to display all available rides
var all_users_query = 'SELECT DISTINCT U.username, userphone, rating FROM users U FULL OUTER JOIN drivers D ON D.username = U.username;'
var all_drivers_query = ' SELECT userName, userPhone, rating From drivers U NATURAL JOIN users D WHERE U.userName = D.userName;'

// GET
router.get('/', function (req, res, next) {
	//add this to the pages that need to be logged in to access
	username = req.session.username;
	if (username != undefined) {
		pool.query(all_users_query, (err, data) => {
      console.log(all_users_query);
      res.render('admin_allUsers', { title: 'All Users', data: data.rows });
      console.log(data);
    });
	} else {
		res.redirect('/login');
	}
});


// POST to delete user
router.post('/', function (req, res, next) {

	//retrieve info from the page
	var username = req.body.username;

	//SQL query
	var sql_query = 'DELETE FROM users U WHERE ' + "'" + username + "'" + ' = U.userName;';
	console.log(sql_query);

	pool.query(sql_query, (err, data) => {
		//if(err) throw err
		if (err) {
			res.redirect('/admin_allUsers');
		} else {
			res.redirect('/admin_allUsers');
		}
	})
})

module.exports = router;
