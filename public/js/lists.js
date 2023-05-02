const listFormHandler = async function(event) {
  event.preventDefault();

  const title = document.querySelector("#listName").value.trim();
  console.log(title)
  try {
    const response = await fetch("/api/list", {
      method: "POST",
      body: JSON.stringify({
        title
      }),
      headers: { "Content-Type": "application/json" }
    })
    const result = await response.json()
    console.log(result)
    if(response.ok){
      document.location.replace("/lists");
    } else {
      alert("Something went wrong")
    }
  } catch(err){
    console.log(err)
    alert(err.message)
  }
};

document
  .querySelector("#addList-form")
  .addEventListener("submit", listFormHandler);