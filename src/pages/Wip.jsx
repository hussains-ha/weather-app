
function Wip() {
    const red = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);

  const style = {
    color: `rgb(${red}, ${blue}, ${green})`,
  };
  return (
    <>
      <h1>
        <a href="/">weather</a>
      </h1>
      <h2 style={style}>This page is currently in the works :)</h2>
    </>
  );
}

export default Wip;
