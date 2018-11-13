$(document).ready(function(){
  $("#postItem").click(function(e){
      e.preventDefault();
      var myobj = {
        sellerName: $("#name").val(),
        item: $("#item").val(),
        imageURL: $("#image").val(),
        location: $("#location").val(),
        price: $("#price").val(),
      };
      jobj = JSON.stringify(myobj);
      $("#json").text(jobj);
      
      var url = "item";
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
  
  $("#getItems").click(function() {
    var URL = "item?q=" + $("#usercomments").val();
    console.log(URL);
    $.getJSON(URL, function(data) {
      console.log(data);
      var everything = "<ul class='list-group'>";
      for(var comment in data) {
        com = data[comment];
        everything += "<li class='list-group-item'> <strong>" + com.Name + "</strong><br>" + com.Price + "</li>";
      }
      everything += "</ul>";
      $("#items").html(everything);
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

