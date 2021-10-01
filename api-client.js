const url = "http://localhost:3000"; //"https://jsonbox.io/box_13a228df4b01d31b03cc";

const getData = async () => {
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const postData = async (todo) => {
  try {
    const answer = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        description: todo.description, //alleen eigen data
        done: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return answer;
  } catch (error) {
    console.log(error);
  }
};
const putData = async (todo) => {
  try {
    await fetch(`${url}/${todo._id}`, {
      //id
      method: "PUT",
      body: JSON.stringify({
        description: todo.description,
        done: todo.done,
      }), //eigen data als object {hb}
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async (todo) => {
  try {
    await fetch(`${url}/${todo._id}`, {
      method: "DELETE",
    });
  } catch (error) {
    console.log(`Delete didn't work because of error: ${error}`);
  }
};

export { getData, postData, putData, deleteData };
