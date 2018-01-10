function showIndividualEvent(id){
        $("span.dayNum:not(:empty)").parent().off();
        $(".tempEd").removeClass("tempEd");
        $("#"+id).addClass("tempEd");
        if(!$("#"+id).hasClass("task"))
        {
            $("#eventEditor").html(
                
                    "<p class='directions'>click view events to go back to selecting days</p>"+
                                "<p>Event Title: "+$("#"+id+" .eventTitle").text()+"</p>"+
                                "<p>Event date: "+$("#"+id+" .eventDate").text()+"</p>"+
                                "<p>Event time: "+$("#"+id+" .eventTime").text()+"</p>"+
                                "<p>Time Event was created: "+$("#"+id+" .eventTimeCreated").text()+"</p>"+
                                "<p>Event blurb: "+$("#"+id+" .eventBlurb").text()+"</p>"
            );
        } else{
            $("#eventEditor").html(
                
                    "<p id='correspondsTo"+id+"' class='directions'>click view events to go back to selecting days</p>"+
                                "<p>Task Title: "+$("#"+id+" .eventTitle").text()+"</p>"+
                                "<p>Task due date: "+$("#"+id+" .eventDate").text()+"</p>"+
                                "<p>Task due by: "+$("#"+id+" .eventTime").text()+"</p>"+
                                "<p>Time task was created: "+$("#"+id+" .eventTimeCreated").text()+"</p>"+
                                "<p>Event blurb: "+$("#"+id+" .eventBlurb").text()+"</p>" +
                                "<p><label for=complete>I have completed this task!</label>" + 
                                "<input type='checkbox' name='iscomplete' id='complete' /> </p>"
            );
            if($("#"+id).hasClass('completed')) 
            {
                alert('actual real tears');
                $('#complete').prop('checked', true);
            }
            $("#complete").on("click",completeTask);
        }
        

}
function editIndividualEvent(id){
        $("span.dayNum:not(:empty)").parent().off();
        $(".tempEd").removeClass("tempEd");
        $("#"+id).addClass("tempEd");
        $("#eventEditor").html(
                
			"<p class='directions'>Enter new values to edit your event</p>"+
                        "<p>Event Title: "+$("#"+id+" .eventTitle").text()+"<input type='text' name='title' id='title' maxlength='255' /></p>"+
                        "<p>Event date: "+$("#"+id+" .eventDate").text()+ "<span id='dateSetting'>-- select a new date to change the date this event is set for!</span></p>"+
                        "<p>Event time: "+$("#"+id+" .eventTime").text()+"<input type='time' name='time' id='time' /> </p>"+
                        "<p>Event blurb: "+$("#"+id+" .eventBlurb").text()+"<input type='text' name='blurb' id='blurb' maxlength='1000' /></p>"+
                        "<p id='editEventContainer'><input id='editEventButton' class='submitChange editEvents' type='submit' value='Edit your Event!' /></p>"
	);
        $("#editEventButton").on("click",editEvent);
        $("span.dayNum:not(:empty)").parent().on("click",function(){
                dateNum = $(this).children("span").text();
                $("td.tempEdit").removeClass("tempEdit");
                $(this).addClass("tempEdit");
                $("#createEventContainer").removeClass("hide");
                $("#dateSetting").text(" The event will be set for the "+dateNum+ "th, click another date to change the day it is set for");
        });
        $("#"+id).parent().on("click",function(){
                $("td.tempEdit").removeClass("tempEdit");
                $("#dateSetting").text(" The event will be set for the "+dateNum+ "th-- select a new date to change the date this event is set for!");
        });
}
function addFunctionality(){
        $("#current_mode").text("Add Events");
        $("#current_mode").removeClass();
        $("#current_mode").addClass("addEvent");
        
        //toggles button appearance
        
        $(".selected").removeClass("selected");
        $("#AddEvent").addClass("selected");
                $("#eventEditor").removeClass("hide");
                $(".tempDel").removeClass("tempDel");
                $(".tempEd").removeClass("tempEd");
                $("#eventEditor").removeClass();              
                $("#eventEditor").addClass("addingEditor");
                $("span.dayNum:not(:empty)").parent().off();
                $("span.dayNum:not(:empty)").parent().children("p").off();
                $("#eventEditor").html(
			"<p class = 'addFields'><label for='title'>Title: </label>"+
                        "<input type='text' name='title' id='title' maxlength='255' /></p>"+
			"<p class = 'addFields'><label for='time'>What Time: </label>"+
			"<input type='time' name='time' id='time' /> </p>"+
            "<p class = 'addFields'><label for='blurb'>Description: </label><input type='text' name='blurb' id='blurb' maxlength='1000' /></p>"+
            "<p class = 'addFields'><label for=task>This is a task</label>" +
            "<input type='checkbox' name='istask' id='task' /> </p>"+
			"<p id='createEventContainer' class='hide'><input id='createEventButton' class='submitChange addEvent' type='submit' value='Create your Event!' /></p>"+
			"<p id='addDirections' class='directions'>Click on a day to select a date for your event!</p>"
		);
                $("#createEventButton").on("click",makeEvent);
                $("span.dayNum:not(:empty)").parent().on("click",function(){
                        dateNum = $(this).children("span").text();
                        $(".temp").removeClass("temp");
                        $(this).addClass("temp");
                        $("#createEventContainer").removeClass("hide");
                        $("#addDirections").text("The event will be set for the "+dateNum+ "th");
                });
                
  }
 
 function  viewFunctionality(){
                //sets visuals for view mode
        $("#current_mode").text("View Events");
        $("#current_mode").removeClass();
        $("#current_mode").addClass("viewOnly");
        
        //toggles button appearance
        $(".selected").removeClass("selected");
        $("#ViewEvents").addClass("selected");

	$("span.dayNum:not(:empty)").parent().off();
        $("span.dayNum:not(:empty)").parent().children("p").off();
        $(".temp").removeClass("temp");
        $("#eventEditor").removeClass("hide");
        $(".tempDel").removeClass("tempDel");
        $("#eventEditor").removeClass();  
        $("#eventEditor").addClass("viewingEditor");
        $("#eventEditor").html(
                        "<p id='editDirections' class='directions'>Click on a day to view that day</p>"
	);
                $("span.dayNum:not(:empty)").parent().on("click",function(){
                        

                        dateNum = $(this).children("span").text();
                        $(".tempEd").removeClass("tempEd");
                        $(this).addClass("tempEd");
                        //$("#createEventContainer").removeClass("hide");
                        $("#editDirections").html("<p id='editDirections' class='directions'>selected the "+dateNum+ "th");
                        $(this).children("p").each(function(){
                                
                                //sets event variables
                                var eventId = $(this).attr('id');
                                dateNum = $(this).parent().children("span").text();
                                var eventTime = $(this).children(".eventTime").text();
                                var eventName = escapeHtml($(this).children(".eventTitle").text());
                	 

                                $("#editDirections").append("<p>At "+eventTime+" you have: <input class='submitChange viewOnly eventSelect' type='submit' value='"+eventName+"' /></p>");
                                $("#editDirections").children().children(".eventSelect").on("click",function(){showIndividualEvent(eventId);});
                        });        

                });
                
                
  }
         
                
  

 function  deleteFunctionality(){
        $("#current_mode").text("Delete Events");
        $("#current_mode").removeClass();
        $("#current_mode").addClass("deleteEvent");
        
        //toggles button appearance
        $(".selected").removeClass("selected");
        $("#DeleteEvent").addClass("selected");

	$("span.dayNum:not(:empty)").parent().off();
        $("span.dayNum:not(:empty)").parent().children("p").off();
        $(".temp").removeClass("temp");
        $(".tempEd").removeClass("tempEd");
	$("#eventEditor").removeClass("hide");
        $("#eventEditor").removeClass();       
        $("#eventEditor").addClass("deletingEditor");
        $("#eventEditor").html(
                        "<p id='eventTitle'>Event Title: </p>"+
                        "<p id='eventDate'>Event Day: </p>"+
			"<p id='eventTime'>Event Time: </p>"+
			"<p id='deleteEventContainer' class='hide'><input id='deleteEventButton' class='submitChange deleteEvent' type='submit' value='Delete This Event!' /></p>"+
			"<p id='deleteDirections' class='directions'>Click on an event you wish to delete!</p>"
	);
                $("#deleteEventButton").on("click",deleteEvent);
                $("span.dayNum:not(:empty)").parent().children("p").on("click",function(){
                        
                        //sets Event appearance in calendar
                        $(".tempDel").removeClass("tempDel");
                        $(this).addClass("tempDel");
                        
                        //sets date variables
                        dateNum = $(this).parent().children("span").text();
                        var eventTime = $(this).children(".eventTime").text();
                        var eventName = $(this).children(".eventTitle").text();
                        
                        //sets availible UI
                        $("#deleteEventContainer").removeClass("hide");
                        $("#eventTitle").text("Event Title: "+eventName);
                        $("#eventDate").text("Event Day: "+dateNum);
                        $("#eventTime").text("Event Time: "+eventTime);
                        $("#deleteDirections").text("Click the button to delete event: "+eventName);
                });

  }
  
  
 
   function  editMode(){
        
        $("#current_mode").text("Editing Events");
        $("#current_mode").removeClass();
        $("#current_mode").addClass("editEvents");
        
        //toggles button appearance
        $(".selected").removeClass("selected");
        $("#DeleteEvent").addClass("selected");

	$("#eventEditor").removeClass("hide");
        $("span.dayNum:not(:empty)").parent().off();
        $("span.dayNum:not(:empty)").parent().children("p").off();
        $(".selected").removeClass("selected");
        $("#EditEvents").addClass("selected");
        $(".temp").removeClass("temp");
        $(".tempEd").removeClass("tempEd");
        $(".tempDel").removeClass("tempDel");
        $("#eventEditor").removeClass();  
        $("#eventEditor").addClass("editingEditor");
        $("#eventEditor").html(

			"<p class='directions'>Click an event you wish to edit!</p>"
                
	);
        
                        $("span.dayNum:not(:empty)").parent().children("p").on("click", function(){
                                
                                //sets event variables
                                var eventId = $(this).attr('id');
                                editIndividualEvent(eventId);
                        }); 
        
        $("span.dayNum:not(:empty)").parent().on("click",function(){
                        
        });        

}
     
   function  taskMode(){
        $("#current_mode").text("View Current Tasks");
        $("#current_mode").removeClass();
        $("#current_mode").addClass("viewTasks");
        
        //toggles button appearance
        $(".selected").removeClass("selected");
        $("#DeleteEvent").addClass("selected");

        
	$("#eventEditor").removeClass("hide");
        $("span.dayNum:not(:empty)").parent().off();
        $("span.dayNum:not(:empty)").parent().children("p").off();
        $(".selected").removeClass("selected");
        $("#ViewTasks").addClass("selected");
        $(".temp").removeClass("temp");
        $(".tempEd").removeClass("tempEd");
        $(".tempDel").removeClass("tempDel");
        $("#eventEditor").removeClass();  
        $("#eventEditor").addClass("taskEditor");
        $("#eventEditor").html(
                "<p><input id='hideCompleted' class='submitChange viewTasks' type='submit' value='Hide Completed Tasks' /></p>"+
                "<p><input id='showCompleted' class='submitChange viewTasks hide' type='submit' value='Show Completed Tasks' /></p>"
         );
        
        viewTasks();
        
        $("#hideCompleted").on("click",function(){
                $(this).addClass("hide");
                $("#showCompleted").removeClass("hide");
                $(".completed").addClass("hide");
                
        });
        $("#showCompleted").on("click",function(){
                $(this).addClass("hide");
                $("#hideCompleted").removeClass("hide");
                $(".completed").removeClass("hide");
        }); 

}  
//////////taken from mustache.js https://github.com/janl/mustache.js/blob/master/mustache.js#L60
var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHtml (string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}
 $( document ).ready(function(){
                

                
		
 });