// import logo from "./logo.svg";
// import "./App.css";

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React from "react";
import "./App.css";

const Header = () => {
  return <div className="header_div">Header</div>;
};

const Sidebar = () => {
  return (
    <div className="sidebar_div">
      Sidebar
      <ul>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
  );
};

const Content = () => {
  return (
    <main>
      <p>123</p>
    </main>
  );
};

const Footer = () => {
  return <div className="footer_div">Footer</div>;
};

const App = ({ children, className, type }) => {
  return (
    <div
      className={[
        "layout_wrapper ",
        type === "header_top" ? "header_top" : "",
        type === "sidebar_right" ? "sidebar_right" : "",
        className,
      ].join(" ")}
    >
      {type === "header_top" ? <Header /> : <Sidebar />}
      <div className="main">
        {type === "header_top" ? <Sidebar /> : <Header />}
        <div className="content">
          <Content />
        </div>
        {type === "header_top" ? null : <Footer />}
      </div>
      {type === "header_top" ? <Footer /> : null}
    </div>
  );
};

export default App;
