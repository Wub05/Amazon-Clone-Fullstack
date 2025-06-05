import { useContext, useEffect } from "react";
import PageRouter from "../Router";
import { DataContext } from "./components/dataProvider/DataProvider";
import { auth } from "./utility/firebase";
import { Type } from "./utility/action_type";

const App = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect(() => {
    //global state
    //Firebase method that listens for changes in the user's authentication state.
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.ADD_USER,
          user: authUser,
        });
        console.log(authUser);
      } else {
        dispatch({
          type: Type.ADD_USER,
          user: null,
        });
      }
      console.log(authUser);
    });
  }, []);

  return <PageRouter />;
};

export default App;
