import { useState } from "react";

function Login() {
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevent page reload;

    try {
        const response = await fetch("http://localhost:8080/auth/login", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                email : email,
                password : password,
            }),
        });
        
        const data = await response.json();
        localStorage.setItem("token", data.token);

        await fetchTask();

        console.log("Token stored")

    } catch (error) {
        console.log("Error : ",error);
    }

  };

  const fetchTask = async() => {

    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8080/tasks", {
        method: "GET",
        headers: {
            "Authorization": "Bearer "+ token,
        },
    });

    const data = await response.json();
    console.log("Tasks: ",data);

  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button>Login</button>
      </form>
    </div>
  );
}

export default Login;
