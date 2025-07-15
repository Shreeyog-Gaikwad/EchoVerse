import config from "../config/config";
import { Client, Account, ID } from "appwrite";

export class  Authentication {
    client = new Client();
    account;

    constructor(){
        this.client.setProject(config.projectId)
        this.account = new Account(this.client);
    }

    async createAccount({email, password, name}) {
        try {
            const user = await this.account.create(ID.unique(), email, password, name);

            if(user){
                return this.login(email, password)
            }else{
                return user;
            }
        } catch (error) {
            console.log("Create Account Error : ", error);
            
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            console.log("Login Account Error : ", error);
        }
    }

    async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log("Logout Account Error : ", error);
        }
    }

    async getUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Get User Account Error : ", error);
        }

        return null;
    }

}

const auth = new Authentication();

export default auth;