import {ciudad} from '../entities/ciudad'
export class ciudadSrv {

    public static GetCiudades(): Promise<ciudad[]> {
        let url: string = 'https://controlamaquetatrenes.biz/estadoled';
        return fetch(url,
            {
                method: 'GET',
                headers: new Headers({
                    "Cache-Control": "no-cache",
                    "Accept": "application/json",
                    "content-type": "application/json"
                })
            })
            .then(res => {
                if (!res.ok) {
                    throw Error(`${res.status}: ${res.statusText}`);
                }
                return res.json();
            })
            .then((data: ciudad[]) => {
                return data;
            });
    }

}