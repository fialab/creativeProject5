function getListings(){
        $.getJSON("item", function(data) {
        console.log(data);
        var everything = "<ul class='list-group'>";
        for(var things in data) {
          com = data[things];
          everything += 
          ` <li style="
            width: 100%;
            height: 130px;
            list-style-type: none;
            padding: 16px;
            border-radius: 4px;
            box-shadow: 1px 1px 4px #bbb;
            margin-bottom: 20px;
        "> 
            <div style="
                width: 100%; 
                display:flex; 
                flex-direction: row; 
                justify-content: 
                space-between;
                font-size: 1rem"
                >
                <div>
                  <div style="font-size: 1.3rem;"><strong>${com.item}</strong></div>
                  Seller: ${com.sellerName}
                </div>
                <div style="
                  display: flex;
                  flex-direction: row;
                  align-items: flex-start;
                ">
                  Price: $${com.price}
                  <div style="margin-left: 10px;margin-top: -3px;" onclick="deleteComment('${com._id}')">
                    <svg style="width:24px;height:24px" viewBox="0 0 24 24">
                        <path fill="#aaa" d="M9,3V4H4V6H5V19A2,2 0 0,0 7,21H17A2,2 0 0,0 19,19V6H20V4H15V3H9M7,6H17V19H7V6M9,8V17H11V8H9M13,8V17H15V8H13Z" />
                    </svg>
                  </div>
                </div>
            </div>
            
                  <div style="margin-top: auto; font-style: italic; font-size: .8rem; color: grey;">
                    ${com.location}
                  </div>
        </li>`;
        }
        everything += "</ul>";
        console.log(everything);
        $("#items").html(everything);
        });
    }
    
 function deleteComment(id) {
      var myobj = {
        sellerName: $("#name").val(),
        item: $("#item").val(),
        imageURL: $("#image").val(),
        location: $("#location").val(),
        price: $("#price").val(),
      };
      jobj = JSON.stringify(myobj);
      $("#json").text(jobj);
      
      var url = "item/" + id;
      $.ajax({
      url:url,
      type: "DELETE",
      data: jobj,
      contentType: "application/json; charset=utf-8",
      success: function(data,textStatus) {
          $("#done").html(textStatus);
      },
      complete:getListings()
      
    })
  }

$(document).ready(function(){
  
 
  
   
   
    getListings();
  
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
      },
      complete:getListings()
      
    })
  });
  
  
  
  // $("#getItems").click(function() {
  //   var URL = "item?q=" + $("#usercomments").val();
  //   console.log(URL);
  //   $.getJSON(URL, function(data) {
  //     console.log(data);
  //     var everything = "<ul class='list-group'>";
  //     for(var comment in data) {
  //       com = data[comment];
  //       everything += "<li class='list-group-item'> <strong>" + com.Name + "</strong><br>" + com.Price + "</li>";
  //     }
  //     everything += "</ul>";
  //     $("#items").html(everything);
  //   })
  // });
  
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

