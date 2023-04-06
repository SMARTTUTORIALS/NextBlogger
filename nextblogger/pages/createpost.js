import BlogEditor from '@/components/BlogEditor'
import Notification from '@/components/Notification'
import db, { auth } from '@/firebase/firebaseutils'
import { doc, getDoc } from '@firebase/firestore'
import Head from 'next/head'
import React, { useEffect, useState } from 'react'

const createOrEditPost = () => {
    const [postContent, setPostContent] = useState('');
    const [postTitle, setPostTitle] = useState('');
    const [authorId, setAuthorId] = useState();
    const [authorName, setAuthorName] = useState();

    const [notificationData, setNotificationData] = useState({
        category: "Warning",
        message: "This is a sample warning",
        timestamp: "Just Now",
    });

    useEffect( ()=>{
        //retrieve the currently logged in user information

        auth.onAuthStateChanged(currentUser => {
          if (currentUser) {
            setAuthorId(currentUser.uid);
      
            (async () => {
              const docSnap = await getDoc(doc(db, 'users', currentUser.uid));
              setAuthorName(docSnap.data().name);
            })();
      
          } else {
            setAuthorName(null);
            setAuthorId(null);
          }
      
        });
      
      }, []);


    const handlePostSubmit = async (e) => {
        e.preventDefault();

        if (postContent.toString().length > 0) {

            const today = new Date(),
                date = today.toLocaleDateString() + '  ' + today.toLocaleTimeString();

            const newPostData = {
                postTitle: postTitle,
                createdTime: date,
                updatedTime: date,
                authorName: authorName,
                authorId: authorId,
                content: postContent,
            }
            const docRef = await db.collection('blogposts').add(newPostData)
                .then((docObj) => {
                    
                    setNotificationData({
                        category: "Success!",
                        message: "Your Blog Post has been created successfully",
                        timestamp: today.toLocaleTimeString(),
                    });
                    const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast'));
                    toast.show();

                    setPostContent('');
                    setPostTitle('');

                })
                .catch((err) => {
                    
                    setNotificationData({
                        category: "Warning!",
                        message: "Unable to create blog post. Please try again later",
                        timestamp: today.toLocaleTimeString(),
                    });
                    const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast'));
                    toast.show();
                })



            return docRef;
        } else {
            setNotificationData({
                category: "Warning!",
                message: "Unable to create empty blog post",
                timestamp: "",
            });
            const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast'));
            toast.show();
        }
    }

    const handleValueChange = (newPostContent) => {
        setPostContent(newPostContent)
    }

    return (
        <>
            <Head>
                <title>Next Blogger App</title>
            </Head>

            <main className="container-fluid d-flex flex-column justify-content-center">
                <form className='form-control mt-5' onSubmit={handlePostSubmit}>
                    <div className="input-group my-3">
                        <span className="input-group-text" id="post-title-input">Title: </span>
                        <input
                            onChange={(e) => setPostTitle(e.target.value)}
                            type="text"
                            className="form-control input-box"
                            placeholder="Enter Blog Post Title..."
                            aria-label="postTitle"
                            aria-describedby="post-title-input"
                            value={postTitle}
                            required
                        />
                    </div>

                    <BlogEditor onChange={handleValueChange} defaultContent={postContent}/>
                    <div className='d-flex justify-content-end'>
                        <button type="submit" className="btn btn-primary">Create Post</button>
                    </div>
                </form>

                <div className='form-control my-5'>
                    <h3>Blog Preview</h3>
                    <h4 className='mt-3 text-center'>{postTitle}</h4>
                    <div
                        dangerouslySetInnerHTML={{ __html: postContent }}
                    >
                    </div>
                </div>

                <Notification {...notificationData} />
            </main>
        </>
    )
}

export default createOrEditPost;