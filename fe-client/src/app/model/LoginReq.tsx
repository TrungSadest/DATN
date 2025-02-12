export class LoginReq {
    username: string;
    password: string;
    remember: boolean;
    constructor(username: string, password: string, remember: boolean) {
        this.username = username;
        this.password = password;
        this.remember = remember;
    };

    static fromJSON(loginReqObject: any): LoginReq | null {
        let loginReq: LoginReq | null = null;
        if (loginReqObject) {
            loginReq = new LoginReq("", "", false);
            loginReq.username = loginReqObject.username ? loginReqObject.username : "";
            loginReq.password = loginReqObject.password ? loginReqObject.password : "";
            loginReq.remember = loginReqObject.remember ? loginReqObject.remember : false;
        }
        return loginReq;
    }
}