import "./styles/Header.css";
import { useLocation, Link } from "react-router-dom";

function Header(props) {
  const location = useLocation();
  const isAppPage = location.pathname.includes("/app");

  return (
    <header
      className={
        props.loadingState === "loading"
          ? "loading"
          : props.loadingState.includes("Error")
          ? "error"
          : "loaded"
      }
    >
      <nav>
        <div id="inner-nav">
          <ul>
            <li id="header-logo">
              <Link to="/">weather</Link>
            </li>
          </ul>
          <ul id="right-nav">
            <li>
              <Link to="/app">Home</Link>
            </li>
            <li>
              {isAppPage ? (
                <a
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    props.setSearchOpen(true);
                  }}
                >
                  Search
                </a>
              ) : (
                <Link to="/">Search</Link>
              )}
            </li>
            <li>
              <Link to="/wip">Settings</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
