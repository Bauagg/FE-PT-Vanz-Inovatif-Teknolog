import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const HomeAdmin = () => {
    const [indexImport, setIndexImport] = useState(0)
    const [indexLocal, setIndexLocal] = useState(0)
    const [indexProduk, setIndexProduk] = useState(0)
    const [toggleCreateFruit, setToggleCreateFruit] = useState(false)
    const [toggleUpdateFruit, setToggleUpdateFruit] = useState(false)
    const [idFruit, setIdFruit] = useState('')
    const [fruit, setFruit] = useState([])
    const [fruit_name, setfruit_name] = useState('')
    const [stock, setStock] = useState(0)
    const [fruit_type, setfruit_type] = useState('')
    const [image, setImage] = useState('')
    const [errorFruitName, setErrorFruitName] = useState('')
    const [errorStock, setErrorStock] = useState('')
    const [errorFruitTipe, setErrorFruitType] = useState('')
    const [errorImage, setErrorImage] = useState('')
    const [search, setSearch] = useState('')
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/fruit`, { headers: { Authorization: `Bearer ${token}` } })
            .then((result) => {
                setFruit(result.data.data)
                setIndexImport(result.data.index_import)
                setIndexLocal(result.data.index_local)
                setIndexProduk(result.data.data.length)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            setImage(file); // Store the image file in the state
        }
    }

    const handleCreateFruit = () => {
        let valid = true;

        // Clear previous errors
        setErrorFruitName('');
        setErrorStock('');
        setErrorFruitType('');
        setErrorImage('');

        // Validate Fruit Name
        if (!fruit_name) {
            setErrorFruitName('Fruit name is required');
            valid = false;
        }

        // Validate Stock
        if (stock <= 0) {
            setErrorStock('Stock must be greater than 0');
            valid = false;
        }

        // Validate Fruit Type
        if (!fruit_type) {
            setErrorFruitType('Fruit type is required');
            valid = false;
        }

        // Validate Image
        if (!image) {
            setErrorImage('Image is required');
            valid = false;
        }

        // If all validations pass, make the API call
        if (valid) {
            const formData = new FormData();
            formData.append('fruit_name', fruit_name);
            formData.append('stock', stock);
            formData.append('fruit_type', fruit_type);
            formData.append('image', image);

            axios.post(`${process.env.REACT_APP_API_URL}/api/fruit`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(() => {
                    setToggleCreateFruit(false);
                    setfruit_name('');
                    setStock(0);
                    setfruit_type('');
                    setImage('');

                    axios.get(`${process.env.REACT_APP_API_URL}/api/fruit`, { headers: { Authorization: `Bearer ${token}` } })
                        .then((result) => {
                            setFruit(result.data.data)
                            setIndexImport(result.data.index_import)
                            setIndexLocal(result.data.index_local)
                            setIndexProduk(result.data.data.length)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    const handleUpdateFruit = () => {
        let valid = true;

        // Clear previous errors
        setErrorFruitName('');
        setErrorStock('');
        setErrorFruitType('');
        setErrorImage('');

        // Validate Fruit Name
        if (!fruit_name) {
            setErrorFruitName('Fruit name is required');
            valid = false;
        }

        // Validate Stock
        if (stock <= 0) {
            setErrorStock('Stock must be greater than 0');
            valid = false;
        }

        // Validate Fruit Type
        if (!fruit_type) {
            setErrorFruitType('Fruit type is required');
            valid = false;
        }

        // Validate Image
        if (!image) {
            setErrorImage('Image is required');
            valid = false;
        }

        // If all validations pass, make the API call
        if (valid) {
            const formData = new FormData();
            formData.append('fruit_name', fruit_name);
            formData.append('stock', stock);
            formData.append('fruit_type', fruit_type);
            formData.append('image', image);

            axios.put(`${process.env.REACT_APP_API_URL}/api/fruit/${idFruit}`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then(() => {
                    setToggleUpdateFruit(false);
                    setfruit_name('');
                    setStock(0);
                    setfruit_type('');
                    setImage('');

                    axios.get(`${process.env.REACT_APP_API_URL}/api/fruit`, { headers: { Authorization: `Bearer ${token}` } })
                        .then((result) => {
                            setFruit(result.data.data)
                            setIndexImport(result.data.index_import)
                            setIndexLocal(result.data.index_local)
                            setIndexProduk(result.data.data.length)
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    const hendleDeleteFruit = (id) => {
        axios.delete(`${process.env.REACT_APP_API_URL}/api/fruit/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            .then(() => {
                axios.get(`${process.env.REACT_APP_API_URL}/api/fruit`, { headers: { Authorization: `Bearer ${token}` } })
                    .then((result) => {
                        setFruit(result.data.data)
                        setIndexImport(result.data.index_import)
                        setIndexLocal(result.data.index_local)
                        setIndexProduk(result.data.data.length)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const hendleSearchFruit = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/fruit?fruit_name=${search}`, { headers: { Authorization: `Bearer ${token}` } })
            .then((result) => {
                setFruit(result.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const hendlerFilterFruit = (filter) => {
        if (filter) {
            axios.get(`${process.env.REACT_APP_API_URL}/api/fruit?fruit_type=${filter}`, { headers: { Authorization: `Bearer ${token}` } })
                .then((result) => {
                    setFruit(result.data.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        } else {
            axios.get(`${process.env.REACT_APP_API_URL}/api/fruit`, { headers: { Authorization: `Bearer ${token}` } })
                .then((result) => {
                    setFruit(result.data.data)
                })
                .catch((err) => {
                    console.log(err)
                })
        }

    }

    return (
        <div>
            <h1 className="text-3xl">Welcome to the Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-5">
                <div>
                    <div onClick={() => hendlerFilterFruit('IMPORT')} className="bg-white shadow-md rounded p-4 cursor-pointer">
                        <h2 className="text-xl font-bold mb-2">IMPORT</h2>
                        <p>{indexImport}</p>
                    </div>
                </div>
                <div>
                    <div onClick={() => hendlerFilterFruit('LOCAL')} className="bg-white shadow-md rounded p-4 cursor-pointer">
                        <h2 className="text-xl font-bold mb-2">LOCAL</h2>
                        <p>{indexLocal}</p>
                    </div>
                </div>
                <div>
                    <div onClick={() => hendlerFilterFruit()} className="bg-white shadow-md rounded p-4 cursor-pointer">
                        <h2 className="text-xl font-bold mb-2">PRODUK</h2>
                        <p>{indexProduk}</p>
                    </div>
                </div>
            </div>
            <div className="mt-5 flex justify-between">
                <div className="flex">
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search" className="w-full border p-2 rounded-tl-lg rounded-bl-lg w-80" />
                    <button onClick={() => hendleSearchFruit()} className="p-2 bg-[#3A5B22] text-white rounded-tr-lg rounded-br-lg">Search</button>
                </div>
                <button className="p-2 bg-[#3A5B22] text-white rounded" onClick={() => setToggleCreateFruit(true)}>Create Fruit</button>
            </div>

            <div className="flex px-14 mt-14 justify-center">
                {
                    fruit.map((data, index) => {
                        return (
                            <div key={index} className="bg-[#fff] border rounded px-1 py-1">
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
                                    <button onClick={() => navigate(`/dasboard/detail-fruit-admin/${data._id}`)} className="rounded text-white bg-[#3A5B22] w-full p-1 mt-2">Detail</button>
                                    <button onClick={() => {
                                        setToggleUpdateFruit(true)
                                        setIdFruit(data._id)
                                        setfruit_name(data.fruit_name)
                                        setfruit_type(data.fruit_type)
                                        setStock(data.stock)
                                    }} className="rounded text-white bg-[#0000FF] w-full p-1 my-2">Update</button>
                                    <button onClick={() => hendleDeleteFruit(data._id)} className="rounded text-white bg-[#ff0000] w-full p-1">Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            {
                toggleCreateFruit && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-5 rounded shadow-lg w-96 relative">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-lg font-bold">Create Produk</p>
                                <button onClick={() => setToggleCreateFruit(false)} className="text-red-500 font-bold text-xl">X</button>
                            </div>
                            {/* Content of the modal */}
                            <div>
                                {/* Add your form or any additional content here */}
                                <label>
                                    <p>Fruit Name</p>
                                    <input onChange={(e) => setfruit_name(e.target.value)} value={fruit_name} placeholder="Fruit Name" type="text" className="border p-2 w-full rounded" />
                                    {errorFruitName && <p className="text-red-500 text-sm">{errorFruitName}</p>}
                                </label>
                                <label>
                                    <p>Stock</p>
                                    <input onChange={(e) => setStock(e.target.value)} value={stock} placeholder="Stock" type="number" className="border p-2 w-full rounded" />
                                    {errorStock && <p className="text-red-500 text-sm">{errorStock}</p>}
                                </label>
                                <label>
                                    <p>Fruit Type</p>
                                    <select className="border p-2 rounded w-full" value={fruit_type} onChange={(e) => setfruit_type(e.target.value)}>
                                        <option value="" disabled selected>Select</option>
                                        <option value="IMPORT">Import</option>
                                        <option value="LOCAL">Local</option>
                                    </select>
                                    {errorFruitTipe && <p className="text-red-500 text-sm">{errorFruitTipe}</p>}
                                </label>
                                <label>
                                    <p>Images</p>
                                    <input onChange={handleImageChange} placeholder="Fruit Name" type="file" className="border p-2 w-full rounded" />
                                    {errorImage && <p className="text-red-500 text-sm">{errorImage}</p>}
                                </label>
                                <button onClick={handleCreateFruit} className="rounded text-white bg-[#3A5B22] w-full p-2 my-2">SAVE</button>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                toggleUpdateFruit && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
                        <div className="bg-white p-5 rounded shadow-lg w-96 relative">
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-lg font-bold">Update Produk</p>
                                <button onClick={() => setToggleUpdateFruit(false)} className="text-red-500 font-bold text-xl">X</button>
                            </div>
                            {/* Content of the modal */}
                            <div>
                                {/* Add your form or any additional content here */}
                                <label>
                                    <p>Fruit Name</p>
                                    <input onChange={(e) => setfruit_name(e.target.value)} value={fruit_name} placeholder="Fruit Name" type="text" className="border p-2 w-full rounded" />
                                    {errorFruitName && <p className="text-red-500 text-sm">{errorFruitName}</p>}
                                </label>
                                <label>
                                    <p>Stock</p>
                                    <input onChange={(e) => setStock(e.target.value)} value={stock} placeholder="Stock" type="number" className="border p-2 w-full rounded" />
                                    {errorStock && <p className="text-red-500 text-sm">{errorStock}</p>}
                                </label>
                                <label>
                                    <p>Fruit Type</p>
                                    <select className="border p-2 rounded w-full" value={fruit_type} onChange={(e) => setfruit_type(e.target.value)}>
                                        <option value="" disabled selected>Select</option>
                                        <option value="IMPORT">Import</option>
                                        <option value="LOCAL">Local</option>
                                    </select>
                                    {errorFruitTipe && <p className="text-red-500 text-sm">{errorFruitTipe}</p>}
                                </label>
                                <label>
                                    <p>Images</p>
                                    <input onChange={handleImageChange} placeholder="Fruit Name" type="file" className="border p-2 w-full rounded" />
                                    {errorImage && <p className="text-red-500 text-sm">{errorImage}</p>}
                                </label>
                                <button onClick={handleUpdateFruit} className="rounded text-white bg-[#3A5B22] w-full p-2 my-2">UPDATE</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default HomeAdmin