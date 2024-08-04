import * as firebase from "./firebase.js";

var goToDashboardBtn = document.getElementById("go-to-dashboard");
var goToMaterialsBtn = document.getElementById("go-to-materials");
const projectID =window.location.href.split('?')[1].split('=')[1];
localStorage.setItem("projectID", projectID);
goToDashboardBtn.addEventListener("click", ()=> {
    location.href = "dashboard.html";    
});

goToMaterialsBtn.addEventListener("click", ()=> {

    location.href = "material.html?projectID=" + projectID;    
});

getProjectDetails();


async function getProjectDetails(){
    const projectID =window.location.href.split('?')[1].split('=')[1];
    let project = {};
    console.log(projectID);
    firebase.getProjectDetailsByID(projectID).then((data)=> {
        project = data;
        insertData(project);
    }).catch(e => console.log(e));

}
function insertData(project)
{

        document.getElementById("pn").innerHTML = project.pName;
        document.getElementById("tf").innerHTML = project.tFrom;
        document.getElementById("sn").innerHTML = project.sName;
        document.getElementById("td").innerHTML = project.tDuration;
        document.getElementById("sd").innerHTML = project.sDate;
        document.getElementById("ed").innerHTML = project.eDate;
        document.getElementById("pb").innerHTML = project.pBudget;
}

function verifyData()
{
    var pName = document.getElementById("pn");
    var tFrom = document.getElementById("tf");
    var sName = document.getElementById("sn");
    var tDuration = document.getElementById("td");
    var sDate = document.getElementById("sd");
    var eDate = document.getElementById("ed");
    var pBudget = document.getElementById("pb");
    
    var isValid = true;
    var errorMessage = "";
    
    if(!pName.value)
    {
        isValid = false;
        errorMessage += "Please Enter Project Name. \n";
        pName.style.borderColor = "red";
    }
    else
    {
        pName.style.borderColor = "green";
    }
    
    if(!tFrom.value)
    {
        isValid = false;
        errorMessage += "Please Enter Tender From. \n";
        tFrom.style.borderColor = "red";
    }
    else
    {
        tFrom.style.borderColor = "green";
    }
    
    if(!sName.value)
    {
        isValid = false;
        errorMessage += "Please Enter Supervisor's Name. \n";
        sName.style.borderColor = "red";
    }
    else
    {
        sName.style.borderColor = "green";
    }
    
    if(!tDuration.value || tDuration.value <= 0)
    {
        isValid = false;
        errorMessage += "Please Enter a Valid Time Duration. \n";
        tDuration.style.borderColor = "red";
    }
    else
    {
        tDuration.style.borderColor = "green";
    }
    
    if(!sDate.value)
    {
        isValid = false;
        errorMessage += "Please Select a Valid Starting Date. \n";
        sDate.style.borderColor = "red";
    }
    else
    {
        sDate.style.borderColor = "green";
    }
    
    if(!eDate.value)
    {
        isValid = false;
        errorMessage += "Please Select a Valid Ending Date. \n";
        eDate.style.borderColor = "red";
    }
    else
    {
        eDate.style.borderColor = "green";
    }
    
    if(!pBudget.value || pBudget <= 0)
    {
        isValid = false;
        errorMessage += "Please Enter a Valid Project Budget.";
        pBudget.style.borderColor = "red";
    }
    else
    {
        pBudget.style.borderColor = "green";
    }
    
    if(!isValid)
    {
        alert(errorMessage);
    }
    
    return isValid;
}