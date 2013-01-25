// init.js
// Hier stehen die Funktionen die beim Starup von main.js aufgerufen werden.
// global_timecaptain.init.open
// global_timecaptain.init.createTable
// global_timecaptain.init.buildCustomerMenu
// global_timecaptain.init.buildProjectMenu
// global_timecaptain.init.buildActivityMenu

var global_timecaptain = {}
global_timecaptain.init = {}
global_timecaptain.init.db = {}

// FUNCTION OPEN DATABASE ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Holding database instance inside a global variable
	global_timecaptain.init.open = function(){
		global_timecaptain.init.db = openDatabase("timecaptain","1.0","Time Captain Database",5 * 1024 * 1024);
		// dbname, verison, desc, size
	}
// FUNCTION OPEN DATABASE END ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// FUNCTION CREATE TABLES ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Die Tabellen werden angelegt, falls sie noch nicht existieren. records, customers, projects und activities
	global_timecaptain.init.createTable = function(){
		var database = global_timecaptain.init.db;
		database.transaction(function(tx){			
			tx.executeSql("CREATE TABLE IF NOT EXISTS records (ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, start_time INTEGER, stop_time INT, customer INTEGER, customer_name VARCHAR, project INTEGER, project_name VARCHAR, activity INTEGER, activity_name VARCHAR)", []);
			
			
			
			
			tx.executeSql("CREATE TABLE IF NOT EXISTS customers (ID INTEGER, customer_name VARCHAR, customer_projects VARCHAR)", []);
			tx.executeSql("CREATE TABLE IF NOT EXISTS projects (ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, project_name VARCHAR)", []);
			tx.executeSql("CREATE TABLE IF NOT EXISTS activities (ID INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, activity_name VARCHAR, activity_rate INTEGER)", []);
			
			///////////// Zum Testen werden die Tabellen mit Daten gefüllt ///////////////////////////////////////////
			tx.executeSql("DELETE FROM customers", []);															//////
			tx.executeSql("INSERT INTO customers (ID,customer_name) VALUES (1,'Stadtwerke Köln')", []);			//////
			tx.executeSql("INSERT INTO customers (ID,customer_name) VALUES (2,'Aachener Versicherungen')", []);	//////
			tx.executeSql("INSERT INTO customers (ID,customer_name) VALUES (3,'Freiburger Bauamt')", []);		//////
			tx.executeSql("INSERT INTO customers (ID,customer_name) VALUES (4,'Erdinger Brauerei')", []);		//////
																												//////
			tx.executeSql("DELETE FROM projects", []);															//////
			tx.executeSql("INSERT INTO projects (ID,project_name) VALUES (1,'Flyer Wasserwirtschaft')", []);			//////
			tx.executeSql("INSERT INTO projects (ID,project_name) VALUES (2,'Produktkatalog 2013')", []);			//////
			tx.executeSql("INSERT INTO projects (ID,project_name) VALUES (3,'Image-Broschüre')", []);				//////
																												//////
			tx.executeSql("DELETE FROM activities", []);														//////
			tx.executeSql("INSERT INTO activities (ID,activity_name) VALUES (1,'Programmieren')", []);				//////
			tx.executeSql("INSERT INTO activities (ID,activity_name) VALUES (2,'Layout')", []);						//////
			tx.executeSql("INSERT INTO activities (ID,activity_name) VALUES (3,'Konzept')", []);						//////
			tx.executeSql("INSERT INTO activities (ID,activity_name) VALUES (4,'Meeting')", []);						//////
			tx.executeSql("INSERT INTO activities (ID,activity_name) VALUES (5,'Backup')", []);						//////
			tx.executeSql("INSERT INTO activities (ID,activity_name) VALUES (6,'Support')", []);						//////
			/////////////////////////////////////////////////////////////////////////////////////////////////////////
		});
	}
// FUNCTION CREATE TABLES END ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// FUNCTION BUILD CUSTOMER MENU ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Das Kunden-Menu wird gebaut
	global_timecaptain.init.buildCustomerMenu = function(){
		var database = global_timecaptain.init.db;
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
// FUNCTION BUILD CUSTOMER MENU END ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// FUNCTION BUILD PROJECTS MENU ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Das Projekte-Menu wird gebaut
	global_timecaptain.init.buildProjectMenu = function(){
		var database = global_timecaptain.init.db;
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
// FUNCTION BUILD PROJECTS MENU END ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


// FUNCTION BUILD ACTIVITIES MENU ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Das Tätigkeiten-Menu wird gebaut
	global_timecaptain.init.buildActivityMenu = function(){
		var database = global_timecaptain.init.db;
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
// FUNCTION BUILD ACTIVITIES MENU END ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	
// FUNCTION INIT ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Initial call from main.js on Startup
//	function init(){
//		if(typeof(openDatabase) !== 'undefined') {
//
//		} else {
//			$('#bodyWrapper').html('<h2 class="error_message"> Your browser does not support webSql </h2>');
//		}
//	}
// FUNCTION INIT END //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	






