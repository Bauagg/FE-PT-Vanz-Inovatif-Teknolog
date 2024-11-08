import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

// import images 
import ImagesBener from '../../images/chris-lee-70l1tDAI6rM-unsplash 1.svg'
import axios from "axios"

const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorPayload, setErrorPayload] = useState(false)
    const navigate = useNavigate()

    const hendleLogin = () => {
        const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!email || !regexEmail.test(email)) {
            setErrorEmail('Valid email is required')
            return
        }
        if (!password || password.length < 8) {
            setErrorPassword('Password must be at least 8 characters.')
            return
        }

        const data = { email, password }

        axios.post(`${process.env.REACT_APP_API_URL}/auth-user/login`, data)
            .then((result) => {
                localStorage.setItem('token', result.data.data.token)
                localStorage.setItem('role', result.data.data.role)
                localStorage.setItem('email', result.data.data.email)
                if (result.data.data.role === 'user') {
                    navigate('/home')
                } else {
                    navigate('/dasboard')
                }
            })
            .catch((err) => {
                console.log(err)
                setErrorPayload(true)
            })
    }

    return (
        <div className="flex h-screen">
            <div className="w-1/2 flex justify-center items-center">
                <div className="w-3/4">
                    <h1 className="text-[32px] font-bold">Welcome back!</h1>
                    <p className="mb-11">Enter your Credentials to access your account</p>
                    {
                        errorPayload && (
                            <div className="bg-[#f59999] rounded flex justify-between p-2">
                                <p className="text-red-600">Email & Password Error</p>
                                <button onClick={() => setErrorPayload(false)} className="border px-2 border-black rounded">X</button>
                            </div>
                        )
                    }
                    <label className="w-full block mb-4">
                        <p>Email address</p>
                        <input
                            className={`border ${errorEmail ? 'border-red-600' : 'border-gray-300'} p-2 w-full rounded`}
                            type="email"
                            placeholder="Email"
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setErrorEmail('')
                            }}
                        />
                        {errorEmail && <p className="text-red-600">{errorEmail}</p>}
                    </label>
                    <label className="w-full block mb-4">
                        <p>Password</p>
                        <input
                            className={`border ${errorPassword ? 'border-red-600' : 'border-gray-300'} p-2 w-full rounded`}
                            type="password"
                            placeholder="Password"
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setErrorPassword('')
                            }}
                        />
                        {errorPassword && <p className="text-red-600">{errorPassword}</p>}
                    </label>
                    <button onClick={() => hendleLogin()} className="w-full mt-2 border p-2 bg-[#3A5B22] text-white rounded">Login</button>
                    <p className="text-center mt-11">Have an account? <Link className="text-sky-600" to='/register'>Sign Up</Link></p>
                </div>
            </div>
            <div className="w-1/2 flex justify-center items-center">
                <img src={ImagesBener} alt="image bener login" />
            </div>
        </div>
    )
}

export default Login