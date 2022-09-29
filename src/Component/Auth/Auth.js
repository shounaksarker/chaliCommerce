import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { child, get, getDatabase, ref, set, update } from "firebase/database";
import React, { useContext, useState } from "react";
import { Button, Fade, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { uid } from "uid";
import { MyContext } from "../../App";
import Header from "../Header/Header";
import "./auth.css";
import app from "./firebase.config";

const Auth = () => {
  const [, , , , , user, setUser] = useContext(MyContext);
  // ------ firebase ------
  const db = getDatabase(app);
  const auth = getAuth();

  // ------ toggle login & signup ------
  let [loginBtn, setLoginBtn] = useState(true);
  const toggle = () => {
    setLoginBtn(!loginBtn);
  };

  // handleBlur for taking data from input
  const handleBlur = (e) => {
    let res = { ...user };
    if (e.target.name === "name") {
      res.name = e.target.value;
      setUser(res);
    }
    if (e.target.name === "email") {
      res.email = e.target.value;
      setUser(res);
    }
    if (e.target.name === "password") {
      res.password = e.target.value;
      setUser(res);
    }
    // res[e.target.name] = e.target.value;
    // setUser(res)
  };

  const handleSignUp = (e) => {
    // const uuid = uid();

    if (user.name === "") {
      alert("Fill up Your name");
    }
    if (user.password === "") {
      alert("Fill up Your password");
    }
    if (user.email === "") {
      alert("Fill up Your email");
    }

    createUserWithEmailAndPassword(auth, user.email, user.password)
      .then((res) => {
        const u = res.user;

        // console.log("u :", u);
        alert("user created");
        set(ref(db, `/customer/${u.uid}`), {
          name: user.name,
          email: user.email,
          password: user.password,
          uid: u.uid,
        });
        localStorage.setItem("name", user.name);
        localStorage.setItem("email", user.email);
        localStorage.setItem("uid", u.uid);
        navigate(-1, { replace: true });
        setUser("");
      })
      .catch((error) => {
        console.log(error);
        alert(error.code, error.message);
        // ..
      });
    e.preventDefault();
  };

  const handleLogin = (e) => {
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((res) => {
        const u = res.user;
        // last login update
        update(ref(db, `/customer/${u.uid}`), {
          last_login: new Date(),
        });
        alert("login done");

        // get data from dtabase
        const dbRef = ref(getDatabase());
        get(child(dbRef, `/customer/${u.uid}`))
          .then((snapshot) => {
            if (snapshot.exists()) {
              const userData = snapshot.val();
              localStorage.setItem("name", userData.name);
              localStorage.setItem("email", userData.email);
              localStorage.setItem("uid", userData.uid);
              navigate(-1 || "/", { replace: true });
              setUser("");
            } else {
              console.log("No data available");
            }
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.log(error);
        alert(error.messgae);
      });
    e.preventDefault();
  };

  // const handleLogout=() => {
  //   console.log('logout pressed');
  //   localStorage.clear();
  //   signOut(auth).then(() => {
  //     localStorage.clear();
  //     alert('logout done')
  //   }).catch((error) => {
  //     alert(error.code)
  //   });
  //  }

  // others
  let navigate = useNavigate();
  return (
    <div className="authentication">
      <Header />
      <div className="container-md">
        <div className="sign-form mt-5">
          <div className="d-flex">
            <button
              className={loginBtn ? "btn login active" : "btn login"}
              onClick={toggle}
              aria-controls="example-collapse-text"
              aria-expanded={loginBtn}
            >
              Login
            </button>

            <button
              className={!loginBtn ? "btn signup active" : "btn signup"}
              onClick={toggle}
              aria-controls="example-fade-text"
              aria-expanded={!loginBtn}
            >
              SignUp
            </button>
          </div>

          {/* -------- login Form -------- */}

          <Fade in={loginBtn}>
            <Form
              className={loginBtn ? "p-3" : "p-3 d-none"}
              id="example-collapse-text"
            >
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onBlur={handleBlur}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onBlur={handleBlur}
                />
              </Form.Group>

              <Button
                className="submit"
                variant="primary"
                type="submit"
                onClick={handleLogin}
              >
                Log in
              </Button>
            </Form>
          </Fade>

          {/* -------- sign up -------- */}

          <Fade in={!loginBtn}>
            <Form
              className={!loginBtn ? "p-3" : "p-3 d-none"}
              id="example-fade-text"
            >
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  onBlur={handleBlur}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  name="email"
                  placeholder="Enter email"
                  onBlur={handleBlur}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  placeholder="Enter password"
                  onBlur={handleBlur}
                  required
                />
              </Form.Group>

              <Button
                className="submit"
                variant="primary"
                type="submit"
                onClick={handleSignUp}
              >
                Create Account
              </Button>
            </Form>
          </Fade>

          {/* others login option  */}

          {/* <div className="p-3">
            <Button className="social-btn" type="submit" onClick={handleGoogle}>
              Log in with Google
            </Button>

            <Button className="social-btn" type="submit" onClick={handleFb}>
              Log in with Facebook
            </Button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Auth;
