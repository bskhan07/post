import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes, } from "firebase/storage"
import { v4 } from "uuid";
import { collection, doc, getFirestore, addDoc, getDocs, deleteDoc, getDoc, updateDoc } from "firebase/firestore"
const FirebaseContext = createContext()

const firebaseConfig = {
    apiKey: "AIzaSyBo0EWr8QXQq9CIyY7ALfLxVdE8KkFI6MM",
    authDomain: "gallery-c79c7.firebaseapp.com",
    projectId: "gallery-c79c7",
    storageBucket: "gallery-c79c7.appspot.com",
    messagingSenderId: "962315912507",
    appId: "1:962315912507:web:33145880127d1aaf33e31e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const DbRef = collection(db, "Post")


const storage = getStorage(app)


export const useFireBase = () => {
    return useContext(FirebaseContext)
}
export const FireBaseProvider = ({ children }) => {


    const [post, setAllPost] = useState(null)

    const [loader, setLoader] = useState(false)
    const [updateFormData, setUpdateFormData] = useState(null)


    const UploadePost = async ({ title, dec, url }) => {
        try {
            await addDoc(DbRef, {
                title: title,
                description: dec,
                image: url
            })


        } catch (error) {
            console.log(error)
        }
        finally {
            setLoader(false)
        }
    }

    const upLoadImage = async (fileName, imgUpload) => {

        try {
            const StorageRef = ref(storage, `images/${fileName + v4()}`)
            await uploadBytes(StorageRef, imgUpload)
            const url = await getDownloadURL(StorageRef)
            return url
            alert("success")
        } catch (error) {
            console.log(error)
        }
    }

    // const getList = async () => {
    //     try {
    //         const listRef = ref(storage, 'images')
    //         const res = await listAll(listRef)
    //         const url = await Promise.all(res.items.map(async (item) => {
    //             const res = await getDownloadURL(item)
    //             return res
    //         }))
    //         setList(url)

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    const getPost = async () => {
        try {
            const res = await getDocs(DbRef)
            const post = res.docs.map((item) => {
                return { ...item.data(), id: item.id, }
            })
            setAllPost(post)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteImg = async (imgurl) => {
        try {
            const storageRef = ref(storage, `${imgurl}`)
            await deleteObject(storageRef)

            getPost()
        } catch (error) {
            console.log(error)
        }
    }

    const deletePost = async (id) => {
        try {
            await deleteDoc((doc(db, "Post", id)))
            getPost()
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoader(false)
        }
    }

    const GetDoc = async (id) => {
        try {
            const docRef = doc(db, "Post", id)
            const docSnap = await getDoc(docRef)
            const data = docSnap.data()
            setUpdateFormData({ ...data, id })
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoader(false)
        }
    }

    const updatePost = async ({ id, title, dec, url }) => {
        try {
            const postRef = doc(db, "Post", id)
            await updateDoc(postRef, {
                title: title,
                description: dec,
                image: url
            })
        } catch ({ error }) {
            console.log(error)
        }
        finally {
            setLoader(false)
        }
    }
    return (
        <FirebaseContext.Provider value={{ UploadePost, upLoadImage, loader, getPost, post, deleteImg, deletePost, setLoader, GetDoc, updateFormData, updatePost }} >
            {children}
        </FirebaseContext.Provider>
    )
} 