import {deleteData, getData, postData, putData} from "./api-client.js";
const listItems = document.getElementsByClassName("list__items")[0];
const addButton = document.getElementById("add");

let list = [];

//postData({description: "Buy stuff", done:false});
const refreshList = async () => {
    //clear the list
    let count = listItems.childNodes.length;
    for (let i = 0 ;i < count ; i++) {
        listItems.removeChild(listItems.childNodes[0]);
    }
    list = await getData();
    console.log(list);
    list.forEach(element => {
        const li = document.createElement("li");
        const textinput = document.createElement("input");
        textinput.type = "text";
        textinput.value = element.description;
        textinput._id = element._id;
        textinput.addEventListener("change", updateHandler);

        const vink = document.createElement("input");
        vink.type = "checkbox";
        vink._id = element._id;
        vink.checked = element.done;
        vink.addEventListener("change", updateHandler);

        const delButton = document.createElement("input");
        delButton.type = "button";
        delButton.value = "delete";
        delButton._id = element._id;
        delButton.addEventListener("click", removeHandler)
        
        listItems.appendChild(li);
        
        li.append(textinput);
        li.append(vink);
        li.append(delButton);
    });
}   

const addHandler = async (e) => {
    // make a new object with inputvalue and "done"=false
    // update UI = add list-item
    // POST the new object to the database
    await postData({"description":e.target.previousElementSibling.value, "done":false})
    // refresh the browser
    refreshList();
}

const removeHandler = async (e) => {
    // update UI = remove list item 
    
    // DELETE the object from database id=e.target.id
    await deleteData({_id:e.target._id});
    refreshList();
}

const updateHandler = async (e) => {
    // get new state values
    // update UI
    // PUT the changed object in the database e.target.checked for checkbox /
    if (e.target.type=="text"){
        //putData({_id:e.target._id ,description:e.target.value });
        putData({_id:e.target._id, description:e.target.value, done:e.target.nextElementSibling.checked},);
    }
    else putData({_id:e.target._id, description:e.target.previousElementSibling.value, done:e.target.checked, });
    
}
addButton.addEventListener("click",addHandler);
refreshList()
