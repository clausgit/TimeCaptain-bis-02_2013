// tools.js
// Hier stehen Funktionen die während der Runtime benötigt werden.
// Aufgerufen werden diese von main.js
// global_timecaptain.tools.getAllRecords
// global_timecaptain.tools.addRecord
// global_timecaptain.tools.deleteRecord
// global_timecaptain.tools.deleteAllRecords


global_timecaptain.tools = {}



	
		
	/*get customer name
	global_timecaptain.tools.getCustomerName = function(id){
		var databasetwo = global_timecaptain.init.db;
		databasetwo.transaction(function(tx){
			tx.executeSql("SELECT * FROM customers WHERE ID=?", [id], function(tx,result){
				for (var k=0; k < result.rows.length; k++) {
					var return_customer_name = result.rows.item(k).customer_name;
					return return_customer_name;
				}
			});
		});
	}*/
	

// FUNCTION ADD RECORD /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// adding record
// $displayStartTime, $displayStopTime, $Test_Customer, $Test_Project, $Test_Function
	global_timecaptain.tools.addRecord = function(temp_start_time, temp_stop_time){		
		//alert('addRecord');
		var database = global_timecaptain.init.db;
		database.transaction(function(tx){
			 tx.executeSql("INSERT INTO records (start_time,stop_time,customer,project,activity) VALUES (?,?,?,?,?)", [temp_start_time,temp_stop_time,$temp_customer_selected,$temp_project_selected,$temp_activity_selected]);
			//tx.executeSql("INSERT INTO records (start_time,stop_time,customer,project,activity) VALUES ('55','66','77','88','99')", []);
			
			 //global_timecaptain.tools.getAllRecords();
		});
	}
// FUNCTION ADD RECORD END /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
		
		
		
// FUNCTION DELETE SINGLE RECORD ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// deleting a record 
	global_timecaptain.tools.deleteRecord = function(id){
		var database = global_timecaptain.init.db;
		database.transaction(function(tx){
			tx.executeSql("DELETE FROM records WHERE ID=?",[id]);
		});
	}
// FUNCTION DELETE SINGLE RECORD END ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


	
// FUNCTION DELETE ALL RECORDS /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// deleting all records
	global_timecaptain.tools.deleteAllRecords = function(){
		var database = global_timecaptain.init.db;
		database.transaction(function(tx){
			//tx.executeSql("DROP TABLE IF EXISTS records", []);
			tx.executeSql("DELETE FROM records", []);			
		});
	}
// FUNCTION DELETE ALL RECORDS END /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	
// TOOL FUNCTIONS END //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////	
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////





