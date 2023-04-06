import Notification from "@/components/Notification";
import db , {auth} from "@/firebase/firebaseutils";
import { doc, getDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";

export async function getServerSideProps(context) {
    const blogID = context.params.slug;

    //fetch the blog post data from firestore db using the ID
    const blogPost = doc(db, 'blogposts', blogID)
    const docSnap = await getDoc(blogPost);
    const blogData = docSnap.data();

    return { props: { blogID ,blogData } };
}

const PostPage = ({ blogID ,blogData }) => {

    const [comments, setComments] = useState()
    const [newPostComment, setNewPostComment] = useState()

    const [userId, setUserId] = useState();
    const [userName, setUserName] = useState();

    const [notificationData, setNotificationData] = useState({
        category: "Warning",
        message: "This is a sample warning",
        timestamp: "Just Now",
    });

    useEffect( ()=>{
        auth.onAuthStateChanged(currentUser => {
          if (currentUser) {
            setUserId(currentUser.uid);
      
            (async () => {
              const docSnap = await getDoc(doc(db, 'users', currentUser.uid));
              setUserName(docSnap.data().name);
            })();
      
          } else {
            setUserName(null);
            setUserId(null);
          }
      
        });
      
      }, []);


    useEffect(() => {
        document.getElementById('post-content').innerHTML = blogData.content;
    }, []);

    useEffect(() => {
        async function getComments() {
            const newcomments = [];

            await db.collection('blogposts')
                .doc(blogID)
                .collection('comments')
                .orderBy('timestamp')
                .get()
                .then(snapShot => {
                    snapShot.forEach(doc => {
                        newcomments.push(doc.data())
                    })
                })

                setComments(newcomments);
            return newcomments;
        }

        getComments();

    }, [comments])

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const postComment = async()=>{

            const today = new Date(),
            now = today.getTime();

            const commentData = {
                userId: userId,
                username:userName,
                timestamp: now,
                content: newPostComment,
            }

            await db.collection('blogposts')
                .doc(blogID)
                .collection('comments')
                .add(commentData)
                .then( ()=>{
                    setNotificationData({
                        category: "Success!",
                        message: "Your comment has been posted.",
                        timestamp: "",
                    });
                    const toast = bootstrap.Toast.getOrCreateInstance(document.getElementById('liveToast'));
                    toast.show();
                })
                setNewPostComment('');
        }

        postComment();

    }


    return (
        <>
            <div className='form-control mt-5 mb-2'>
                <h1 className='mt-3 mb-5 text-center'>{blogData.postTitle}</h1>
                <h5 className="my-2">Author: {blogData.authorName}</h5>
                <h6 className="mt-3 text-muted">Created on: {blogData.createdTime}</h6>
                <h6 className="mb-5 text-muted">Last Updated on: {blogData.updatedTime}</h6>
                <div id='post-content' className="mt-3" >
                </div>

            </div>
            <form className='form-control mt-1' onSubmit={handleCommentSubmit}>
                <div className="input-group my-3">
                    
                    <textarea
                        onChange={(e) => setNewPostComment(e.target.value)}
                        type="text"
                        className="form-control input-box input-box-comment"
                        placeholder="Write some comments here..."
                        aria-label="postComment"
                        aria-describedby="post-comment-input"
                        value={newPostComment}
                        required
                    />
                </div>
                <div>
                    <button type="submit" className="btn btn-primary">Make Comment</button>
                </div>

            </form>
            <div className="form-control my-1">
                {
                    comments?.map(comment => {
                        const date = new Date(comment.timestamp);


                        return (
                            <div key={comment.timestamp} className="">
                                <h5>{comment.username}</h5>
                                <p>{comment.content}</p>
                                <h6>{ date.toLocaleString()}</h6>
                                <hr />
                            </div>
                        )
                    })
                }
            </div>
            <Notification {...notificationData} />
        </>
    )
}

export default PostPage