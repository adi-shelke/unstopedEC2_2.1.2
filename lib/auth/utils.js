export const submitDataLogin = async (formData) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    email: formData.email,
    password: formData.password,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  // fetch("http://localhost:3000/api/login", requestOptions)
  //   .then((response) => response.json())
  //   .then((result) => {return result})
  //   .catch((error) => console.log("error", error));

    try {
      const response = await fetch("http://localhost:3000/api/login", requestOptions);
      const data = await response.json();
      return data; // Return the result obtained from the fetch request
    } catch (error) {
      console.log("Error:", error);
      throw error; // Re-throw the error to be caught by the caller
    }
};

export const submitDataSignup = async (formData) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    email: formData.email,
    password: formData.password,
    repeatpassword: formData.repeatpassword,
    name: formData.name,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  // fetch("http://localhost:3000/api/signup", requestOptions)
  //   .then((response) => response.json())
  //   .then((result) => console.log(result))
  //   .catch((error) => console.log("error", error));
    try {
      const response = await fetch("http://localhost:3000/api/signup", requestOptions);
      const data = await response.json();
      return data; // Return the result obtained from the fetch request
    } catch (error) {
      console.log("Error:", error);
      throw error; // Re-throw the error to be caught by the caller
    }
};
