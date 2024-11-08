import { Link, useNavigate } from "react-router-dom"

const MenuNavbar = () => {
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        localStorage.removeItem('email')

        navigate('/')
    }
    return (
        <div className="bg-[#3A5B22] py-5 px-14 flex justify-between">
            <ul>
                <li className="text-white cursor-pointer"><Link to={'/home'}>Home</Link></li>
            </ul>
            <div>
                <button onClick={() => handleLogout()} className="p-2 bg-[#FFEB3B] rounded">Logout</button>
            </div>
        </div>
    )
}

export default MenuNavbar