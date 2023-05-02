const signupFormHandler = async function(event) {
  event.preventDefault();

  const username = document.querySelector("#username-input-signup").value.trim();
  const email = document.querySelector("#email-input-signup").value.trim();
  const password = document.querySelector("#password-input-signup").value.trim();
  try {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({
        username,
        email,
        password
      }),
      headers: { "Content-Type": "application/json" }
    })
    const result = await response.json()
    console.log(result)
    if(response.ok){
      document.location.replace("/home");
    } else {
      alert("Something went wrong")
    }
  } catch(err){
    console.log(err)
    alert(err.message)
  }
};

document
  .querySelector("#register-form")
  .addEventListener("submit", signupFormHandler);