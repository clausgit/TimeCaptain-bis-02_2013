
var $temp_message = '';


	global_timecaptain.tools.getAllRecords = function($temp_message){

		alert($temp_message);
			
		/*$('#list_off_all_records').html('');
		$('#list_off_all_records').trigger('create');*/
		
		var database = global_timecaptain.init.db;
		database.transaction(function(tx){
							
			tx.executeSql("SELECT * FROM records", [], function(tx,result){
				
				alert('Anzahl: ' + result.rows.length);
				
				for (var i=0; i < result.rows.length; i++) {
					
					var temp_id = result.rows.item(i).ID;
					var temp_start_time = result.rows.item(i).start_time;
					var temp_stop_time = result.rows.item(i).stop_time;
					var temp_customer = result.rows.item(i).customer;
					var temp_project = result.rows.item(i).project;
					var temp_activity = result.rows.item(i).activity;
					
					alert('Customer ID: ' + temp_customer)
					
					/*var StartTime = new Date(temp_start_time);
					var temp_view_start_month = StartTime.getMonth() + 1;
					var temp_view_start_day = StartTime.getDate();
					var temp_view_start_year = StartTime.getFullYear();
					var temp_view_start_hours = StartTime.getHours() + 1;
					var temp_view_start_minutes = StartTime.getMinutes();
					var temp_view_start_seconds = StartTime.getSeconds();
					var temp_view_start_time = temp_view_start_month + '.' + temp_view_start_day + '.' + temp_view_start_year + '&nbsp;' + temp_view_start_hours + ':' + temp_view_start_minutes + ':' + temp_view_start_seconds + ' Uhr';
					

					
					var StopTime = new Date(temp_stop_time);
					var temp_view_stop_month = StopTime.getMonth() + 1;
					var temp_view_stop_day = StopTime.getDate();
					var temp_view_stop_year = StopTime.getFullYear();
					var temp_view_stop_hours = StopTime.getHours() + 1;
					var temp_view_stop_minutes = StopTime.getMinutes();
					var temp_view_stop_seconds = StopTime.getSeconds();
					var temp_view_stop_time = temp_view_stop_month + '.' + temp_view_stop_day + '.' + temp_view_stop_year + '&nbsp;' + temp_view_stop_hours + ':' + temp_view_stop_minutes + ':' + temp_view_stop_seconds + ' Uhr';
					*/

										
					//var temp_customer_name_list_view = 'wergwdg';	
					//$temp_customer_name_list_view = 'DDDDDDDD';			
					//$temp_customer_name_list_view = global_timecaptain.init.getCustomerName(temp_customer);
					
					var temp_customer_name_list_view = '';		
					
					var databasetwo = global_timecaptain.init.db;
					
					//alert(i + ' ' + temp_customer);	
						
						databasetwo.transaction(function(tx){
							tx.executeSql("SELECT * FROM customers WHERE ID=?", [temp_customer], function(tx,result){
									temp_customer_name_list_view = result.rows.item(0).customer_name;	
									alert('Kundenname: ' + temp_customer_name_list_view);		
							});
						});

					
					//$temp_customer_name_list_view = 'Aachener';
					

					/*$('#list_off_all_records').append(
						'<li>' +
						'Start: ' + temp_view_start_time + ' ' +
						'Stop: ' + temp_view_stop_time + '<br>' +
						'Kunde: ' + $temp_customer_name_list_view  + ' ' +
						'Projekt: ' + temp_project + ' ' +
						'Tätigkeit: ' + temp_activity + ' ' +
						'</li>');*/
						
					alert(i + ' ' + temp_customer);
					
					$('#list_off_all_records').delay(0).listview('refresh');	
					//$('#list_off_all_records').trigger('create');

					//temp_customer_name_list_view = '';
					
				}
			});
		});
	}
// FUNCTION GET ALL RECORDS END ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
