import { RoleModel } from "./RoleModel";

export class SignUpReq {
    fullName: string;
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
    phone: string;
    referrerUid: string;
    status: string | null;
    constructor(fullName: string, email: string, username: string, password: string, confirmPassword: string, phone: string, referrerUid: string, status: string | null) {
        this.fullName = fullName;
        this.email = email;
        this.username = username;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.phone = phone;
        this.status = status;
        this.referrerUid = referrerUid;
    };

    static fromJSON(signUpReqObject: any): SignUpReq | null {
        let signUpReq: SignUpReq | null = null;
        if (signUpReqObject) {
            signUpReq = new SignUpReq("", "", "", "", "", "", "", null);
            signUpReq.fullName = signUpReqObject.fullName ? signUpReqObject.fullName : "";
            signUpReq.email = signUpReqObject.email ? signUpReqObject.email : "";
            signUpReq.username = signUpReqObject.username ? signUpReqObject.username : "";
            signUpReq.password = signUpReqObject.password ? signUpReqObject.password : "";
            signUpReq.confirmPassword = signUpReqObject.confirmPassword ? signUpReqObject.confirmPassword : "";
            signUpReq.phone = signUpReqObject.phone ? signUpReqObject.phone : "";
            signUpReq.referrerUid = signUpReqObject.referrerUid ? signUpReqObject.referrerUid : "";
        }
        return signUpReq;
    }
}