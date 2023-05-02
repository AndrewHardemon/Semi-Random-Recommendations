const loginFormHandler = async function(event) {
  event.preventDefault();

  const email = document.querySelector("#email-input-login").value.trim();
  const password = document.querySelector("#password-input-login").value.trim();
  try {
    const response = await fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify({
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
  .querySelector("#login-form")
  .addEventListener("submit", loginFormHandler);