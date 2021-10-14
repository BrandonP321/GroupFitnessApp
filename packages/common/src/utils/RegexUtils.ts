export class RegexUtils {
    public static GetEmailRegex() {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    }    
}