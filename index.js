const url = "https://jsonbox.io/box_13a228df4b01d31b03cc";
const getData = async () => {
    const res = await fetch(url);
    const data =await res.json();
    console.log(data);
}
getData();

const postData = async (todo) => {
    await fetch(url, {
        method:"POST",
        body: JSON.stringify(todo),
        headers: {
            "Content-Type": "application/json",
        }
    })
}
postData({description: "Buy stuff", done:"false"});
getData();