import {makeAutoObservable} from 'mobx'
//import { IUser } from "./IUser";
import axios from 'axios';

import {login, registration, logout} from '../http/userAPI'

export default class UserStore{
    constructor(){
        this._isAuth = false
        this._user = {}

        makeAutoObservable(this)
    }

    // setIsAuth(bool){
    //     this._isAuth = bool
    // }
    // setUser(user){
    //     this._user = user
    // }
    // get isAuth(){
    //     return this._isAuth
    // }
    // get user(){
    //     return this._user
    // }
    setIsAuth(bool) {
        this._isAuth = bool;
    }
    setUser(user) {
        this._user = user;
    }
    

    async login(email, password){
        try {
            const response = await login(email, password);
            console.log(response.data.user.isActivated)
            // localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async registration(email, password){
        try {
            const response = await registration(email, password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true)
            this.setUser(response.data.user)
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async logout(){
        try {
            const response = await logout();
            console.log(response);
            localStorage.removeItem('token');
            this.setIsAuth(false)
            this.setUser({});
        } catch (e) {
            console.log(e.response?.data?.message)
        }
    }

    async checkAuth() {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/refresh`, { withCredentials: true });
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setIsAuth(true);
            this.setUser(response.data.user);
        }
        catch (e) {
            console.log(e.response?.data?.message);
        }
    }

}