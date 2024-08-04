import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
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


console.log(Ref);
async function createOrder(order){
    const uuid = await getUUID();
    Ref.child("Orders").child(uuid).set(order);
}

function getOrders(category){
  // Ref.child("Orders").on("value", data => {

  // }

}

async function getUUID() {
    const response = await fetch('https://miro.medium.com/max/1400/1*sAUnjuM5TXHlf7Qdef84jw.png');
    const blob = await response.blob();
  
    const url = URL.createObjectURL(blob);
    const uuid = url.split('/').at(-1);
    URL.revokeObjectURL(url);
  
    return uuid;
  }