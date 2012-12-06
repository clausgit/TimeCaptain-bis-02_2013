var $currTime = 0;
var $displayStartTime = 0;
var $displayStopTime = 0;

var $temp_customer_selected = 33;
var $temp_project_selected = 44;
var $temp_activity_selected = 55;

$(document).ready(function() {
  $('#clock').simpleClock();
});



	
$(function() {
var timecaptain = {}
timecaptain.init = {}
timecaptain.init.db = {}
	$('#counter').html('<span id="counter" class="counter counter-analog2" data-format="59 99" data-direction="up" ></span>').trigger('create');
	$('.counter').counter();
	$('#start_stop_button').on('click',function(){
		if ($temp_customer_selected == 0) {alert('Bitte wählen Sie einen Kunden aus.');}
		else if ($temp_project_selected == 0) {alert('Bitte wählen Sie ein Projekt aus.');}		
		else if ($temp_activity_selected == 0) {alert('Bitte wählen Sie eine Tätigkeit aus.');} else {
			if($displayStartTime == 0) {
				$('#counter').html('<span id="counter" class="counter counter-analog2" data-format="59 59" data-direction="up" ></span>').trigger('create');
				$('.counter').counter();
				$currTime = new Date();
				$displayStartTime = $currTime.getTime();
				$("#start_stop_button .ui-btn-text").html('<br>Stop<br><br>');
				//$('#start_stop_button').attr('data-theme', 'b').removeClass('ui-body-a').addClass('ui-body-b').trigger('create');
			} else {
				$currTime = new Date();
				$displayStopTime = $currTime.getTime();
				timecaptain.init.addRecord($displayStartTime, $displayStopTime);
				
				$("#start_stop_button .ui-btn-text").html('<br>Start<br><br>');
				//$('#start_stop_button').attr('data-theme', 'a').removeClass('ui-body-b').addClass('ui-body-a').trigger('create');
				$displayStartTime = 0;
			}	
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
			
			tx.executeSql("CREATE TABLE IF NOT EXISTS records (ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, start_time INTEGER, stop_time INT, customer INTEGER, project INTEGER, activity INTEGER)", []);
			tx.executeSql("CREATE TABLE IF NOT EXISTS customers (ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, customer_name VARCHAR, customer_projects VARCHAR)", []);
			tx.executeSql("CREATE TABLE IF NOT EXISTS projects (ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, project_name VARCHAR)", []);
			tx.executeSql("CREATE TABLE IF NOT EXISTS activities (ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, activity_name VARCHAR, activity_rate INTEGER)", []);
			
			//tx.executeSql("INSERT INTO records (start_time,stop_time,customer,project,activity) VALUES ('55','66','77','88','99')", []);
			
			tx.executeSql("DELETE FROM customers", []);
			tx.executeSql("INSERT INTO customers (customer_name) VALUES ('Stadtwerke Köln')", []);
			tx.executeSql("INSERT INTO customers (customer_name) VALUES ('Aachener Versicherungen')", []);
			tx.executeSql("INSERT INTO customers (customer_name) VALUES ('Freiburger Bauamt')", []);
			tx.executeSql("INSERT INTO customers (customer_name) VALUES ('Erdinger Weissbier')", []);
						
			tx.executeSql("DELETE FROM projects", []);
			tx.executeSql("INSERT INTO projects (project_name) VALUES ('Flyer Wasserwirtschaft')", []);
			tx.executeSql("INSERT INTO projects (project_name) VALUES ('Produktkatalog 2013')", []);
			tx.executeSql("INSERT INTO projects (project_name) VALUES ('Image-Broschüre')", []);
			
			tx.executeSql("DELETE FROM activities", []);
			tx.executeSql("INSERT INTO activities (activity_name) VALUES ('Programmieren')", []);
			tx.executeSql("INSERT INTO activities (activity_name) VALUES ('Layout')", []);
			tx.executeSql("INSERT INTO activities (activity_name) VALUES ('Konzept')", []);
			tx.executeSql("INSERT INTO activities (activity_name) VALUES ('Meeting')", []);
			tx.executeSql("INSERT INTO activities (activity_name) VALUES ('Backup')", []);
			tx.executeSql("INSERT INTO activities (activity_name) VALUES ('Support')", []);
			
		});
	}
	
	//Das Kunden-Menu wird gebaut
	timecaptain.init.buildCustomerMenu = function(){
		var database = timecaptain.init.db;
		database.transaction(function(tx){
			tx.executeSql("SELECT * FROM customers", [], function(tx,result){
				for (var i=0; i < result.rows.length; i++) {
					temp_id = result.rows.item(i).ID;
					temp_customer_name = result.rows.item(i).customer_name;			
					$('#select-customer').append('<option value="' + temp_id + '">' + temp_customer_name + '</option>');
				}
				$('#select-customer').selectmenu('refresh', true);
			});
		});
	}
	
	//Das Projekte-Menu wird gebaut
	timecaptain.init.buildProjectMenu = function(){
		var database = timecaptain.init.db;
		database.transaction(function(tx){
			tx.executeSql("SELECT * FROM projects", [], function(tx,result){
				for (var i=0; i < result.rows.length; i++) {
					temp_id = result.rows.item(i).ID;
					temp_project_name = result.rows.item(i).project_name;			
					$('#select-project').append('<option value="' + temp_id + '">' + temp_project_name + '</option>');
				}
				$('#select-project').selectmenu('refresh', true);
			});
		});
	}
	
	//Das Tätigkeiten-Menu wird gebaut
	timecaptain.init.buildActivityMenu = function(){
		var database = timecaptain.init.db;
		database.transaction(function(tx){
			tx.executeSql("SELECT * FROM activities", [], function(tx,result){
				for (var i=0; i < result.rows.length; i++) {
					temp_id = result.rows.item(i).ID;
					temp_activity_name = result.rows.item(i).activity_name;			
					$('#select-activity').append('<option value="' + temp_id + '">' + temp_activity_name + '</option>');
				}
				$('#select-activity').selectmenu('refresh', true);
			});
		});
	}

	// adding record
	// $displayStartTime, $displayStopTime, $Test_Customer, $Test_Project, $Test_Function
	timecaptain.init.addRecord = function(temp_start_time, temp_stop_time){
		
		var database = timecaptain.init.db;
		database.transaction(function(tx){
			 tx.executeSql("INSERT INTO records (start_time,stop_time,customer,project,activity) VALUES (?,?,?,?,?)", [temp_start_time,temp_stop_time,$temp_customer_selected,$temp_project_selected,$temp_activity_selected]);
			//tx.executeSql("INSERT INTO records (start_time,stop_time,customer,project,activity) VALUES ('55','66','77','88','99')", []);
			 //showAllTodo(temp_start_time, temp_stop_time)
			 timecaptain.init.getAllRecords();
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
		$('#list_off_all_records').html('');
		var database = timecaptain.init.db;
		
		database.transaction(function(tx){
			tx.executeSql("SELECT * FROM records", [], function(tx,result){
				for (var i=0; i < result.rows.length; i++) {
					
					temp_id = result.rows.item(i).ID;
					temp_start_time = result.rows.item(i).start_time;
					temp_stop_time = result.rows.item(i).stop_time;
					temp_customer = result.rows.item(i).customer;
					temp_project = result.rows.item(i).project;
					temp_activity = result.rows.item(i).activity;
					
					var StartTime = new Date(temp_start_time);
					var temp_view_start_month = StartTime.getMonth() + 1;
					var temp_view_start_day = StartTime.getDate();
					var temp_view_start_year = StartTime.getFullYear();
					var temp_view_start_hours = StartTime.getHours() + 1;
					var temp_view_start_minutes = StartTime.getMinutes();
					var temp_view_start_seconds = StartTime.getSeconds();
					temp_view_start_time = temp_view_start_month + '.' + temp_view_start_day + '.' + temp_view_start_year + '&nbsp;' + temp_view_start_hours + ':' + temp_view_start_minutes + ':' + temp_view_start_seconds + ' Uhr';

					var StopTime = new Date(temp_stop_time);
					var temp_view_stop_month = StopTime.getMonth() + 1;
					var temp_view_stop_day = StopTime.getDate();
					var temp_view_stop_year = StopTime.getFullYear();
					var temp_view_stop_hours = StopTime.getHours() + 1;
					var temp_view_stop_minutes = StopTime.getMinutes();
					var temp_view_stop_seconds = StopTime.getSeconds();
					temp_view_stop_time = temp_view_stop_month + '.' + temp_view_stop_day + '.' + temp_view_stop_year + '&nbsp;' + temp_view_stop_hours + ':' + temp_view_stop_minutes + ':' + temp_view_stop_seconds + ' Uhr';
	
					
					temp_customer_name_list_view = getCustomerName(temp_customer);
					
					$('#list_off_all_records').append(
						'<li>' +
						'Start: ' + temp_view_start_time + ' ' +
						'Stop: ' + temp_view_stop_time + '<br>' +
						'Kunde: ' + temp_customer_name_list_view + ' ' + temp_customer + ' ' +
						'Projekt: ' + temp_project + ' ' +
						'Tätigkeit: ' + temp_activity + ' ' +
						'</li>');

						//'<a href="#" id="delete"> Delete </a>' +
						//'<input id="this_id" value="' + temp_id + '" type="hidden"></li>');
					$('#list_off_all_records').listview('refresh');	
				}
				
				
			});
		});
		
		// get customer name
		timecaptain.init.getCustomerName = function(id){
			var database = timecaptain.init.db;
			database.transaction(function(tx){			
				tx.executeSql("SELECT * FROM customers WHERE ID=?", [id], function(tx,result){
					for (var i=0; i < result.rows.length; i++) {
						temp_customer_name_list_view = result.rows.item(i).customer_name;
					}
				});
			});
			return temp_customer_name_list_view;
		}
		
		//$('#list_off_all_records').trigger('create');
		
		//$('#page_2').page('refresh');
	}
	
	
	// onClick deleteEvent Handler
	$('#delete').live("click",function(){
		var id = $(this).closest('li').find('#this_id').val();
		timecaptain.init.deleteRecord(id);
		timecaptain.init.getAllRecords()
	});
	
	// deleting a record 
	timecaptain.init.deleteRecord = function(id){
		var database = timecaptain.init.db;
		database.transaction(function(tx){
			tx.executeSql("DELETE FROM records WHERE ID=?",[id]);
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
		$('#list_off_all_records').html('');
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
	


	function init(){
		if(typeof(openDatabase) !== 'undefined')
		{
			timecaptain.init.open();
			timecaptain.init.createTable();
			timecaptain.init.buildCustomerMenu();
			timecaptain.init.buildProjectMenu();
			timecaptain.init.buildActivityMenu();
			timecaptain.init.getTodo();
			timecaptain.init.getAllRecords();
		}
		else
		{
			$('#bodyWrapper').html('<h2 class="error_message"> Your browser does not support webSql </h2>');
		}
	}
	
		init();

		// Auswahl der Listen Kunde, Projekt und Tätigkeit
		$("#select-customer").change(function() {
		    $temp_customer_selected = $(this).val();
		});

		$("#select-project").change(function() {
		    $temp_project_selected = $(this).val();
		});

		$("#select-activity").change(function() {
		    $temp_activity_selected = $(this).val();
		});
		
});










