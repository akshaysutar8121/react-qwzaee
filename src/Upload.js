import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { db, auth, storage } from './firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import {v4} from uuid;
import { collection, addDoc } from 'firebase/firestore';
import './Upload.css'
//import { collection, addDoc } from "firebase/firestore"
const Upload = ({ username }) => {
  const [caption, setCaption] = useState('');
  const [image, setImage] = useState('');
  const [progress, setProgress] = useState(0);
  const [url, setUrl] = useState(null);
  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };
  const setData = async (nurl) => {
    
    alert('data is uploading..');
    if(image){
      await setDoc(doc(db, "posts",`${username.displayName}`),{
        image: `${nurl}`,
        name: `${username.displayName}`,
        caption: `${caption}`,
      });
      setImage(null)
    }
    else{
      alert("please select a image ")
    }
    
    
  
  
   

  };
  const getUrl = () => {
    const dimRef = ref(storage, `images/${image.name}`);
    getDownloadURL(dimRef).then((url) => {
      setUrl(url);
      
      setData(url);
    });
  };
  const handleUpload = () => {
    if (!image)
    {
      alert("please select a image...")
      return 0;
    }
   
    else{
      const imRef = ref(storage, `images/${image.name}`);
   
       uploadBytes(imRef, image)
      .then((snapshot) => {
        alert('image uploaded...');
        getUrl();
      })
      .catch((err) => {
        console.log(err);
      });
  };
    }

  return (
    <div  className="upload">
      <progress value={progress} max="100"></progress>
      <input
        type="text"
        placeholder="enter a caption"
        onChange={(e) => setCaption(e.target.value)}
        value={caption}
      />
      <input type="file" name="" id="" onChange={handleChange} />
      <Button onClick={handleUpload}>Post</Button>
    </div>
  );
};
export default Upload;
