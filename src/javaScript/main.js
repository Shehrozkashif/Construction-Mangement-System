import * as firebase from "./firebase.js";

var totalCalBtn = document.getElementById("btn-total-cal");
var saveDataBtn = document.getElementById("btn-save-data");
var editDataBtn = document.getElementById("btn-edit-data");
const projectID = localStorage.getItem("projectID");
totalCalBtn.addEventListener("click", ()=> {
    calculateTotal();
});

saveDataBtn.addEventListener("click", ()=> {
    saveData();
});
editDataBtn.addEventListener("click", ()=> {
    editData();
});
var orders = [];
retrieveData();
function calculateTotal()
{
    if(verifyData())
    {
        var quantity = parseFloat(document.getElementById("quantity").value);
        var price = parseFloat(document.getElementById("price").value);
        
        var div = document.getElementById("output");
        
        div.style.display = "inline-block";
        
        var totalAmount = quantity * price;
        document.getElementById("totalAmount").value = totalAmount.toFixed(2);

        var outputElement = document.getElementById("output");
        outputElement.innerHTML = "<h2>Output</h2>";
        outputElement.innerHTML += "<p>Ordered Date: " + document.getElementById("orderedDate").value + "</p><br><br>";
        outputElement.innerHTML += "<p>Delivery Date: " + document.getElementById("deliveryDate").value + "</p><br><br>";
        outputElement.innerHTML += "<p>Vendor Name: " + document.getElementById("vendorName").value + "</p><br><br>";
        outputElement.innerHTML += "<p>Vendor Mobile: " + document.getElementById("vendorMobile").value + "</p><br><br>";
        outputElement.innerHTML += "<p>Item Name: " + document.getElementById("itemName").value + "</p><br><br>";
        outputElement.innerHTML += "<p>Quantity: " + quantity + "</p><br><br>";
        outputElement.innerHTML += "<p>Price per Item: $" + price.toFixed(2) + "</p><br><br>";
        outputElement.innerHTML += "<p>Total Amount: $" + totalAmount.toFixed(2) + "</p>";
    }
}

async function saveData()
{
    if(verifyData())
    {
        var orderedDate = document.getElementById("orderedDate").value;
        var deliveryDate = document.getElementById("deliveryDate").value;
        var vendorName = document.getElementById("vendorName").value;
        var vendorMobile = document.getElementById("vendorMobile").value;
        var itemName = document.getElementById("itemName").value;
        var quantity = document.getElementById("quantity").value;
        var price = document.getElementById("price").value;
        var totalAmount = document.getElementById("totalAmount").value;
        let category = window.location.href.split('/')[3].split('.')[0];
        // let order = {
        //     "orderedDate": "2023-07-06",
        //     "deliveryDate": "2023-07-20",
        //     "vendorName": "fgdgd",
        //     "vendorMobile": "2432424",
        //     "itemName": "fgfh",
        //     "quantity": "2",
        //     "price": "23",
        //     "totalAmount": "46.00",
        //     "category": category
        // }
            let order = { 

                orderedDate: orderedDate,
                deliveryDate:deliveryDate,
                vendorName:vendorName,
                vendorMobile: vendorMobile,
                itemName: itemName,
                quantity:quantity,
                price: price,
                totalAmount:totalAmount,
                category: category,
                projectID: projectID
            };     
            await firebase.createOrder(order);
            // retrieveData();
            // window.location.replace("./dashboard.html");



        var table = document.getElementById("data-table");

        var newRow = table.insertRow();
        newRow.innerHTML = `<td><input type="text" value="${orderedDate}" class="data-field" ></td><td><input type="text" value="${deliveryDate}" class="data-field"></td><td><input type="text" value="${vendorName}" class="data-field"></td><td><input type="text" value="${vendorMobile}" class="data-field"></td><td><input type="text" value="${itemName}" class="data-field"></td><td><input type="text" value="${quantity}" class="data-field"></td><td><input type="text" value="$${price}" class="data-field"></td><td><input type="text" value="$${totalAmount}" class="data-field"></td>`;
        var dataFields = newRow.getElementsByClassName("data-field");

        for (var i = 0; i < dataFields.length; i++)
        {
            dataFields[i].disabled = true;
        }


    }
}
async function retrieveData(){
    let category = window.location.href.split('/')[3].split('.')[0];
    firebase.getOrders(category, projectID).then((data)=>{
        console.log(data);
        orders = data;
        var table = document.getElementById("data-table");
        orders.forEach(order => {
            var newRow = table.insertRow();
            newRow.innerHTML = `<td><input type="text" value="${order.orderedDate}" class="data-field" ></td>
            <td><input type="text" value="${order.deliveryDate}" class="data-field"></td>
            <td><input type="text" value="${order.vendorName}" class="data-field"></td>
            <td><input type="text" value="${order.vendorMobile}" class="data-field"></td>
            <td><input type="text" value="${order.itemName}" class="data-field"></td>
            <td><input type="text" value="${order.quantity}" class="data-field"></td>
            <td><input type="text" value="$${order.price}" class="data-field"></td>
            <td><input type="text" value="$${order.totalAmount}" class="data-field"></td>`;
            var dataFields = newRow.getElementsByClassName("data-field");
    
            for (var i = 0; i < dataFields.length; i++)
            {
                dataFields[i].disabled = true;
            }
        });
    });

}
function editData()
{
    var dataFields = document.getElementsByClassName("data-field");

    if (dataFields.length > 0 && dataFields[0].disabled === true)
    {
        editDataBtn.innerHTML = "Stop";
        for (var i = 0; i < dataFields.length; i++)
        {
            dataFields[i].disabled = false;
        }
        addDeleteButtons();
    }
    else
    {
        editDataBtn.innerHTML = "Edit";
        for (var i = 0; i < dataFields.length; i++)
        {
            dataFields[i].disabled = true;
        }
        removeDeleteButtons();
    }
}

