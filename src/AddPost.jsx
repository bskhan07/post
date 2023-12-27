
import React, { useState } from 'react'
import { useFireBase } from './Context/FireBaseContext'
import { useNavigate } from 'react-router-dom'
import Loder from './Loder'
const AddPost = () => {


    const navigate = useNavigate()

    const { UploadePost, upLoadImage, loader, setLoader } = useFireBase()
    const [imageUpload, setImageUpload] = useState(null)
    const [title, setTitle] = useState("")
    const [dec, setDec] = useState("")
    const [file, setFile] = useState(null)
    const upload = async () => {

        if (!imageUpload || title === "" || dec === "") {
            alert("Select All fields")
        }
        else {
            setLoader(true)
            const url = await upLoadImage(imageUpload.name, imageUpload)
            await UploadePost({ title, dec, url })
            setTitle("")
            setDec("")
            navigate('/post')
        }

    }
    const handleImage = (e) => {
        // setImageUpload(e.target.files[0])
        // handleChange(e)

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
            (

                <div style={{
                    display: "flex",
                    margin: "0 auto",
                    flexDirection: "column",
                    width: "50%",
                    gap: "10px",
                    marginTop: "50px"
                }}>
                    <h1>Create Post</h1>
                    <input required type="file" onChange={handleImage} />
                    <img src={file} width={200} alt="" />
                    <input required value={title} onChange={(e) => setTitle(e.target.value)} type="text" style={{ paddingTop: "10px", outline: "none", border: "none", borderBottom: "1px solid gray" }} placeholder='Title' />
                    <textarea style={{
                        outline: "none", padding: "10px"
                    }} required value={dec} onChange={(e) => setDec(e.target.value)} placeholder='Description' name="" id="" cols="30" rows="10"></textarea>
                    <div style={{
                        display: "flex",
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

                        }} onClick={upload} >Upload</button>
                        <button onClick={() => navigate('post')} style={{
                            width: "fit-content",
                            height: "fit-content",
                            padding: "10px 5px",
                            background: "#1877F2",
                            color: "white",
                            borderRadius: "5px",
                            border: "none",
                            outline: "none",
                            cursor: "pointer"
                        }}>See all post Post</button>
                    </div>
                </div>



            )

    )

}

export default AddPost