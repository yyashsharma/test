import { Link } from "react-router-dom"
import { onAuthStateChanged, getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import app from "../firebase"
import { useEffect, useState } from "react";

const auth = getAuth(app);


const loginHandler = () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider);
}

const logoutHandler = () => {
    signOut(auth);
}



const Header = () => {


    const [user, setUser] = useState(false);


    useEffect(() => {

        const unsubscribe = onAuthStateChanged(auth, (data) => {
            setUser(data);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    return (
        <nav className="Navbar">
            <div>
                <Link to={"/"}>logo</Link>
            </div>
            <section>
                <ul><Link to={"/"}>Home</Link></ul>

            </section>
            {
                user ? (
                    <div>
                        <button onClick={logoutHandler}>Logout</button>
                    </div>
                )
                    : (
                        <div>
                            <button onClick={loginHandler}>Login</button>
                        </div>
                    )
            }
        </nav>
    )
}

export default Header