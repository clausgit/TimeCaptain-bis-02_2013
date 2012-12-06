
	


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


	$(document).ready(function() {
	 	timecaptain.init.buildCustomerMenu();
		timecaptain.init.buildProjectMenu();
		timecaptain.init.buildActivityMenu();
	});













