import { useNavigate } from "react-router-dom"
import MenuNavbar from "./navbar"
import { useEffect, useState } from "react"
import axios from "axios"

const Home = () => {
    const [fruit, setFruit] = useState([])
    const navigate = useNavigate()
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')

    useEffect(() => {
        if (!token || !role || role !== 'user') {
            navigate('/')
        }
    }, [token, role])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/fruit`, { headers: { Authorization: `Bearer ${token}` } })
            .then((result) => {
                console.log(result.data.data)
                setFruit(result.data.data)
            })
            .catch((err) => console.log(err))
    }, [])

    return (
        <div>
            <MenuNavbar />
            <div className="flex px-14 mt-14 justify-center">
                {
                    fruit.map((data, index) => {
                        return (
                            <div key={index} className="mx-1 px-1 border">
                                <img src={data.images} alt="iamges fruit" className="w-52 h-44 object-contain" />
                                <div>
                                    <div className="flex justify-between">
                                        <p>Name</p>
                                        <p>{data.fruit_name}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Type</p>
                                        <p>{data.fruit_type}</p>
                                    </div>
                                    <div className="flex justify-between">
                                        <p>Stock</p>
                                        <p>{data.stock}</p>
                                    </div>
                                    <button onClick={() => navigate(`/detail-fruit/${data._id}`)} className="rounded text-white bg-[#3A5B22] w-full p-1">Detail</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Home