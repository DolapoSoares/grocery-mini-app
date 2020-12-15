$(document).ready(function () {
  const groceryList = $("#grocery-list");
  const displayGrocery = (id, item, quantity, unitPrice, currentItemTotal) => {
    groceryList.append(`
      <tr id=${id} style='tr:nth-child(even) {background-color: #f2f2f2;}'>
        <td>${item}</td>
        <td>${quantity}</td>
        <td>${unitPrice}</td>
        <td>${currentItemTotal}</td>
        <td><button class="edit" style="color:white;background:green">Edit</button></td>
        <td><button class="remove" style="color:white;background:red">Delete</button></td>
      </tr>
    `);
  }

  // retrieve from localStorage
  let savedGroceries = JSON.parse(localStorage.getItem("groceries")) || [];
  let overallTotal = JSON.parse(localStorage.getItem("overallTotal")) || 0;
  savedGroceries.forEach(({id, item, quantity, unitPrice, currentItemTotal}) => {
    displayGrocery(id, item, quantity, unitPrice, currentItemTotal);
  });
  $("#total-amt").text(overallTotal);

  $("#submit-btn").click(function() {
    const item = $("#grocery").val();
    const quantity = $("#quantity").val();
    const unitPrice = $("#amount").val();
    const currentItemTotal = quantity * unitPrice;
    const id = String(Date.now());
    displayGrocery(id, item, quantity, unitPrice, currentItemTotal);
    $("#amount").val("");
    $("#quantity").val("");
    $("#grocery").val("");
    const currentOverallTotal = $("#total-amt").text();
    const updatedTotal =
      parseInt(currentOverallTotal, 10) + parseInt(currentItemTotal, 10);
    $("#total-amt").text(updatedTotal);

    // save to localStorage
    savedGroceries.push({id, item, quantity, unitPrice, currentItemTotal});
    localStorage.setItem("groceries", JSON.stringify(savedGroceries));
    localStorage.setItem("overallTotal", updatedTotal);
  });

  $(document).on("click", "button.remove", function() {
    const currentOverallTotal = $("#total-amt").text();
    const updatedTotal =
      parseInt(currentOverallTotal, 10) -
      parseInt(
        $(this)
          .parent()
          .parent()
          .children()[3].innerText,
        10
      );
    $("#total-amt").text(updatedTotal);
    const par = $(this).parent().parent();
    const itemId = par[0].id;
    par.remove();
    savedGroceries = savedGroceries.filter(({ id }) => id !== itemId);
    localStorage.setItem("groceries", JSON.stringify(savedGroceries));
    localStorage.setItem("overallTotal", updatedTotal);
  });

  $(document).on("click", "button.edit", function() {
    const par = $(this).parent().parent();
    const tdList = par.children("td:nth-child(1)");
    const tdQuantity = par.children("td:nth-child(2)");
    const tdUnitPrice = par.children("td:nth-child(3)");
    const tdButtons = par.children("td:nth-child(5)");
    tdList.html("<input type='text' id='txtList' value='" + tdList.html() + "'/>");
    tdQuantity.html("<input type='number' id='txtQty' min='1' value='" + tdQuantity.html() + "'/>");
    tdUnitPrice.html("<input type='number' id='txtPrice' min='1' value='" + tdUnitPrice.html() + "'/>");
    tdButtons.html("<button class='save' style='color:white;background:blue'>Save</button>");
  });

  $(document).on("click", "button.save", function() {
    const par = $(this).parent().parent();
    const id = par[0].id;
    const tdList = par.children("td:nth-child(1)");
    const tdQuantity = par.children("td:nth-child(2)");
    const tdUnitPrice = par.children("td:nth-child(3)");
    const tdTotalPrice = par.children("td:nth-child(4)");

    const item = tdList.children("input[type=text]").val()
    const quantity = tdQuantity.children("input[type=number]").val();
    const unitPrice = tdUnitPrice.children("input[type=number]").val();
    const totalPrice = tdTotalPrice[0].innerText;

    tdList.html(item);
    tdQuantity.html(quantity);
    tdUnitPrice.html(unitPrice);
    const currentItemTotal = quantity * unitPrice;
    tdTotalPrice.html(currentItemTotal);

    const tdButtons = par.children("td:nth-child(5)");
    tdButtons.html("<button class='edit' style='color:white;background:green'>Edit</button>");
    const currentOverallTotal = $("#total-amt").text();

    const updatedTotal =
      parseInt(currentOverallTotal, 10) - parseInt(totalPrice, 10) + parseInt(currentItemTotal, 10);

    $("#total-amt").text(updatedTotal);
    $.each(savedGroceries, function() {
      if (this.id === id) {
        this.item = item;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.currentItemTotal = currentItemTotal;
      }
    });
    localStorage.setItem("groceries", JSON.stringify(savedGroceries));
    localStorage.setItem("overallTotal", updatedTotal);
  });
});