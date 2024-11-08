import { useEffect } from "react"
import { Link, Outlet, useNavigate } from "react-router-dom"

const Dasboard = () => {
    const navigation = useNavigate()
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    useEffect(() => {
        if (!token || !role || role !== 'admin') {
            navigation('/')
        }
    }, [token, role])

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('email')

        navigate('/')
    }

    return (
        <div className="h-screen flex">
            {/* Sidebar */}
            <div className="w-48 bg-[#3A5B22] text-white flex flex-col justify-between p-5">

                <div className="mt-32 space-y-4">
                    <Link className="font-bold cursor-pointer text-xl block" to="/dasboard/">
                        Dashboard
                    </Link>
                    <Link className="font-bold cursor-pointer text-xl block" to="/dasboard/fruit-admin">
                        Fruit
                    </Link>
                </div>

                <div className="flex justify-center mt-auto">
                    <button onClick={() => handleLogout()} className="p-2 bg-[#FFEB3B] rounded w-full">Logout</button>
                </div>
            </div>

            <div className="flex-1 bg-gray-100 p-5 overflow-y-auto max-h-screen">
                <Outlet />
            </div>
        </div>
    )
}

export default Dasboard