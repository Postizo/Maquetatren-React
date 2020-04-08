import React from 'react';
import { IListaCiudadProps } from './IListaCiudadProps';
import { IListaCiudadState } from './IListaCiudadState';
import { ciudadSrv} from '../../services/ciudadSrv';
import {ciudad} from '../../entities/ciudad';
import ComponenteCiudad from './Ciudad/ComponenteCiudad'
import  io from 'socket.io-client';
const SERVER_URL: string = 'https://controlamaquetatrenes.biz';

export default class Listaciudad extends React.Component<IListaCiudadProps, IListaCiudadState> {
    private socket: SocketIOClient.Socket;
    constructor(props: IListaCiudadProps, state: IListaCiudadState) {
        super(props, state);
        this.state = {
            Ciudades:[]           
        };
        this.socket = io.connect(SERVER_URL);
    }

    componentWillMount() {
        
        ciudadSrv.GetCiudades().then((data: ciudad[]) => {
            this.setState((state, props) => ({
                Ciudades : data
                }));
        }).catch(err => {
            console.log(err);
        });
    }

    render() {
        let ListaCiudadesElement  = null;
        ListaCiudadesElement
         = this.state.Ciudades.map(ciudad => {
                return (
                    <div>
                        <ComponenteCiudad socket = {this.socket} Id = {ciudad.id} Nombre = {ciudad.Nombre} estadoledload = {ciudad.estadoled}></ComponenteCiudad>
                    </div>
                )
                })
        return ListaCiudadesElement;
    }
}