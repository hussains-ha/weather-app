import Search from "../components/Search";

function Welcome() {
  return (
    <>
      <div className="site-content">
        <h1>weather</h1>
        <h2>Enter A Location</h2>
        <Search />
      </div>
    </>
  );
}

export default Welcome;
