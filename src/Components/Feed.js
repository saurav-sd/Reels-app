import React, { useContext,useState,useEffect } from 'react'
import { AuthContext } from '../Context/AuthContext'
import UploadFiles from './UploadFiles';
import { database } from '../firebase'
import Post from './Post';
import Navbar from './Navbar';

function Feed() {
  const { user, logout } = useContext(AuthContext);
  const [userData,setUserData] = useState('')
    useEffect(()=>{
        const unsub = database.users.doc(user.uid).onSnapshot((snapshot)=>{
            setUserData(snapshot.data())
        })
        return ()=> {unsub()}
    },[user])

  return (
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column'}}>
      <Navbar userData={userData} />
      <UploadFiles user={userData} />
      <Post userData={userData}/>
    </div>
  )
}

export default Feed;