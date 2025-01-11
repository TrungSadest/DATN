package com.be.constant;

public class Constants {
    public static final String[] WHITE_LIST = { "/api/public/**", "/api/comm/**", "/api/auth/**", "/api/**", "/auth/**", "/api/files/**" };
//    public static final String[] WHITE_ROLE_R000 = { "/api/category/**" };
    public static final String[] WHITE_ROLE_R001 = { "/api/category/**" };

//    public static final String ROLE_R000 = "R000";
    public static final String ROLE_R001 = "R001";
    public static final String ROLE_R002 = "R002";
    public static final String ROLE_R003 = "R003";

    public static final String BAD_CREDENTIALS = "BAD_CREDENTIALS";
    public static final String USERNAME_IS_EXIST = "USERNAME_IS_EXIST";
    public static final String EMAIL_IS_EXIST = "EMAIL_IS_EXIST";
    public static final String REGISTER_FAILED = "REGISTER_FAILED";
    public static final String CATEGORY_IS_EXIST = "CATEGORY_IS_EXIST";

    public static final String LOGIN_SUCCESS = "LOGIN_SUCCESS";
    public static final String REGISTER_SUCCESS = "REGISTER_SUCCESS";
}
