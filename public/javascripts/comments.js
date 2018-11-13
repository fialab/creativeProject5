$(document).ready(function(){
  $("#postComment").click(function(e){
      e.preventDefault();
      var myobj = {Name:$("#name").val(),Comment:$("#comment").val()};
      jobj = JSON.stringify(myobj);
      $("#json").text(jobj);
      
      var url = "comment";
      $.ajax({
      url:url,
      type: "POST",
      data: jobj,
      contentType: "application/json; charset=utf-8",
      success: function(data,textStatus) {
          $("#done").html(textStatus);
      }
    })
  });
  
  $("#getComments").click(function() {
    var URL = "comment?q=" + $("#usercomments").val();
    console.log(URL);
    $.getJSON(URL, function(data) {
      console.log(data);
      var everything = "<ul class='list-group'>";
      for(var comment in data) {
        com = data[comment];
        everything += "<li class='list-group-item'> <strong>" + com.Name + "</strong><br>" + com.Comment + "</li>";
      }
      everything += "</ul>";
      $("#comments").html(everything);
    })
  });
  
  $("#deleteComments").click(function(){
  console.log("delete comment attempt");
  $.ajax({
      url:"delete",
      type: "DELETE",
      data: '',
      contentType: "application/json; charset=utf-8",
      success: function(data,textStatus) {
          $("#done").html(textStatus);
      }
    })
  
  });
  

  
});

