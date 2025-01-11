// export class ValidationUtil {

//     public static isEmail(email?: string) {
//         if (email === null || email === undefined) return false
//         const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
//         return regexp.test(email)
//     }

//     public static isPhone(phone?: string, length?: number) {
//         if (phone === null || phone === undefined) return false
//         return length === undefined ? new RegExp(/^[0-9]+$/).test(phone) : new RegExp(/^[0-9]+$/).test(phone) && phone.length === length
//     }

// }

export class ValidationUtil {
    private static readonly emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    private static readonly phoneRegexp = /^[0-9]{10,12}$/;
    private static readonly fullNameRegexp = /^[a-zA-ZÀ-ỹà-ỹ]+(?:\s[a-zA-ZÀ-ỹà-ỹ]+)*$/;

    public static isEmail(email?: string): boolean {
        if (!email) return false; // Gộp kiểm tra null và undefined
        return this.emailRegexp.test(email);
    }

    public static isPhone(phone?: string, length?: number): boolean {
        if (!phone) return false; // Gộp kiểm tra null và undefined
        const isValidPhone = this.phoneRegexp.test(phone);
        return length === undefined ? isValidPhone : isValidPhone && phone.length === length;
    }

    public static isFullName(fullName?: string): boolean {
        if (!fullName) return false; // Gộp kiểm tra null và undefined
        return this.fullNameRegexp.test(fullName.trim());
    }
}

