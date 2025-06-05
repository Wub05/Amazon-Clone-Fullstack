import Layout from "../Layout/Layout";
import { PropagateLoader, BounceLoader, HashLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className="absolute inset-[50%] ">
      {/* <PropagateLoader color="#eeac06" size={20} /> */}
      {/* <BounceLoader color="#eeac06" size={80} /> */}
      <HashLoader color="#eeac06" size={80} speedMultiplier={1.5} />
    </div>
  );
};

export default Loader;
