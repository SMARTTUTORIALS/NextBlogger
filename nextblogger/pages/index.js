
import BlogPreview from '@/components/BlogPreview'
import { useEffect, useState } from 'react'
import db, { auth } from '@/firebase/firebaseutils';
import { collection, getDocs, getDoc, doc } from '@firebase/firestore';
import RegisterLogin from './registerlogin';
import Head from 'next/head';


export default function Home() {

  const [blogList, setBlogList] = useState([]);
  const [isLoggedIn, setLoggedInState] = useState(true);
  const [userID, setUserID] = useState();
  const [userRole, setUserRole] = useState();

  useEffect(() => {
    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {
        setUserID(currentUser.uid);

        (async () => {
          const docSnap = await getDoc(doc(db, 'users', currentUser.uid));
          setUserRole(docSnap.data().role);
        })();

      } else {
        setLoggedInState(false);
        setUserID(null);
      }

    });

  }, []);

  useEffect(() => {

    const getBlogPosts = async () => {
      const collRef = collection(db, "blogposts");
      const docSnaps = await getDocs(collRef);
      setBlogList(docSnaps.docs);
    }

    getBlogPosts();

  }, [blogList]);

  useEffect(() => {
    auth.currentUser ? setLoggedInState(true) : setLoggedInState(false)
  }, [auth.currentUser]);

  return (
    <>
      <Head />

      <main className="container-fluid d-flex flex-column gap-2 justify-content-center align-item-center mt-5">

        {isLoggedIn ?
          (
            //This is to show a simple message if there are no blogs to display
            (blogList.length === 0) ? (
              <h4 className='text-center'>No Blogs to show</h4>
            ): (
              blogList.map(blog => {
              const blogData = blog.data();

              const excerpt = blogData.content.replace(/(<([^>]+)>)/gi, '').replace(/&nbsp;/gi, ' ')

              const truncateString = (str, maxLength) => {
                if (str.length > maxLength) {
                  return str.substring(0, maxLength - 6) + '......';
                } else {
                  return str;
                }
              }

              let editable = false;
              let deletable = false;

              if (userRole === 'admin' || (userRole === 'author' && blogData.authorId === userID)) {
                editable = true;
                deletable = true;
              }

              const metadata = {
                title: blogData.postTitle,
                timestamp: blogData.updatedTime,
                excerpt: truncateString(excerpt, 200),
                id: blog.id,
                showEditLink: editable,
                showDeleteLink: deletable,
              }
              return <BlogPreview {...metadata} key={metadata.id} />
            })
            )
        ) : (
        <RegisterLogin />
        )
        }
      </main>
    </>
  )
}
