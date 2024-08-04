import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, set, orderByChild, equalTo, onValue, remove, query, limitToFirst } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD5OPQi8Y8d5gGE9JBlfUjCyLEz5dk3uJc",
  authDomain: "temp-1244f.firebaseapp.com",
  projectId: "temp-1244f",
  databaseURL: "https://temp-1244f-default-rtdb.firebaseio.com",
  storageBucket: "temp-1244f.appspot.com",
  messagingSenderId: "626956851462",
  appId: "1:626956851462:web:dfa14c1be9277c45f5a687"
};
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
var Ref = ref(db);

/************************************* Order Functions *********************************************************/

export async function createOrder(order){
  order.uid = await getUUID();
  await set(ref(db, 'Orders/' + order.uid), order);
}


export function getOrders(category, projectID){
  let orders = [];             
  return new Promise((resolve, reject) => {
    onValue(query(ref(db, "Orders/"), orderByChild("projectID"), equalTo(projectID)), function(snapshot) { 
      snapshot.forEach((childSnapshot) => {
        if(childSnapshot.val().category == category){
          orders.push(childSnapshot.val());
        }
      });
    if (!orders)
        reject([]);
    else {
      resolve(orders);
    }
});
});    
  } 

  export function deleteOrder(uid){
   remove(ref(db, `Orders/${uid}`));
  }
  export function getProjctBill(projectID){
    let total = {
      cement: 0,
      brick: 0,
      clay: 0,
      concrete: 0,
      electricalitems: 0,
      furniture: 0,
      glass: 0,
      light: 0,
      paint: 0,
      reinforcementbar: 0,
      sand: 0,
      tiles: 0,
      truck: 0,
      wires: 0,
      wood: 0
    };             

    return new Promise((resolve, reject) => {
      onValue(query(ref(db, "Orders/"), orderByChild("projectID"), equalTo(projectID)), function(snapshot) { 
        snapshot.forEach((childSnapshot) => {
          switch(childSnapshot.val().category){
            case "cement": total.cement += parseFloat(childSnapshot.val().totalAmount); break;
            case "brick": total.brick += parseFloat(childSnapshot.val().totalAmount); break;
            case "clay": total.clay += parseFloat(childSnapshot.val().totalAmount). break;
            case "concrete": total.concrete += parseFloat(childSnapshot.val().totalAmount); break; 
            case "electricalitems": total.electricalitems += parseFloat(childSnapshot.val().totalAmount);break;
            case "furniture": total.furniture += parseFloat(childSnapshot.val().totalAmount);break;
            case "glass": total.glass += parseFloat(childSnapshot.val().totalAmount);break;
            case "light": total.light += parseFloat(childSnapshot.val().totalAmount);break;
            case "paint": total.paint += parseFloat(childSnapshot.val().totalAmount);break;
            case "reinforcementbar": parseFloat(total.reinforcementbar += childSnapshot.val().totalAmount);break;
            case "sand": total.sand += parseFloat(childSnapshot.val().totalAmount);break;
            case "tiles": total.tiles += parseFloat(childSnapshot.val().totalAmount);break;
            case "truck": total.truck += parseFloat(childSnapshot.val().totalAmount);break;
            case "wires": total.wires += parseFloat(childSnapshot.val().totalAmount);break;
            case "wood": total.wood += parseFloat(childSnapshot.val().totalAmount);break;
            default: console.log("Unknown item found");
          }
        });
      if (!total)
          reject([]);
      else {
        resolve(total);
      }
  });
  });    
    } 

  /************************************* Project Functions *********************************************************/

  
export async function createProject(project){
  project.uid = await getUUID();
  await set(ref(db, 'Projects/' + project.uid), project);
  return project.uid;
}

export async function getProjectDetailsByID(projectID){
  let project = {};
  return new Promise((resolve, reject) => {
    onValue(ref(db, "Projects/" + projectID), function(snapshot){
      console.log(snapshot.val());
       project = snapshot.val(); 
       if (!project)
           reject("No project found");
       else {
         resolve(project);
       }
    })
});
}

export function getProjects(){
  let projects = [];             
  return new Promise((resolve, reject) => {
    onValue(query(ref(db, "Projects/"), orderByChild("sDate")), function(snapshot) { 
      snapshot.forEach((childSnapshot) => {
        projects.push(childSnapshot.val());
      // console.log(childSnapshot.val()); 
      });
    if (!projects)
        reject([]);
    else {
      resolve(projects);
    }
});
});    
  }
  export function getLimitedProjects(){
    let projects = [];             
    return new Promise((resolve, reject) => {
      onValue(query(ref(db, "Projects/"), orderByChild("sDate"), limitToFirst(2)), function(snapshot) { 
        snapshot.forEach((childSnapshot) => {
          projects.push(childSnapshot.val());
        // console.log(childSnapshot.val()); 
        });
      if (!projects)
          reject([]);
      else {
        resolve(projects);
      }
  });
  });    
    }

  async function getUUID() {
    const response = await fetch('https://miro.medium.com/max/1400/1*sAUnjuM5TXHlf7Qdef84jw.png');
    const blob = await response.blob();
    
    const url = URL.createObjectURL(blob);
    const uuid = url.split('/').at(-1);
    URL.revokeObjectURL(url);
    
    return uuid;
  }
