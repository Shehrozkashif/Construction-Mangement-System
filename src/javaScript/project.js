import * as firebase from "./firebase.js";

      var submitDataBtn = document.getElementById("btn-submit-data");
      submitDataBtn.addEventListener("click", ()=> { 
      submitData();
       });    

    async function submitData()
        {
            if(verifyData())
            {
                var pName = document.getElementById("pn").value;
                var tFrom = document.getElementById("tf").value;
                var pAdress = document.getElementById("pa").value;
                var sName = document.getElementById("sn").value;
                var tDuration = document.getElementById("td").value;
                var sDate = document.getElementById("sd").value;
                var eDate = document.getElementById("ed").value;
                var pBudget = document.getElementById("pb").value;
            }
  
            let project = { 
                pName: pName,
                tFrom:tFrom,
                pAdress:pAdress,
                sName: sName,
                tDuration: tDuration,
                sDate: sDate,
                eDate:eDate,
                pBudget: pBudget
            }     
        let projectID = await firebase.createProject(project);
        location.href = "projectDetails.html?projectID=" + projectID;
   }
        
        function verifyData()
        {
            var pName = document.getElementById("pn");
            var tFrom = document.getElementById("tf");
            var pAdress = document.getElementById("pa");
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
            
            if(!pAdress.value)
            {
                isValid = false;
                errorMessage += "Please Enter Project Address. \n";
                pAdress.style.borderColor = "red";
            }
            else
            {
                pAdress.style.borderColor = "green";
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