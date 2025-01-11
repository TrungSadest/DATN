export class AuthConstant {
    public static readonly TOKEN_TYPE_KEY = "Bearer ";
    public static readonly ACCESS_TOKEN = "access_token";
    public static readonly REMEMBER_LOGIN = "remember";
    public static readonly EXPIRES_REMEMBER = 365; //day
    public static readonly EXPIRES_TOKEN = 1;
    public static readonly _TOKEN = "accessToken";
    public static readonly PUBLIC_KEY = "publicKey";

    public static readonly USERNAME_EXISTS = 'USERNAME_EXISTS';
    public static readonly EMAIL_EXISTS = 'EMAIL_EXISTS';
    public static readonly PHONE_EXISTS = 'PHONE_EXISTS';

    public static readonly USER_WRONG_LOGIN = "00-00";
    public static readonly USER_NOT_ACTIVE = "00-01";

    public static readonly LOCKED = "02-01";
    public static readonly DISABLED = "02-02";
    public static readonly ACTIVED = "02-03";
    public static readonly NOT_ACTIVED = "02-04";

    public static readonly ROLE_ADMIN = "R000";
    public static readonly ROLE_SELLER = "R001";
}