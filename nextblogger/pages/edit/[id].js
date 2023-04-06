import BlogEditor from '@/components/BlogEditor'
import Notification from '@/components/Notification'
import db from "@/firebase/firebaseutils";
import { doc, getDoc} from "@firebase/firestore";
import Head from 'next/head';
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {

    const blogID = context.params.id;

    //fetch the blog post data from firestore db using the ID
    const blogPost = doc(db, 'blogposts', blogID)
    const docSnap = await getDoc(blogPost);
    const blogData = docSnap.data();

    return { props: { blogID, blogData } };
}

const EditPage = ({ blogID, blogData }) => {

    const [postContent, setPostContent] = useState('');
    const [postTitle, setPostTitle] = useState('');

    const [notificationData, setNotificationData] = useState({
        category: "Warning",
        message: "This is a sample warning",
        timestamp: "Just Now",
    });

    useEffect(() => {
        setPostContent(blogData.content);
        setPostTitle(blogData.postTitle);
    }, []);

    const handlePostSubmit = async (e) => {
        e.preventDefault();

        if (postContent.toString().length > 0) {

            const today = new Date(),
                date = today.toLocaleDateString() + '  ' + today.toLocaleTimeString();

            const newPostData = {
                postTitle: postTitle,
                updatedTime: date,
                content: postContent,
            }
            const docRef = await db.collection('blogposts')
                .doc(blogID)
                .update(newPostData)
                .then((docObj) => {
                    
                    setNotificationData({
                        category: "Success!",
                        message: "Your Blog Post has been updated successfully",
                        timestamp: today.toLocaleTimeString(),
                    });
                    const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast'));
                    toast.show();
                })
                .catch((err) => {
                    
                    setNotificationData({
                        category: "Warning!",
                        message: "Unable to update blog post. Please try again later",
                        timestamp: today.toLocaleTimeString(),
                    });
                    const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast'));
                    toast.show();
                })



            return docRef;
        } else {
            setNotificationData({
                category: "Warning!",
                message: "Unable to update blog post",
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
                            defaultValue={postTitle}
                            aria-label="postTitle"
                            aria-describedby="post-title-input"
                            required
                        />
                    </div>

                    <BlogEditor onChange={handleValueChange} defaultContent={postContent} />
                    <div className='d-flex justify-content-end'>
                        <button type="submit" className="btn btn-primary">Update Post</button>
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

export default EditPage;