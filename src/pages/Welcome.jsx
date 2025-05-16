import Search from "../components/Search";

function Welcome(props) {
  return (
    <>
      <div className="site-content">
        <h1>weather</h1>
        <h2>Enter A Location</h2>
        <Search setLoadingState={props.setLoadingState} loadingState={props.loadingState}/>
      </div>
    </>
  );
}

export default Welcome;
