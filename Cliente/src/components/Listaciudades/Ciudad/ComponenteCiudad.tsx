import React from 'react';
import { IcomponenteciudadProps } from './IcomponenteciudadProps';
import { IcomponenteciudadState } from './IcomponenteciudadState';

import '../../../styles/styles.css';

import {ciudad} from '../../../entities/ciudad'
const EVENT_NAME: string = 'Seccion1';

export default class ComponenteCiudad extends React.Component<IcomponenteciudadProps, IcomponenteciudadState> {
    
    constructor(props: IcomponenteciudadProps, state: IcomponenteciudadState) {
        super(props, state);
        this.state = {
            estadoled :props.estadoledload
        };
        this.props.socket.on(EVENT_NAME, this.handleMessage.bind(this));
        this.valorLedOnChange= this.valorLedOnChange.bind(this);
    }

    handleMessage(event: ciudad): void {  
        if (event.id === this.props.Id)
        {
            this.setState((state,props)=> ({estadoled: event.estadoled})); 
            console.log( event.id + ' ' + event.estadoled)    
        }
         
    }

    valorLedOnChange()
    {   
        console.log("cambia al pulsar");
        let mandaciudad = new ciudad()
        mandaciudad.Nombre = this.props.Nombre;
        mandaciudad.id =this.props.Id;
        mandaciudad.estadoled = !this.state.estadoled;
        this.handleMessage(mandaciudad);
        this.props.socket.emit(EVENT_NAME, mandaciudad);      
    }

    render() {
        let CiudadElement  = null;

        CiudadElement
         = (
            <p key={this.props.Id}>
             <input className={`icono-tren ${this.props.Nombre.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trimEnd().replace(/ /g,'-').toLocaleLowerCase()} ${this.state.estadoled}`} type="button" onClick={this.valorLedOnChange}></input>
             <br/>
            <span>{this.props.Nombre}</span>
            </p>
        );

        return CiudadElement;
    }
}

/*

     <td>{this.props.Id}</td>
                <td>{this.props.Nombre}</td>
                <td><input type="checkbox"
                 checked = {this.state.estadoled}
                 onChange = {this.valorLedOnChange}/>                 
                 </td>*/
