import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/styles.css';
import Listaciudades from './components/Listaciudades/Listaciudad'
import * as serviceWorker from './serviceWorker';
import './fonts/Raleway-Medium.ttf';


ReactDOM.render(
  <React.StrictMode>
  <header>
     <div className="logo">
     </div>
     <div className="titulo">
       <p>Maqueta Trenes</p>
     </div>
   </header>
    <section className="botones">
    <Listaciudades/>
    </section>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
