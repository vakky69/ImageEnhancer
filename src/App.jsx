import Home from "./components/Home";

const App = () => {
  return (
    <div className="app-container">
      <div className="header">
        <h1 className="title">AI Image Enhancer</h1>
        <p className="description">
          Upload your Image and let AI enhance it in seconds!
        </p>
      </div>
      <Home />
      <div className="footer">Powered by @Vakky_34</div>
    </div>
  );
}
export default App;
