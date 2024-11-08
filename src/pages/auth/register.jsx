import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"

// import images 
import ImagesBener from '../../images/chris-lee-70l1tDAI6rM-unsplash 1.svg'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('')
    const [errorName, setErrorName] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [errorRole, setErrorRole] = useState('')
    const [errorPayload, setErrorPayload] = useState(false)
    const navigate = useNavigate()

    const handleRegister = () => {
        if (!name) {
            setErrorName('Name is required.')
            return
        }
        const regexEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!email || !regexEmail.test(email)) {
            setErrorEmail('Valid email is required')
            return
        }
        if (!password || password.length < 8) {
            setErrorPassword('Password must be at least 8 characters.')
            return
        }
        if (!role) {
            setErrorRole('Role is required.')
            return
        }

        const data = {
            username: name,
            email,
            password,
            role
        }

        axios.post(`${process.env.REACT_APP_API_URL}/auth-user/register`, data)
            .then(() => {
                navigate('/')
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
                    <h1 className="text-[32px] mb-11">Get Started Now</h1>
                    {
                        errorPayload && (
                            <div className="bg-[#f59999] rounded flex justify-between p-2">
                                <p className="text-red-600">Email & Password Error</p>
                                <button onClick={() => setErrorPayload(false)} className="border px-2 border-black rounded">X</button>
                            </div>
                        )
                    }

                    <label className="w-full block mb-4">
                        <p>Name</p>
                        <input onChange={(e) => {
                            setName(e.target.value)
                            setErrorName('')
                        }}
                            className={`border ${errorName ? 'border-red-600' : 'border-gray-300'} p-2 w-full rounded`}
                            type="text"
                            placeholder="Name"
                        />
                        {errorName && <p className="text-red-600">{errorName}</p>}
                    </label>
                    <label className="w-full block mb-4">
                        <p>Email address</p>
                        <input
                            onChange={(e) => {
                                setEmail(e.target.value)
                                setErrorEmail('')
                            }}
                            className={`border ${errorEmail ? 'border-red-600' : 'border-gray-300'} p-2 w-full rounded`}
                            type="email"
                            placeholder="Email"
                        />
                        {errorEmail && <p className="text-red-600">{errorEmail}</p>}
                    </label>
                    <label className="w-full block mb-4">
                        <p>Password</p>
                        <input
                            onChange={(e) => {
                                setPassword(e.target.value)
                                setErrorPassword('')
                            }}
                            className={`border ${errorPassword ? 'border-red-600' : 'border-gray-300'} p-2 w-full rounded`}
                            type="password"
                            placeholder="Password"
                        />
                        {errorPassword && <p className="text-red-600">{errorPassword}</p>}
                    </label>
                    {/* Role Selection with Radio Buttons */}
                    <fieldset className="w-full block mb-4">
                        <p>Role</p>
                        <div className="flex items-center space-x-4 mt-2">
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="admin"
                                    className={`form-radio h-4 w-4 ${errorRole ? 'text-red-600' : 'text-blue-500'}`}
                                    onChange={(e) => {
                                        setRole(e.target.value)
                                        setErrorRole('')
                                    }}
                                />
                                <span>Admin</span>
                            </label>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="radio"
                                    name="role"
                                    value="user"
                                    className={`form-radio h-4 w-4 ${errorRole ? 'text-red-600' : 'text-blue-500'}`}
                                    onChange={(e) => {
                                        setRole(e.target.value)
                                        setErrorRole('')
                                    }}
                                />
                                <span>User</span>
                            </label>
                        </div>
                    </fieldset>
                    <button onClick={() => handleRegister()} className="w-full mt-2 border p-2 bg-[#3A5B22] text-white rounded">Signup</button>
                    <p className="text-center mt-11">Don’t have an account?  <Link className="text-sky-600" to='/'>Sign In</Link></p>
                </div>
            </div>
            <div className="w-1/2 flex justify-center items-center">
                <img alt="image bener" src={ImagesBener} />
            </div>
        </div>
    )
}

export default Register