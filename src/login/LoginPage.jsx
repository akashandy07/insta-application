import { useState } from "react"
import { useNavigate } from "react-router-dom"

const LoginPage = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('demousers123@gmail.com')
    const [password, setPassword] = useState('demouser')
    const navigate = useNavigate()

    function loginformsubmit(e) {
        e.preventDefault()

        if (email === 'demousers123@gmail.com' && password === 'demouser') {
            localStorage.setItem('user', JSON.stringify({ email, password }))
            setIsLoggedIn(true)
            alert("You've successfully logged in")
            navigate("/PostPage")
        } else {
            alert("Please check your email and password")
        }
    }

    return (
        <div className="w-[400px] mx-auto h-[600px] flex items-center mb-10 pt-2 text-center justify-center">
            <div className="max-w-[380px] mx-auto ">
                {/* Demo Credentials Box */}
                <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 mb-6">
                    <p className="text-sm font-semibold text-blue-900 mb-2">📝 Demo Credentials:</p>
                    <p className="text-sm text-blue-800">Email: <span className="font-mono font-bold">demousers123@gmail.com</span></p>
                    <p className="text-sm text-blue-800">Password: <span className="font-mono font-bold">demouser</span></p>
                </div>

                <div className="border border-gray-300 rounded-lg p-8">
                    {/* Logo/Title */}
                    <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">Instagram</h1>

                    <form onSubmit={loginformsubmit} className="flex flex-col gap-4">
                        {/* Email Input */}
                        <input
                            type="text"
                            placeholder='Phone number, username, or email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            className="border border-gray-300 bg-gray-50 px-4 py-2 rounded text-sm outline-none focus:border-gray-400"
                        />

                        {/* Password Input */}
                        <input
                            type="password"
                            placeholder='Password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            className="border border-gray-300 bg-gray-50 px-4 py-2 rounded text-sm outline-none focus:border-gray-400"
                        />

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="bg-blue-500 text-white font-semibold py-2 rounded mt-2 hover:bg-blue-600 transition"
                        >
                            Log in
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="flex items-center gap-4 my-6">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <span className="text-gray-500 text-sm font-semibold">OR</span>
                        <div className="flex-1 h-px bg-gray-300"></div>
                    </div>

                    {/* Footer */}
                    <p className="text-center text-sm text-gray-600">
                        Don't have an account? <span className="text-blue-500 font-semibold cursor-pointer">Sign up</span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage