import * as firebase from "./firebase.js";
var calcTotalBtn = document.getElementById("calculate-total-btn");
var goToDashboardBtn = document.getElementById("go-to-dashboard");
calcTotalBtn.addEventListener("click", ()=> {
    calculateTotal();    
});
goToDashboardBtn.addEventListener("click", ()=> {
    location.href = "dashboard.html";    
});
var totalCost = {};
calculateBill();
async function calculateBill(){
    let projectID = localStorage.getItem("projectID");
    firebase.getProjctBill(projectID).then((data)=>{
        console.log(data);
        totalCost = data;
        document.getElementById("brick").value = data.brick;
        document.getElementById("cement").value = data.cement;
        document.getElementById("clay").value = data.clay;
        document.getElementById("concrete").value = data.concrete;
        document.getElementById("eitems").value = data.electricalitems;
        document.getElementById("furniture").value = data.furniture;
        document.getElementById("glass").value = data.glass;
        document.getElementById("light").value = data.light;
        document.getElementById("paint").value = data.paint;
        document.getElementById("bar").value = data.reinforcementbar;
        document.getElementById("sand").value = data.sand;
        document.getElementById("tiles").value = data.tiles;
        document.getElementById("truck").value = data.truck;
        document.getElementById("wires").value = data.wires;
        document.getElementById("wood").value = data.wood;
        });

}
function calculateTotal() {
    let keys = Object.keys(totalCost);
    let totalValue = 0;
    for(let item in keys){
        totalValue += totalCost[keys[item]];
    }
    document.getElementById("totalPrice").textContent = totalValue.toFixed(2);
}
