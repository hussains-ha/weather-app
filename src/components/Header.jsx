import "./styles/Header.css";
import { useLocation } from "react-router-dom";

function Header(props) {
  const location = useLocation();
  const isAppPage = location.pathname.includes("/app");

  return (
    <header>
      <nav>
        <div id="inner-nav">
          <ul>
            <li id="header-logo">
              <a href="/">weather</a>
            </li>
          </ul>
          <ul id="right-nav">
            <li>
              <a href="/app">Home</a>
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
                <a href="/">Search</a>
              )}
            </li>
            <li>
              <a href="/wip">Settings</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
