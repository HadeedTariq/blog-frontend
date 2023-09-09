import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { NavBar } from "./";

function ProtectedRoute({ children, setting }) {
  const { logInUser } = useSelector((state) => state.user);
  if (logInUser) {
    return (
      <>
        {!setting && <NavBar />}
        {children}
      </>
    );
  } else {
    return <Navigate to={"/auth"} />;
  }
}

export default ProtectedRoute;
