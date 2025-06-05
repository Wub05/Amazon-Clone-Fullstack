import { useContext, useState } from "react";
import { imagesData } from "../../constants/images";
import { auth } from "../../utility/firebase";
import { Type } from "../../utility/action_type";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../components/dataProvider/DataProvider";
import { ClipLoader } from "react-spinners";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({ signIn: false, signUp: false });

  const [{ user }, dispatch] = useContext(DataContext); //context
  const navigate = useNavigate(); //used to nagivate to different route
  const navStateData = useLocation(); //used to access navigate "state Datas"
  console.log(navStateData);

  //Auth Handler function
  const authHandler = async (e) => {
    e.preventDefault();
    try {
      if (e.target.name == "signIn") {
        setLoading({ ...loading, signIn: true }); //load initially

        await signInWithEmailAndPassword(auth, email, password)
          .then((userInfo) => {
            dispatch({
              type: Type.ADD_USER,
              user: userInfo.user,
            });
            setError("");
            console.log(`You logged in as: ${email}`);
            setLoading({ ...loading, signIn: false }); //stop loading - after work done
            navigate(navStateData?.state?.redirect || "/"); //navigate to the homepage (or redirect to protected Route).
          })
          .catch((error) => {
            setError(error.message);
            setLoading({ ...loading, signIn: false }); //to loading, if there is an error too..
          });
      } else {
        setLoading({ ...loading, signUp: true });
        await createUserWithEmailAndPassword(auth, email, password)
          .then((userInfo) => {
            dispatch({
              type: Type.ADD_USER,
              user: userInfo.user,
            });
            setError("");
            console.log("Registration successfull!");
            setLoading({ ...loading, signUp: false }); //false after successfull dispatch
            navigate("/"); //nagivate to homepage
          })
          .catch((error) => {
            setError(error.message);
            setLoading({ ...loading, signUp: false });
          });
      }
    } catch (error) {
      setError(error.message);
      setLoading({ ...loading, signUp: false, signIn: false });
    }
  };

  return (
    <section>
      <div className="w-[20%] mx-auto">
        <div className="w-[170px] m">
          <Link to="/">
            <img
              src={imagesData.Amazon_payment_logo}
              className="object-contain"
            />
          </Link>
        </div>
        <div className="p-5 my-2 outline outline-2 outline-[#7b767b78] rounded-md ">
          <h1 className="mb-3 text-3xl">Sign In</h1>
          {navStateData.state?.msg && (
            <small className="text-red-700 p-1 font-bold">
              {navStateData.state.msg}
            </small>
          )}
          <form action="" method="">
            <label htmlFor="email">E-mail</label>
            <br />
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="outline outline-2 outline-black rounded-sm px-1  mb-2"
            />
            <br />
            <label htmlFor="password">Password</label>
            <br />
            <input
              value={password}
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              className="outline outline-2 outline-black rounded-sm px-1 mb-2 "
            />
            <br />

            <button
              className="bg-yellow-600 mt-2 w-[50%] rounded-md py-1 transform hover:scale-125 transition-transform duration-300"
              name="signIn"
              onClick={authHandler}
            >
              {loading.signIn ? <ClipLoader size={15} /> : " Sign In"}
            </button>
            <p className="w-full leading-[1rem]  text-sm mx-auto my-2">
              By Signing-in you agree to AMAZON FAKE CLONE Conditions of you Use
              and Sale. Please see our Privacy Notice, our Cookies Notice our
              Interest-Based Ads Notice.
            </p>
            <button
              className="w-full py-2 font-bold rounded-sm text-nowrap text-xs mx-auto bg-[#63606374] transform hover:scale-110 transition-transform duration-300"
              name="signUp"
              onClick={authHandler}
            >
              {loading.signUp ? (
                <ClipLoader size={15} />
              ) : (
                "Create your Amazon account"
              )}
            </button>
          </form>
          {error && (
            <small className="text-red-600 text-sm mx-2 py-2 w-full">
              {error}
            </small>
          )}
        </div>
      </div>
    </section>
  );
};

export default Auth;
