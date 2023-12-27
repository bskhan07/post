import React, { useEffect, useState } from 'react'
import { useFireBase } from './Context/FireBaseContext'
import Loder from './Loder'
import { useNavigate } from 'react-router-dom'

const Post = () => {
    const { getPost, post, deleteImg, deletePost, setLoader, loader, GetDoc } = useFireBase()
    useEffect(() => {
        getPost()
        !post ? setLoader(true) : setLoader(false)
    }, [post])

    const navigate = useNavigate()
    const Del = (id, url) => {
        setLoader(true)
        deleteImg(url)
        deletePost(id)
    }
    const getDoc = (id) => {
        setLoader(true)
        GetDoc(id)
        navigate("/updatepost")
    }
    return (

        loader ? <Loder /> :

            post?.length == 0 ? <div style={{
                display: "flex", flexDirection: "column",
                alignItems: "center",
                height: "100vh",
                justifyContent: "center",
                gap: "20px"
            }}>
                <h1 style={{ textAlign: "center" }}>No post uploaded  </h1>
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

                }} onClick={() => navigate('/')} >Add A Post <i className="fa-solid fa-arrow-right"></i> </button>
            </div>
                :
                (
                    <>
                        <div style={{
                            width: "100%",
                            padding: "20px 50px",
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: "center",
                            gap: "20px"
                        }} className="container">

                            {
                                post?.map((e) => {
                                    return (
                                        <div key={e.image} style={{
                                            width: "250px",
                                            border: "1px solid gray",
                                            borderRadius: "10px"

                                        }} className="post">
                                            <div className="image" style={{
                                                width: "100%",
                                                borderRadius: "10px 10px 0 0",
                                                border: "none",
                                                height: "300px",
                                                background: "black"
                                            }} >
                                                <img src={e.image} alt="" style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "contain"
                                                }} />
                                            </div>
                                            <div style={{

                                                padding: " 10px 0 10px 5px",
                                                wordWrap: "break-word"
                                            }}>
                                                <h3>{e.title}</h3>
                                                <p style={{
                                                    color: "gray", fontSize: "14px", marginTop: "5px"
                                                }}>{e.description.slice(0, 30)}...</p>
                                            </div>
                                            <div style={{
                                                padding: " 5px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: "10px"
                                            }} className="button">
                                                <button style={{
                                                    width: "fit-content",
                                                    height: "fit-content",
                                                    padding: "5px",
                                                    background: "#1877F2",
                                                    color: "white",
                                                    borderRadius: "5px",
                                                    border: "none",
                                                    outline: "none",
                                                    cursor: "pointer"
                                                }} onClick={() => getDoc(e.id)} > Update  <i className="fa-solid fa-pen-to-square"></i></button>
                                                <button style={{
                                                    width: "fit-content",
                                                    height: "fit-content",
                                                    padding: "5px",
                                                    background: "red",
                                                    color: "white",
                                                    borderRadius: "5px",
                                                    border: "none",
                                                    outline: "none",
                                                    cursor: "pointer"
                                                }} onClick={() => Del(e.id, e.image)}  >Delete <i className="fa-solid fa-trash"></i></button>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center'
                        }}>
                            <button style={{
                                width: "fit-content",
                                height: "fit-content",
                                padding: "10px 5px",
                                background: "#1877F2",
                                color: "white",
                                borderRadius: "5px",
                                border: "none",
                                outline: "none",
                                cursor: "pointer"
                            }} onClick={() => navigate('/')} >Add  a New Post</button>
                        </div>
                    </>

                )


    )
}

export default Post