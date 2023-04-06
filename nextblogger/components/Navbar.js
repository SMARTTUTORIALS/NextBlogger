import db, { auth } from '@/firebase/firebaseutils'
import { doc, getDoc } from '@firebase/firestore';
import Link from 'next/link'
import React, { useState, useEffect } from 'react'

const Navbar = () => {
  const [userRole, setUserRole] = useState(true);

  useEffect(() => {

    auth.onAuthStateChanged(currentUser => {
      if (currentUser) {


        (async () => {

          const docSnap = await getDoc(doc(db, 'users', currentUser.uid));
          setUserRole(docSnap.data().role === 'viewer' ? false : true);
        })();

      } else {
        setUserRole(false);
      }

    });



  }, []);

  const logOffUser = () => {
    auth.signOut();
  }

  return (
    <div>

      <nav className="navbar navbar-expand-md bg-body-tertiary shadow-sm">
        <div className="container-fluid">
          <Link className="navbar-brand" href="/">NextBlogger</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mt-2 mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" href="/">Home</Link>
              </li>

              {
                userRole && (
                  <li className="nav-item">
                    <Link className="nav-link" href="/createpost">Create Post</Link>
                  </li>
                )
              }

              <li className="nav-item">
                <span className="cursor-pointer nav-link" onClick={logOffUser}>Log out</span>
              </li>

            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

    </div>
  )
}

export default Navbar;