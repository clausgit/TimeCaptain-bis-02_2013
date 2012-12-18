var $globalSingleViewID = '';



$(document).ready(function() {

	timecaptain.init.open();
	timecaptain.init.createTable();
	timecaptain.init.getAllRecords();
	
	$("a[href=#page_2]").live("click", function(e) {
		$globalSingleViewID = $(this).data("single_view_id");   
	});
	
	
	

	
	
	/*$('#update_data').click(function(){
		var temp_new_id = $('#id').val();
		var temp_new_name = $('#name').val();
		alert('Die neue ID lautet:' + temp_new_id + '<br><br>Der neue Kundenname lautet: ' + temp_new_name)
		if(todo_item_text.length == '' || todo_due_date.length == '')
		{
			alert('Both fields are required');
		}
		else
		{
			speckyboy.init.addTodo(todo_item_text,todo_due_date);
			$('#todo_item_text').val('');
			$('#todo_due_date').val('');
		}
	});*/
		
});

/*$('#page_2').bind( "pagebeforeload", function( event, data ){
		alert('Hallo');
		//timecaptain.init.showSingleRecord();  	
});*/

$( '#page_2' ).live( 'pagebeforeshow',function(event, ui){	
	//alert('Hallo');
	$('a[href=#page_2]').unbind();
	$('a[href=#page_3]').unbind();
	timecaptain.init.showSingleRecord(); 
});


/*$( '#page_1' ).live( 'pagebeforeshow',function(event, ui){
	$('a[href=#page_2]').unbind('click');
	$('a[href=#page_3]').unbind('click');
});*/