function addDeleteButtons()
{
    var table = document.getElementById("data-table");
    var rows = table.getElementsByTagName("tr");

    for (let i = 1; i < rows.length; i++)
    {
        var deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Delete";
        deleteButton.classList.add("btn-delete");
        deleteButton.setAttribute("id", i);
        deleteButton.addEventListener("click", function ()
        {
            deleteRow(i, deleteButton);
        });

        var cell = rows[i].insertCell(-1);
        cell.appendChild(deleteButton);
    }
}

function removeDeleteButtons()
{
    var table = document.getElementById("data-table");
    var rows = table.getElementsByTagName("tr");

    for (var i = 1; i < rows.length; i++)
    {
    rows[i].deleteCell(-1);
    }
}

function deleteRow(i, button)
{
    console.log(i);
    firebase.deleteOrder(orders[i-1].uid);
    var row = button.parentNode.parentNode;
    row.parentNode.removeChild(row);
    editData();
}


function verifyData()
{
    var orderedDate = document.getElementById("orderedDate");
    var deliveryDate = document.getElementById("deliveryDate");
    var vendorName = document.getElementById("vendorName");
    var vendorMobile = document.getElementById("vendorMobile");
    var itemName = document.getElementById("itemName");
    var quantity = document.getElementById("quantity");
    var price = document.getElementById("price");

    var isValid = true;
    var errorMessage = "";

    if (!orderedDate.value)
    {
        isValid = false;
        errorMessage += "Please enter the ordered date.\n";
        orderedDate.style.borderColor = "red";
    }
    else
    {
        orderedDate.style.borderColor = "green";
    }

    if (!deliveryDate.value)
    {
        isValid = false;
        errorMessage += "Please enter the delivery date.\n";
        deliveryDate.style.borderColor = "red";
    }
    else
    {
        deliveryDate.style.borderColor = "green";
    }

    if (!vendorName.value)
    {
        isValid = false;
        errorMessage += "Please enter the vendor name.\n";
        vendorName.style.borderColor = "red";	
    }
    else
    {
        vendorName.style.borderColor = "green";
    }

    if (!vendorMobile.value || isNaN(vendorMobile.value))
    {
        isValid = false;
        errorMessage += "Please enter a valid mobile number.\n";
        vendorMobile.style.borderColor = "red";
    }
    else
    {
        vendorMobile.style.borderColor = "green";
    }

    if (!itemName.value)
    {
        isValid = false;
        errorMessage += "Please enter the item name.\n";
        itemName.style.borderColor = "red";
    }
    else
    {
        itemName.style.borderColor = "green";
    }

    if (!quantity.value || isNaN(quantity.value) || quantity.value <= 0)
    {
        isValid = false;
        errorMessage += "Please enter a valid quantity.\n";
        quantity.style.borderColor = "red";	
    }
    else
    {
        quantity.style.borderColor = "green";
    }

    if (!price.value || isNaN(price.value) || price.value <= 0)
    {
        isValid = false;
        errorMessage += "Please enter a valid price.\n";
        price.style.borderColor = "red";
    }
    else
    {
        price.style.borderColor = "green";
    }

    if (!isValid)
    {
        alert(errorMessage);
    }

    return isValid;
}


// firebase.onChildAdded(firebase.ref(firebase.db, "Orders/"), (data) => {
    // addCommentElement(postElement, data.key, data.val().text, data.val().author);
//   });
  
//   firebase. onChildChanged(commentsRef, (data) => {
//     setCommentValues(postElement, data.key, data.val().text, data.val().author);
//   });
  
//   onChildRemoved(commentsRef, (data) => {
//     deleteComment(postElement, data.key);
//   });
