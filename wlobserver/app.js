var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var app = express();
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('data/wlob.db');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


// DB functions

createNewTask = function(callback){
	db.run('INSERT INTO tasks (start_date, end_date) VALUES (CURRENT_TIMESTAMP, NULL)'
		,function(err){
			if(err){
				console.error("ERROR when inserting task:"+err);
				callback(-1);
			}else{
				callback(this.lastID);
			}
		});
}

getTask = function(taskId, callback){
	console.log("getting task " + taskId);
	sql = `SELECT * FROM tasks WHERE id = ?`;
	db.get(sql, [taskId], (err,row) =>{
		if (err) {
			console.error(err.message);
			callback(err);
		}
		callback(row);
	});
}



// ROUTES
app.get('/', (req, res, next) => {
	res.render('index', { title: 'Express' });
});
app.post('/task', (req, res) => {
	createNewTask((newId) =>{
		res.redirect('/task/'+newId);
	});
});

app.get('/task/:id', (req, res, next) => {
	getTask(req.params.id , (task)=>{res.render('task', {"task" : task });
	});
});






// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};
	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
