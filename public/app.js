// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-analytics.js";
import { getDatabase, ref, set, onChildAdded, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDe9wZJZP7L-Am-lL4Al0wobI2hseWH2zI",
  authDomain: "todo-app-database-8e144.firebaseapp.com",
  projectId: "todo-app-database-8e144",
  storageBucket: "todo-app-database-8e144.appspot.com",
  messagingSenderId: "366841700370",
  appId: "1:366841700370:web:b7b1e01ea8e486a7b278cb",
  measurementId: "G-YF8VWJ1EP8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase();
// Initialize Firebase End

let main = document.getElementById("main");
let inp = document.getElementById("inp");

window.add = function(){
    if(!inp.value){
        alert("Please Enter Todo");
    }
    else{
        let obj = {
            input: inp.value,
         // id:id,
        time: new Date().getHours() +
        new Date().getMinutes() +
        new Date().getSeconds(),
        };
        obj.key = Math.random().toString().slice(2);
        const reference = ref(database,`Todo_app/${obj.key}/`)
        set(reference,obj);
    }
    
}

window.getData = function(){
    let dataList = [];
    const taskRef = ref(database,`Todo_app/`);
    onChildAdded(taskRef, function (dt) {
      dataList.push(dt.val());  
      main.innerHTML = "";
      for (let i = 0; i < dataList.length; i++) {
          main.innerHTML += `<li id="list" class="my-2">${dataList[i].input}<button onclick="edittodo(this)" class="btn my-4 text-white edi">EDIT</button> <button onclick="deletetodo(this)" class="btn my-4 text-white remo">DELETE</button><p class="mx-3"> Time: ${dataList[i].time}</p> </li>  <br>`;
      }
      let inp = document.getElementById("inp").value = "";
  })
}
getData();


window.deleteAll = function (id) {
    remove(ref(database, `Todo_app/`))
    main.remove();
}

window.edittodo = function(element) {
    var val = prompt("Update Todo Value", element.parentNode.firstChild.nodeValue);
    element.parentNode.firstChild.nodeValue = val;
}

window.deletetodo = function (element) {
    const refrence = ref(database, "Todo_app/")
    remove(refrence, `${element.id}`)
    element.parentNode.remove();
}




