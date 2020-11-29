$(document).ready(function () {
  
    $("#submit-btn").click(function() {
       const currentItemTotal = $('#Amount').val() * $('#quantity').val();
       $("#grocery-list").append(`
         <tr style='tr:nth-child(even) {background-color: #f2f2f2;}'>
             <td>${$('#grocery').val()}</td>
             <td>${$('#quantity').val()}</td>
             <td>${currentItemTotal}</td>
             <td><button class="remove" style="color:white;background:red">Delete</button></td>
        </tr>
      `);
      $('#Amount').val('');
      $('#quantity').val('');
      $('#grocery').val('');
      const currentOverallTotal = $("#total-amt").text();
      const updatedTotal = parseInt(currentOverallTotal, 10) + parseInt(currentItemTotal, 10);
      $("#total-amt").text(updatedTotal);

      localStorage.setItem("newArr", JSON.stringify(updatedTotal));
    });
    
    $(document).on("click", "button.remove", function(){  
      const currentOverallTotal = $("#total-amt").text();
      const updatedTotal = parseInt(currentOverallTotal, 10) - parseInt($(this).parent().parent().children()[2].innerText, 10);
      $("#total-amt").text(updatedTotal);
      $(this).parent().parent().remove(); 
    })
    
   ;  
   
});