var $currTime = 0;
var $displayStartTime = 0;
var $displayStopTime = 0;

$(document).ready(function() {
  $('#clock').simpleClock();
});

$(document).on('mobileinit',function(){
   $.mobile.selectmenu.prototype.options.nativeMenu = false;
});
	
$(function() {
var timecaptain = {}
timecaptain.init = {}
timecaptain.init.db = {}

	$('#counter').html('<span id="counter" class="counter counter-analog2" data-format="59 99" data-direction="up" ></span>').trigger('create');
	$('.counter').counter();
	
	$('#start_stop_button').on('click',function(){

		if($displayStartTime == 0) {
				
			$('#counter').html('<span id="counter" class="counter counter-analog2" data-format="59 59" data-direction="up" ></span>').trigger('create');
			$('.counter').counter();
			$currTime = new Date();
			$displayStartTime = $currTime.getTime();

			$("#start_stop_button .ui-btn-text").text('Stop');

		} else {
			$currTime = new Date();
			$displayStopTime = $currTime.getTime();

			var $Test_Customer = 44;
			var $Test_Project = 55;
			var $Test_Function = 66;
			timecaptain.init.addTodo($displayStartTime, $displayStopTime, $Test_Customer, $Test_Project, $Test_Function);
			
			$("#start_stop_button .ui-btn-text").text('Start');

			$displayStartTime = 0;
		}
		
	});


	
	// Holding database instance inside a global variable
	timecaptain.init.open = function(){
		timecaptain.init.db = openDatabase("timecaptain","1.0","Time Captain Database",5 * 1024 * 1024);
		// dbname, verison, desc, size
	}
	
	timecaptain.init.createTable = function(){
		var database = timecaptain.init.db;
		database.transaction(function(tx){
			//tx.executeSql("CREATE TABLE IF NOT EXISTS todo (ID INTEGER PRIMARY KEY ASC,todo_item TEXT,due_date VARCHAR)", []);
			
			tx.executeSql("CREATE TABLE IF NOT EXISTS records (ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, start_time INTEGER, stop_time INT, customer INTEGER, project INTEGER, function INTEGER)", []);
			tx.executeSql("CREATE TABLE IF NOT EXISTS customer (ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, customer_name VARCHAR, customer_projects VARCHAR)", []);
			tx.executeSql("CREATE TABLE IF NOT EXISTS projects (ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, project_name VARCHAR)", []);
			tx.executeSql("CREATE TABLE IF NOT EXISTS functions (ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, function_name VARCHAR, function_rate INTEGER)", []);
		});
	}

	// adding created todo
	// adding created todo
	// $displayStartTime, $displayStopTime, $Test_Customer, $Test_Project, $Test_Function
	timecaptain.init.addTodo = function(temp_start_time, temp_stop_time, temp_customer, temp_project, temp_function){
		var database = timecaptain.init.db;
		database.transaction(function(tx){
			 tx.executeSql("INSERT INTO records (start_time,stop_time,customer,project,function) VALUES (?,?,?,?,?)", [temp_start_time,temp_stop_time,temp_customer,temp_project,temp_function],
			 //showAllTodo(temp_start_time, temp_stop_time)
			 timecaptain.init.getAllRecords()
			
			);
		});
	}
	
	/*timecaptain.init.addTodo = function(todoItem,dueDate){
		var database = timecaptain.init.db;
		database.transaction(function(tx){
			 tx.executeSql("INSERT INTO todo (todo_item,due_date) VALUES (?,?)", [todoItem,dueDate],
			 showAllTodo(todoItem,dueDate));
		});
	}*/
	
	// getting alle Records from the Database
	timecaptain.init.getAllRecords = function(){
		$('ul.list').html('');
		var database = timecaptain.init.db;
		database.transaction(function(tx){
			tx.executeSql("SELECT * FROM records", [], function(tx,result){

				for (var i=0; i < result.rows.length; i++) {
					
					temp_id = result.rows.item(i).ID;
					temp_start_time = result.rows.item(i).start_time;
					temp_stop_time = result.rows.item(i).stop_time;
					$('ul.list').append(
						'<li>ID: ' + temp_id + '</span>' +
						'Start: ' + temp_start_time + ' ' +
						'Stop: ' + temp_stop_time + ' ' +
						'<a href="#" id="delete"> Delete </a>' +
						'<input id="this_id" value="' + temp_id + '" type="hidden"></li>'); 
						$('li:last').addClass('highlight').delay(1000).queue(function(next){ $(this).removeClass('highlight'); next(); });
				}
			});
		});
	}
	
	
	
	
	
	
	
	
	
	// getting created todo
	timecaptain.init.getTodo = function(){
		var database = timecaptain.init.db;
		var output = '';
		database.transaction(function(tx){
			tx.executeSql("SELECT * FROM todo", [], function(tx,result){
				for (var i=0; i < result.rows.length; i++) {
					todo_item = result.rows.item(i).todo_item;
					todo_due_date = result.rows.item(i).due_date;
					todo_id = result.rows.item(i).ID;
					showAllTodo(todo_item,todo_due_date,todo_id);
				}
			});
		});
	}

	// deleting a todo 
	timecaptain.init.deleteRecord = function(id){
		var database = timecaptain.init.db;
		database.transaction(function(tx){
			tx.executeSql("DELETE FROM todo WHERE ID=?",[id]);
		});
	}


	// deleting all records
	
	timecaptain.init.deleteAllRecords = function(){
		var database = timecaptain.init.db;
		database.transaction(function(tx){
			//tx.executeSql("DROP TABLE IF EXISTS records", []);
			tx.executeSql("DELETE FROM records", []);			
		});
	}
	
	$('#delete_all_button').on('click',function(){
		timecaptain.init.deleteAllRecords();	
		timecaptain.init.getAllRecords()
	});
	
	
	
	

	// onclick add todo event
	$('#create_todo').click(function(){
		var todo_item_text = $('#todo_item_text').val();
		var todo_due_date = $('#todo_due_date').val();
	
		if(todo_item_text.length == '' || todo_due_date.length == '')
		{
			alert('Both fields are required');
		}
		else
		{
			timecaptain.init.addTodo(todo_item_text,todo_due_date);
			$('#todo_item_text').val('');
			$('#todo_due_date').val('');
		}
	});

	// function to show all todos 
	function showAllTodo(todo_item,todo_due_date,todo_id){
	$('ul.list').append(
		'<li><div class="todo_item"><span class="todo_text">' + todo_item + '</span>' +
		'<a href="#" id="delete"> Delete </a><span class="due_date">' + todo_due_date + '</span>' +
		'<input id="this_id" value="' + todo_id + '" type="hidden"><div class="clear"></div></div></li>'); 
		$('li:last').addClass('highlight').delay(1000).queue(function(next){ $(this).removeClass('highlight'); next(); });
	}
	
	// onClick deleteEvent Handler

	$('#delete').live("click",function(){
		var id = $(this).closest('li').find('#this_id').val();
		$(this).closest('li').addClass('highlight').delay(1000).queue(function(next){ $(this).remove(); next(); });
		timecaptain.init.deleteTodo(id);
	});

	function init(){
		if(typeof(openDatabase) !== 'undefined')
		{
			timecaptain.init.open();
			timecaptain.init.createTable();
			timecaptain.init.getTodo();
			timecaptain.init.getAllRecords();
		}
		else
		{
			$('#bodyWrapper').html('<h2 class="error_message"> Your browser does not support webSql </h2>');
		}
	}
		init();


		$("#customer_select").change(function() {
		    var $selected = $(this).val();
		 	alert($selected);
		});
		
});










