const url = "https://jsonbox.io/box_13a228df4b01d31b03cc";

const getData = async () => {
    const res = await fetch(url);
    const data =await res.json();
    return data;
}

const postData = async (todo) => {
    const answer = await fetch(url, {
        method:"POST",
        body: JSON.stringify({
            "description":todo.description,//alleen eigen data
            "done": false   }), 
        headers: {
            "Content-Type": "application/json",
        }
    })
    return answer;

}
const putData = async (todo) => {
    await fetch(`${url}/${todo._id}`, { //id
        method:"PUT",
        body: JSON.stringify({
            "description":todo.description,
            "done":todo.done}), //eigen data als object {hb}
        headers: {
            "Content-Type": "application/json",
        }
    })
}

const deleteData = async (todo) => {
    await fetch(`${url}/${todo._id}`, {
        method: "DELETE"
    })
}

export {getData, postData, putData, deleteData};