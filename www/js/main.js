var $currTime = 0;
var $displayStartTime = 0;
var $displayStopTime = 0;

var $temp_customer_selected_id = 1;
var $temp_customer_selected_name = 'Kunde';
var $temp_project_selected_id = 1;
var $temp_project_selected_name = 'Projekt';
var $temp_activity_selected_id = 1;
var $temp_activity_selected_name = 'Tätigkeit';

var $globalSingleViewID = 0;

$(document).ready(function() {
	global_timecaptain.init.open();
	global_timecaptain.init.createTable();
	global_timecaptain.init.buildCustomerMenu();
	global_timecaptain.init.buildProjectMenu();
	global_timecaptain.init.buildActivityMenu();
	global_timecaptain.tools.getAndShowAllRecords();
	
	$("a[href=#page_3]").live("click", function(e) {
		$globalSingleViewID = $(this).data("single_view_id");   
	});

	$('#clock').simpleClock();
	$('#counter').html('<span id="counter" class="counter counter-analog2" data-format="59 99" data-direction="up" ></span>').trigger('create');
	$('.counter').counter();
	
	$('#start_stop_button').on('click',function(){
		if ($temp_customer_selected_id == 0) {alert('Bitte wählen Sie einen Kunden aus.');}
		else if ($temp_project_selected_id == 0) {alert('Bitte wählen Sie ein Projekt aus.');}		
		else if ($temp_activity_selected_id == 0) {alert('Bitte wählen Sie eine Tätigkeit aus.');} else {
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
				global_timecaptain.tools.addRecord($displayStartTime, $displayStopTime);
				
				$("#start_stop_button .ui-btn-text").html('<br>Start<br><br>');
				//$('#start_stop_button').attr('data-theme', 'a').removeClass('ui-body-b').addClass('ui-body-a').trigger('create');
				$displayStartTime = 0;
				global_timecaptain.tools.getAndShowAllRecords(); 
			}	
		}			
	});

		
	// onClick deleteEvent Handler
	//$('#delete').live("click",function(){
	//	var id = $(this).closest('li').find('#this_id').val();
	//	global_timecaptain.tools.deleteRecord(id);
	//	global_timecaptain.tools.getAllRecords()
	//});
	
	
	$('#delete_all_button').on('click',function(){
		global_timecaptain.tools.deleteAllRecords();	
		$('#list_off_all_records').html('');
	});

	// Auswahl der Listen Kunde, Projekt und Tätigkeit
	$("#select-customer").change(function() {
		$temp_customer_selected_id = $(this).val();

		var database_customer_name = global_timecaptain.init.db;
		database_customer_name.transaction(function(tx){
			tx.executeSql("SELECT * FROM customers WHERE ID=?", [$temp_customer_selected_id], function(tx,result){
				$temp_customer_selected_name = result.rows.item(0).customer_name;	
						//alert($temp_customer_selected_name);
			});
		});
		
		});
		
		
		
	$("#select-project").change(function() {
		$temp_project_selected_id = $(this).val();
		
		var database_project_name = global_timecaptain.init.db;
		database_project_name.transaction(function(tx){
			tx.executeSql("SELECT * FROM projects WHERE ID=?", [$temp_project_selected_id], function(tx,result){
				$temp_project_selected_name = result.rows.item(0).project_name;	
						//alert($temp_project_selected_name);
			});
		});
		
		});
		
		
		
		
	$("#select-activity").change(function() {
		$temp_activity_selected_id = $(this).val();
		
		var database_activity_name = global_timecaptain.init.db;
		database_activity_name.transaction(function(tx){
			tx.executeSql("SELECT * FROM activities WHERE ID=?", [$temp_activity_selected_id], function(tx,result){
				$temp_activity_selected_name = result.rows.item(0).activity_name;	
						//alert($temp_activity_selected_name);
			});
		});
		
		});
		
});


$( '#page_3' ).live( 'pagebeforeshow',function(event, ui){	
	//alert('Hallo');
	$('a[href=#page_3]').unbind();
	$('a[href=#page_4]').unbind();
	global_timecaptain.tools.showSingleRecord(); 
});








