import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import {User} from "./user.model";
import 'rxjs/Rx';
import { Observable } from "rxjs";

@Injectable()
export class UserService {
    private userSService: User[] = [];

    constructor(private http: Http) { }

    addUser(user: User){
        this.userSService.push(user);
        console.log(this.userSService);

        const bodyReq = JSON.stringify(user);
        const myHeaders = new Headers({'Content-Type': 'application/json'});
        return this.http.post('http://localhost:3000/user', bodyReq, {headers: myHeaders})
        .map((responseRecebida: Response) => responseRecebida.json())
        .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }

    getUser(user: User){
        return this.http.get(`http://localhost:3000/user/${user.email}/${user.password}`)
        .map((responseRecebida: Response) => {
            const responseEmJson = responseRecebida.json();
            const UserSResponseRecebida = responseEmJson.objSUserSRecuperadoS;
            const user = new User(UserSResponseRecebida.email, UserSResponseRecebida.password, UserSResponseRecebida._id, UserSResponseRecebida.firstName, UserSResponseRecebida.lastName)
            return user;
        })
        .catch((errorRecebido: Response) => Observable.throw(errorRecebido.json()));
    }
}