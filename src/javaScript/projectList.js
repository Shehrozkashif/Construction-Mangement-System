
import * as firebase from "./firebase.js";

let menuicn = document.querySelector(".menuicn");
let nav = document.querySelector(".navcontainer");


menuicn.addEventListener("click", () => {
    nav.classList.toggle("navclose");
});
retrieveData();

function retrieveData(){
    localStorage.clear();
    firebase.getProjects().then((data)=>{
        console.log(data);
        let projects = data;
        var table = document.getElementById("projects-list");
        projects.forEach(project => {
            var newRow = document.createElement("div");
            newRow.setAttribute("class", "list-item");
            newRow.addEventListener("click", function(){
                location.href="projectDetails.html?projectID=" + project.uid;
            });
            newRow.innerHTML = `
            <h3 class="t-op-nextlvl">${project.pName}</h3>
            <h3 class="t-op-nextlvl">${project.sName}</h3>
            <h3 class="t-op-nextlvl">${project.pBudget}</h3>
            <h3 class="t-op-nextlvl label-tag">${project.tDuration}</h3>`;
            table.appendChild(newRow);
        });
    });
}