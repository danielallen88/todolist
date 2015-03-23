// Viewmodel - JavaScript that defines the data and behavior of UI
var _ToDoViewModel = function() {
    var self = this;
    
    //Observable array contains item/object of todo list
    self.todoList = ko.observableArray([
    									{
    										"Title":"Walk the dog", 
    										"Date":"05/22/2013"
    									},
    									{
    										"Title":"Buy groceries", 
    										"Date":"07/20/2013"
    									}
    								]);
    
    //Date formatter
    self. dateFormat = function(date, format) {
	    format = format.replace("DD", (date.getDate() < 10 ? '0' : '') + date.getDate());
	    format = format.replace("MM", (date.getMonth() < 9 ? '0' : '') + (date.getMonth() + 1));
	    format = format.replace("YYYY", date.getFullYear());
	    return format;
	}
    
    //Add new task/object to list
    self.addToDo = function() {
    	var today = self.dateFormat(new Date(), 'MM/DD/YYYY');
    	var txtDate = $.trim($('#text_date').val());
    	
		if(txtDate >= today){
			var task = {
	    					"Title": $.trim($('#text_title').val()), 
	    					"Date": $('#text_date').val()
	    				};
	
	    	if(self.todoList.push(task)){
	    		$('#new_item_container').hide();
	    		$('#todoList').sortTodo("Title");
	    		$('#menuBar ul li a').removeClass('selected');
	    	}else{
	    		alert("Unable to add item!!!");
	    	}
		}else{
			alert("Please enter a valid date.");
		}
    };
};

var ToDoViewModel = new _ToDoViewModel();

//jQuery custom function for sorting knockout observableArray by Title/Date
$.fn.sortTodo = function(sortBy) { 
    ToDoViewModel.todoList.sort(function(a, b) {
		if(sortBy == "Title"){
			var _a = a.Title, _b = b.Title;
		}else if(sortBy == "Date"){
			var _a = a.Date, _b = b.Date;
		}
	    
	    if(_a == _b) return 0;
	    return _a > _b ? 1 : -1;
	}); 
};

//jQuery document ready
$(function(){
	// Activates knockoutjs
	ko.applyBindings(ToDoViewModel);
	
	//Initiate default sorting
	$('#todoList').sortTodo("Title");
	
	//Sort by date
	$('#sortByDate').click(function(){
		$('#menuBar ul li a').removeClass('selected');
		$(this).addClass("selected");
		$('#todoList').sortTodo("Date");
		$('#new_item_container').hide();
	});
	
	//Show add new
	$('#addNew').click(function(){
		if(ToDoViewModel.todoList().length < 4){
			$('#menuBar ul li a').removeClass('selected');
			$(this).addClass("selected");
			$('input[type="text"]').val("");
			$('#new_item_container').show();
		}else{
			alert("Unable to add new item. Limit reached.");
		}
	});
	
	//Perform add new
	$('#newItem').submit(function(){
		ToDoViewModel.addToDo();
		return false;
	});
});