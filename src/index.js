import React from "react"
import ReactDOM from "react-dom"
import Theme from "./Theme"
import Home from "./Home"
import "./site.css"

const Site = () => {
    const path = window.location.pathname
        .replace(/\/$/, "")
        .split("/")
        .slice(-1)[0]
    return  <Theme><Home /></Theme>
}

ReactDOM.render(<Site />, document.getElementById("root"))