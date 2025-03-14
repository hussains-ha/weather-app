import "./styles/Header.css";

function Header(props) {
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
              <a
                href=""
                onClick={(e) => {
                  e.preventDefault();
                  props.setSearchOpen(!props.isSearchOpen);
                }}
              >
                Search
              </a>
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
