import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"

const DetailFruitAdmin = () => {
    const [detail, setDetail] = useState({})
    const [listComentar, setListComentar] = useState([])
    const [totalComentar, setTotalComentar] = useState(0)
    const [toggleButtonBalas, setToggleButtonBalas] = useState([])
    const [balasKomentar, setbalasKomentar] = useState('')
    const [errorBalasComentar, setErrorBalasKomentar] = useState('')
    const [idKomentar, setIdKomentar] = useState('')
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    const emailUser = localStorage.getItem('email')
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        if (!token || !role || role !== 'admin') {
            navigate('/')
        }
    }, [token, role])

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/fruit/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((result) => {
                setDetail(result.data.data)
            })
            .catch((err) => {
                console.log(err)
            })

        axios.get(`${process.env.REACT_APP_API_URL}/api/reply-komentar/${id}`)
            .then((result) => {
                setListComentar(result.data.data)
                setTotalComentar(result.data.index)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const handleToggleReply = (index, commentId) => {
        setToggleButtonBalas((prevToggleState) => {
            const newToggleState = [...prevToggleState]
            newToggleState[index] = !newToggleState[index]
            return newToggleState
        })

        setIdKomentar(commentId);
    }

    const hendlebalasanComentar = () => {
        if (!balasKomentar) {
            setErrorBalasKomentar('Balas Komentar is required.')
            return
        }

        const data = {
            comment_content: balasKomentar,
            comment_id: idKomentar
        }

        axios.post(`${process.env.REACT_APP_API_URL}/api/komentar`, data, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                setbalasKomentar('')
                axios.get(`${process.env.REACT_APP_API_URL}/api/reply-komentar/${id}`)
                    .then((result) => {
                        setListComentar(result.data.data)
                        setTotalComentar(result.data.index)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div>
            <div className="w-full grid grid-cols-2 gap-4 mt-14 px-14">
                <div>
                    <img src={detail.images} alt="Fruit" className="w-full h-auto object-contain" />
                    <div>
                        <h3 className="font-bold text-[32px]">{detail.fruit_name}</h3>
                        <div className="flex justify-between border-b">
                            <p>Type</p>
                            <p>{detail.fruit_type}</p>
                        </div>
                        <div className="flex justify-between border-b mt-5">
                            <p>Stock</p>
                            <p>{detail.stock}</p>
                        </div>
                        <div className="my-5">
                            <h3 className="font-bold border-b">Description</h3>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
                                molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
                                numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
                                optio, eaque rerum! Provident similique accusantium nemo autem.</p>
                        </div>
                    </div>
                </div>
                <div className="p-4 text-white flex flex-col">
                    <div className="bg-[#3A5B22] rounded px-14 py-5 flex justify-between">
                        <h3 className="font-bold mb-4 text-[22px]">Total Komentar:</h3>
                        <h3 className="font-bold mb-4 text-[22px]">{totalComentar}</h3>
                    </div>
                    <div className="border rounded mt-5">
                        {
                            listComentar.map((data, idex) => {
                                return (
                                    <div key={idex} className="py-5 px-5 border-b">
                                        <p className="text-black font-bold">@{data.user_id.username}</p>
                                        <p className="text-black">{data.comment_content}</p>

                                        <div className="flex space-x-3 mt-3 justify-end">
                                            {/* <button className="text-black">Lihat Balasan</button> */}
                                            <button className="text-black" onClick={() => handleToggleReply(idex, data._id)}>Balas</button>
                                        </div>
                                        {
                                            toggleButtonBalas[idex] && (
                                                <div>
                                                    <div>
                                                        <label className="text-black">
                                                            <p>Balas Komentar</p>
                                                            <textarea onChange={(e) => {
                                                                setbalasKomentar(e.target.value)
                                                                setErrorBalasKomentar('')
                                                            }} id="w3review" name="w3review" rows="4" cols="50" className="border w-full" />
                                                            {errorBalasComentar && <p className="text-red-600">{errorBalasComentar}</p>}
                                                        </label>
                                                        <button onClick={() => hendlebalasanComentar()} className="p-2 bg-[#3A5B22] rounded w-full">Kirim</button>
                                                    </div>
                                                    <p className="text-black mt-5">Balasan</p>
                                                    <div className="flex flex-col items-start">
                                                        {
                                                            data.replies.map((item, id) => {
                                                                return (
                                                                    <div key={id} className={`mt-3 bg-gray-200 p-3 rounded w-10/12 ${item.user_id.email === emailUser ? 'self-start' : 'self-end'}`}>
                                                                        <p className="text-black font-bold">@{item.user_id.email === emailUser ? 'You' : item.user_id.username}</p>
                                                                        <p className="text-black">{item.comment_content}</p>
                                                                    </div>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailFruitAdmin