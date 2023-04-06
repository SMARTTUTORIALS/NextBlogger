import db from '@/firebase/firebaseutils'
import Link from 'next/link'

const BlogPreview = ({ title = "Blog Title",
    timestamp = "Created Just Now",
    excerpt = "This is a sample Blog Post...",
    id = "somepost",
    showEditLink = true,
    showDeleteLink = true,
}) => {
    //This component takes the title excerpt timestamp id and two boolean props to toggle the edit link
    // and delete link components based on the user role.

    const handleDeletePost = () => {
        //Delete the blogpost from database
        db.collection('blogposts').doc(id).delete()
    }


    return (

        <div className="card shadow-sm" >
            <div className="card-body">
                <h5 className="card-title mb-2">{title}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">{`Created on : ${timestamp}`}</h6>
                <p className="card-text mt-2">
                    {excerpt}
                </p>
                <div className='d-flex flex-sm-row flex-column'>
                    <Link href={`/${id}`} className="card-link">Go to post</Link>
                    {showEditLink && (<Link href={`/edit/${id}`} className="card-link">Edit post</Link>)}
                    {showDeleteLink && <Link href="#" onClick={handleDeletePost} className="card-link">Delete post</Link>}
                </div>
            </div>
            
        </div>


    )
}

export default BlogPreview