import React, { useEffect, useState } from 'react'
import { useFireBase } from './Context/FireBaseContext'
import { useNavigate } from 'react-router-dom'
import Loder from './Loder'
const UpdatePost = () => {
    const { updateFormData, updatePost, loader, setLoader, deleteImg, upLoadImage } = useFireBase()
    const [title, setTitle] = useState("")
    const [dec, setDec] = useState("")
    const [imageUpload, setImageUpload] = useState(null)
    const [file, setFile] = useState(null)
    const [imgUrl, setImgUrl] = useState("")
    const navigate = useNavigate()
    useEffect(() => {
        if (updateFormData) {
            setDec(updateFormData?.description)
            setTitle(updateFormData?.title)
            setImgUrl(updateFormData?.image)
        }
    }, [updateFormData])

    const updateHandler = async () => {

        if (title === "" || dec === "") {
            alert("Select All fields")
        }

        else if (imageUpload) {
            setLoader(true)
            deleteImg(imgUrl)
            const url = await upLoadImage(imageUpload.name, imageUpload)
            updatePost({ id: updateFormData?.id, title, dec, url })
            navigate('/post')
        }

        else {
            setLoader(true)
            updatePost({ id: updateFormData?.id, title, dec, url: imgUrl })
            navigate('/post')
        }

    }


    const handleImage = (e) => {
        const check = e.target.files[0]
        if (check) {
            if (check.type.startsWith('image/')) {
                setImageUpload(check)
                handleChange(e)
            }
            else {
                alert("please select a valid image file")
            }
        }
    }
    const handleChange = (e) => {
        setFile(URL.createObjectURL(e.target.files[0]));
    }
    return (

        loader ? <Loder /> :
            <div style={{
                display: "flex",
                margin: "0 auto",
                flexDirection: "column",
                width: "50%",
                gap: "10px",
                marginTop: "50px"
            }}>
                <h1>Update Post</h1>

                <input onChange={handleImage} required type="file" />
                <img src={file ? file : updateFormData?.image} width={200} alt="" />
                <input value={title} required type="text" onChange={(e) => setTitle(e.target.value)} style={{ paddingTop: "10px", outline: "none", border: "none", borderBottom: "1px solid gray" }} placeholder='Title' />
                <textarea value={dec} required style={{
                    outline: "none", padding: "10px"
                }} onChange={(e) => setDec(e.target.value)} placeholder='Description' name="" id="" cols="30" rows="10"></textarea>
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"
                }}>
                    <button style={{
                        width: "fit-content",
                        height: "fit-content",
                        padding: "10px 5px",
                        background: "#1877F2",
                        borderRadius: "5px",
                        color: "white",
                        border: "none",
                        outline: "none",
                        cursor: "pointer"

                    }} onClick={updateHandler} >Update Post</button>
                    <button onClick={() => navigate('/post')} style={{
                        width: "fit-content",
                        height: "fit-content",
                        padding: "10px 5px",
                        background: "#1877F2",
                        borderRadius: "5px",
                        color: "white",
                        border: "none",
                        outline: "none",
                        cursor: "pointer"
                    }}>See all post Post</button>
                </div>
            </div>
    )
}

export default UpdatePost