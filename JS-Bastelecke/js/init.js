


var timecaptain = {}
timecaptain.init = {}
timecaptain.init.db = {}

timecaptain.init.open = function(){
	timecaptain.init.db = openDatabase("basteldatabase","1.0","Bastel Database",5 * 1024 * 1024);
	// dbname, verison, desc, size
}

timecaptain.init.createTable = function(){
	var database = timecaptain.init.db;
	database.transaction(function(tx){
		tx.executeSql("CREATE TABLE IF NOT EXISTS customers (ID INTEGER, customer_name VARCHAR, customer_projects VARCHAR)", []);
		tx.executeSql("DELETE FROM customers", []);
		tx.executeSql("INSERT INTO customers (ID,customer_name) VALUES (1,'Stadtwerke Köln')", []);
		tx.executeSql("INSERT INTO customers (ID,customer_name) VALUES (2,'Aachener Versicherungen')", []);
		tx.executeSql("INSERT INTO customers (ID,customer_name) VALUES (3,'Freiburger Bauamt')", []);
		tx.executeSql("INSERT INTO customers (ID,customer_name) VALUES (4,'Erdinger Brauerei')", []);
	});
}

timecaptain.init.getAllRecords = function(){
	$('#list_off_all_records').html('');

	var database = timecaptain.init.db;	
	database.transaction(function(tx){
		tx.executeSql("SELECT * FROM customers", [], function(tx,result){
			for (var i=0; i < result.rows.length; i++) {				
				var temp_id = result.rows.item(i).ID;
				var temp_name = result.rows.item(i).customer_name;

				$('#list_off_all_records').append(
					'<li><a data-role="button" data-icon="arrow-r" data-iconpos="right" data-transition="flip" href="#page_2" data-single_view_id="' + temp_id + '">' +
					'ID: ' + temp_id + ' ' +
					'Name: ' + temp_name + '</a></li>');
					
				$('#list_off_all_records').listview('refresh');	
			}
		});
	});
}


timecaptain.init.showSingleRecord = function(){

	//alert('call showSingleRecord!!')
	$('#single_view').html('');
	var database = timecaptain.init.db;	
	database.transaction(function(tx){
		tx.executeSql("SELECT * FROM customers WHERE id=?", [$globalSingleViewID], function(tx,result){
			for (var i=0; i < result.rows.length; i++) {				
				var temp_name = result.rows.item(i).customer_name;
				$('#single_view').append('ID: ' + $globalSingleViewID + ' ' + 'Name: ' + temp_name + '<br><br>');
			}
			
			$('#single_view').append('<a data-role="button" data-icon="arrow-r" data-iconpos="right" data-transition="flip" href="#page_3" data-edit_id="' + $globalSingleViewID + ' data-edit_name="' + temp_name +'">Ändern</a><br>');

			$('a[href=#page_3]').unbind();
			$("a[href=#page_3]").bind("click", function(e) {	
				//alert('call showEditRecord!!')
				timecaptain.init.showEditRecord(temp_name);              
			});
			
			$('#single_view').trigger('create');
		});
	});
}





		

timecaptain.init.showEditRecord = function(temp_edit_name){

	$('#edit_form').html('');
	$('#edit_form').append(
		'<input type="text" id="id" value="' + $globalSingleViewID + '"</>' +
		'<input type="text" id="name" value="' + temp_edit_name + '"</>' +
		'<input type="submit" id="save_record" value="Sichern" class="button"/>'
	);

	$('#save_record').unbind();
	$('#save_record').bind("click", function(e) {
		timecaptain.init.saveRecord();
		//alert('call saveRecord!!')
		});
	$('#edit_form').trigger('create');
}


timecaptain.init.saveRecord = function(){
	 
	var temp_save_id = $('#id').val();
	var temp_save_name = $('#name').val();

	var database = timecaptain.init.db;	
	database.transaction(function(tx){		

		tx.executeSql("UPDATE customers set ID=?, customer_name=? where ID=?;", [ temp_save_id, temp_save_name, $globalSingleViewID ]);
		
		$globalSingleViewID = temp_save_id;
		//alert($globalSingleViewID);
	});
	
	
	setTimeout(function(){ timecaptain.init.getAllRecords();}, 2000);
	setTimeout(function(){ timecaptain.init.showSingleRecord();}, 2000);
	setTimeout(function(){ timecaptain.init.showEditRecord(temp_save_name);}, 2000);
	
	
	
}







