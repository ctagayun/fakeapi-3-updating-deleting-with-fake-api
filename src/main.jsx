import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min"

/*=======================================================
//    The main.jsx is responsible in instantiating app.jsx
//  The App.jsx is instantiated in index.html under 
//  the element: id attribute equals "root"
//
//    The ReactDOM.createRoot(document.getElementById('root')) method 
//  expects the HTML element that is used to instantiate React. 
//  We are using JavaScript's built-in getElementById() method to 
//  return the HTML element that we have seen in the index.html file.
//     Once we have the root object, we can call render() on the returned 
//  root object with JSX as parameter which usually represents 
//  the entry point component (also called root component). 
=========================================================*/
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
