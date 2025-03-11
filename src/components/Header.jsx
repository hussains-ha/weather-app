import "./styles/Header.css";

function Header() {
  return (
    <header>
      <nav>
        <div id="inner-nav">
          <ul>
            <li id="header-logo">weather</li>
          </ul>
          <ul id="right-nav">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Location</a>
            </li>
            <li>
              <a href="#">Settings</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}

export default Header;
