import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/styles.css';
import Listaciudades from './components/Listaciudades/Listaciudad'
import * as serviceWorker from './serviceWorker';
import './fonts/Raleway-Medium.ttf';


ReactDOM.render(
<<<<<<< HEAD
  <React.StrictMode>       
    <Listaciudades/>
    <input type= 'button' id = 'add-button' className = '.add-button'  value="Instalar APP"></input>
=======
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
>>>>>>> upstream/feature/add-styles
  </React.StrictMode>,
  document.getElementById('root')
);

let deferredPrompt;
const addBtn = document.getElementById('add-button');
addBtn.style.display = 'none';


window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can add to home screen
  addBtn.style.display = 'block';

  addBtn.addEventListener('click', (e) => {
    // hide our user interface that shows our A2HS button
    addBtn.style.display = 'none';
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
  });
});


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
