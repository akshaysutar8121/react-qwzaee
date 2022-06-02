import React, { useState, useEffect } from 'react';
import * as React from 'react';
import './style.css';
import Post from './Post';
import Upload from './Upload';
import Box from '@mui/material/Box';
import { db, auth, storage } from './firebase';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  set,
  ref,
} from 'firebase/firestore';
import InstagramEmbed from 'react-instagram-embed';


export default function App() {
  const [open, setOpen] = React.useState(false);
  const [opensignIn, setopensignIn] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [posts, setPosts] = useState([]);
  const [docid, setDocid] = useState([]);
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [user, setUser] = useState(null);
  const [check, setCheck] = useState(null);

  const [main, setMain] = useState(null);
 
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (userO) => {
      if (userO) {
        ;
        const uid = userO.uid;
        setCheck(userO);

        if (userO.displayName != undefined) {
          
          setMain(userO.displayName);
        } else {
         
          let result = userO.email.indexOf('@');
          //console.log(result);
          typeof userO.email;
          let fresult = userO.email.slice(0, result);
          userO.displayName = fresult;
          setMain(userO.displayName);
         
     
        }
        // ...
      } else {
      
        // ...
        setCheck(null);
      }
    });

    return () => {
      unSubscribe();
    };
  }, [user, check]);
  //*********** */
  useEffect(() => {
    const res = [];
    const ids = [];
    async function getData() {
      const querySnapshot = await getDocs(collection(db, 'posts'));
      querySnapshot.forEach((doc) => {
        res.push(doc.data());

        //console.log(doc.id);
        ids.push(doc.id);
      });
     
      setDocid(ids);
      setPosts(res);
     
    }
    getData();
  }, []);
 
  const sendInput = () => {
    const ariaLabel = { 'aria-label': 'description' };
    return ariaLabel;
  };
  const SignUp = (event) => {
    event.preventDefault();
    
    createUserWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        
        const user = userCredential.user;
        setOpen(false);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
        // ..
      });
  };

  const signIn = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, pass)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        setopensignIn(false);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  
  return (
    <div className="App">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 200,
            bgcolor: 'background.paper',
            border: '2px solid #fafafa',
            boxShadow: 24,
            p: 4,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <center className="inner_logo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/insta-react-project-37465.appspot.com/o/insta.png?alt=media&token=5df722f7-f144-457a-a015-1447d8296240"
              alt="no_image"
              height="100px"
              widht="100px"
            />
          </center>

          <Input
            placeholder="User name"
            inputProps={sendInput}
            sx={{ mt: 3 }}
            onChange={(e) => {
              setUser(e.target.value);
            }}
          />
          <Input
            placeholder="Email"
            inputProps={sendInput}
            sx={{ mt: 3 }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            placeholder="Password"
            inputProps={sendInput}
            sx={{ mt: 3 }}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          <center>
            {' '}
            <Button
              onClick={SignUp}
              sx={{ mt: 2, border: '1px solid black' }}
              type="submit"
            >
              Signup
            </Button>
          </center>
        </Box>
      </Modal>
      {/* sign in */}
      <Modal
        open={opensignIn}
        onClose={() => {
          setopensignIn(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 200,
            bgcolor: 'background.paper',
            border: '2px solid #fafafa',
            boxShadow: 24,
            p: 4,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <center className="inner_logo">
            <img
              src="https://firebasestorage.googleapis.com/v0/b/insta-react-project-37465.appspot.com/o/insta.png?alt=media&token=5df722f7-f144-457a-a015-1447d8296240"
              alt="no_image"
              height="100px"
              widht="100px"
            />
          </center>

          <Input
            placeholder="Email"
            inputProps={sendInput}
            sx={{ mt: 3 }}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            placeholder="Password"
            inputProps={sendInput}
            sx={{ mt: 3 }}
            onChange={(e) => {
              setPass(e.target.value);
            }}
          />
          <center>
            {' '}
            <Button
              onClick={signIn}
              sx={{ mt: 2, border: '1px solid black' }}
              type="submit"
            >
              SignIn
            </Button>
          </center>
        </Box>
      </Modal>

      {/* {**************************} */}
      <div className="header_image">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/insta-react-project-37465.appspot.com/o/insta.png?alt=media&token=5df722f7-f144-457a-a015-1447d8296240"
          alt="no_image"
        />
        <div className="authentic">
          {check ? (
            <Button
              sx={{
                position: 'absolute',
                right: '5%',
                fontSize: '13px',
                border: '1px solid black',
                marginBottom: '20px',
              }}
              className="logout"
              onClick={() => {
                auth.signOut();
              }}
            >
              logout
            </Button>
          ) : (
            <div className="login_contaner">
              <Button onClick={handleOpen}>signup</Button>
              <Button
                onClick={() => {
                  setopensignIn(true);
                }}
              >
                sigin
              </Button>
            </div>
          )}
        </div>
      </div>
      {check ? (
        posts.map((value, idx) => {
          return (
            <Post
              Postid={value}
              image={value.image}
              name={value.name}
              caption={value.caption}
              main={main}
              key={idx}
            />
          );
          // setDocid(i + 1);
        })
      ) : (<h1></h1>)}
        

      {/* <div className="app__postsRight no-mobile">
        <InstagramEmbed
          className="floating"
          url="https://www.instagram.com/reel/CeMVLpOK6l0/?utm_source=ig_web_copy_link"
          maxWidth={320}
          hideCaption={false}
          containerTagName="div"
          protocol=""
          injectScript
          onLoading={() => {}}
          onSuccess={() => {}}
          onAfterRender={() => {}}
          onFailure={() => {}}
        />
      </div> */}
      {check ? (
        <Upload username={check} />
      ) : (
        <p className="para">login to upload</p>
      )}
    </div>
  );
}
