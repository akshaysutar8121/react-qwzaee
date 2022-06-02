import React, { useEffect, useState, useReducer } from 'react';
import './Post.css';
// import Avatar from './@material-ui/core/Avatar';
import { db, auth, storage } from './firebase';
import SendIcon from '@mui/icons-material/Send';
import Input from '@mui/material/Input';
import {
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  set,
  ref,
} from 'firebase/firestore';
const Post = ({ name, image, caption, Postid, main }) => {
  const [comments, setComments] = useState([]);
  const [icomment, setiComment] = useState();
  const [reducervalue, forceUpdate] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    const res = [];

    async function getData() {
      const querySnapshot = await getDocs(
        collection(db, 'posts', `${name}`, 'comments')
      );
      querySnapshot.forEach((doc) => {
        res.push(doc.data());
      });
      setComments(res);
    }

    getData();
  }, [reducervalue]);

  const sendComment = async () => {
    if (icomment) {
      alert('the coment is senndind wait....');
      const docRef = await addDoc(
        collection(db, 'posts', `${name}`, 'comments'),
        {
          name: `${main}`,
          comment: `${icomment}`,
        }
      );
      alert('the coment sent.....');

      forceUpdate();
    } else {
      alert('pleas enter comment');
    }
  };
  return (
    <div className="Post">
      <div className="post_header">
        <img src={image} alt="no_image" />

        <h3>{name}</h3>

        {/* header avatar useraname */}
      </div>
      <img className="post_image" src={image} alt="" />
      {/* user post image */}
      <div className="post_footer">
        <p>
          <strong>{name}:</strong>
          {caption}
        </p>
      </div>

      {/* user caption */}
      <span>Comments:-</span>
      <div className="comments">
        {comments.map((val, idx) => {
          return (
            <>
              <div className="inner_">
                <strong>
                  <p>{val.name}:</p>
                </strong>
                <p>{val.comment}</p>
              </div>
            </>
          );
        })}
      </div>
      <div className="send_comment">
        <Input
          placeholder="Enter a comment"
          onChange={(e) => {
            setiComment(e.target.value);
          }}
        />

        <SendIcon onClick={sendComment} />
      </div>
    </div>
  );
};
export default Post;
