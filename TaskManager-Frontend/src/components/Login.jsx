import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
        navigate("/dashboard");

    } catch (error) {
        console.log("Error : ",error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-md w-80"
        >
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
    
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-3 p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Login</button>
      </form>
    </div>
  );
}

export default Login;
