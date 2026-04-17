import { useState } from "react"

function Login() {
    
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
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
        </div>
    )
}

export default Login;