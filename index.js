import { deleteData, getData, postData, putData } from "./api-client.js";
const listItems = document.getElementsByClassName("list__items")[0];
const addButton = document.getElementById("addTodos__btn");
const todoText = document.getElementById("addTodos__text");

let list = [];

const refreshList = async () => {
  //clear the list
  let count = listItems.childNodes.length;
  for (let i = 0; i < count; i++) {
    listItems.removeChild(listItems.childNodes[0]);
  }
  //get list and add to DOM
  try {
    list = await getData();
    console.log(list);
    list.forEach((element) => createLi(element, "refresh"));
  } catch (error) {
    console.log(`Foutmelding tijdens refresh:${error}`);
  }
};

const createLi = async (element, caller) => {
  const li = document.createElement("li");
  const textinput = document.createElement("input");
  textinput.type = "text";
  textinput.value = element.description;
  textinput._id = element._id;
  li.id = element._id;
  textinput.addEventListener("change", updateHandler);

  const vink = document.createElement("input");
  vink.type = "checkbox";
  vink._id = element._id;
  vink.checked = element.done;
  vink.addEventListener("change", updateHandler);

  const delButton = document.createElement("input");
  delButton.type = "button";
  delButton.value = "";
  delButton._id = element._id;
  delButton.className = "fas";
  delButton.addEventListener("click", removeHandler);

  li.append(vink);
  li.append(textinput);
  li.append(delButton);
  if (caller == "addHandler") {
    let description = element.description;
    listItems.append(li);
    try {
      const returnData = await postData({
        description: description,
        done: false,
      });
      const data = await returnData.json();
      li.id = data._id;
      vink._id = data._id;
      delButton._id = data._id;
      textinput._id = data._id;
    } catch (error) {
      console.log(
        `Could not add this Todo item, server did not return correct data : ${error}.`
      );
      alert("Item not added, server did not return correct data.");
    }
  } else listItems.insertBefore(li, listItems.childNodes[0]);
  if (vink.checked == true) {
    textinput.className = "checked";
  } else {
    textinput.className = "";
  }
};

const addHandler = async (element) => {
  let description = element.target.previousElementSibling.value;
  if (description == "") {
    alert("Please add some text first.");
  } else {
    todoText.value = "";
    element.description = description;
    createLi(element, "addHandler");
  }
};

const removeHandler = async (e) => {
  const li = document.getElementById(`${e.target._id}`);
  listItems.removeChild(li);
  await deleteData({ _id: e.target._id });
};

const updateHandler = async (e) => {
  if (e.target.type == "text") {
    putData({
      _id: e.target._id,
      description: e.target.value,
      done: e.target.previousElementSibling.checked,
    });
  } else {
    putData({
      _id: e.target._id,
      description: e.target.nextElementSibling.value,
      done: e.target.checked,
    });
    if (e.target.checked == true) {
      e.target.nextElementSibling.className = "checked";
    } else {
      e.target.nextElementSibling.className = "";
    }
  }
};
addButton.addEventListener("click", addHandler);
refreshList();
