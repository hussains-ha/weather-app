import Search from "../components/Search";

function Welcome() {
  return (
    <>
      <div className="site-content">
        <h1>weather</h1>
        <h2>Select A Location To Get Started</h2>
        <Search />
      </div>
    </>
  );
}

export default Welcome;
