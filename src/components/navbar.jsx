import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeItem } from "../helpers/persistance-storage";
import { logoutUser } from "../slice/auth";
import { logo } from '../constants'

const Navbar = () => {
  const { loggedIn, user } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logoutUser());
    removeItem("token");
    navigate("/login");
  };
  return (
    <div className="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom container pt-2">
      <Link
        to={"./"}
        className="d-flex align-items-center text-dark text-decoration-none fs-4 fw-bold"
      >
        <img src={logo} alt="logo" className="pt-1" style={{ width: '110px' }} />
      </Link>

      <nav className="d-inline-flex mt-2 mt-md-0 ms-md-auto">
        {loggedIn ? (
          <>
            <Link
              to={"/create-article"}
              className="me-3 py-2 text-dark text-decoration-none"
            >
              Create article
            </Link>
            <p className="my-auto me-3 text-capitalize fw-bold">
              {user.username}
            </p>
            <button className="btn btn-outline-danger" onClick={logoutHandler}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to={"/login"}
              className="me-3 py-2 text-dark text-decoration-none"
            >
              Login
            </Link>
            <Link
              to={"/register"}
              className="me-3 py-2 text-dark text-decoration-none"
            >
              Register
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
