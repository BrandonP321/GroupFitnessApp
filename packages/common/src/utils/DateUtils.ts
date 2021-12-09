interface IMonth {
    short: string;
    long: string;
    days: number;
}

const months: IMonth[] = [
    { short: "Jan", long: "January", days: 31 },
    { short: "Feb", long: "February", days: 29 },
    { short: "Mar", long: "March", days: 31 },
    { short: "Apr", long: "April", days: 30 },
    { short: "May", long: "May", days: 31 },
    { short: "June", long: "June", days: 30 },
    { short: "July", long: "July", days: 31 },
    { short: "Aug", long: "August", days: 31 },
    { short: "Sept", long: "September", days: 30 },
    { short: "Oct", long: "October", days: 31 },
    { short: "Nov", long: "November", days: 30 },
    { short: "Dec", long: "December", days: 31 },
]

interface IDay {
    short: string;
    long: string;
}

const days: IDay[] = [
    { short: "Mon", long: "Monday" },
    { short: "Tue", long: "Tuesday" },
    { short: "Wed", long: "Wednesday" },
    { short: "Thur", long: "Thursday" },
    { short: "Fri", long: "Friday" },
    { short: "Sat", long: "Saturday" },
    { short: "Sun", long: "Sunday" },
]

export class DateUtils {
    public static days: IDay[] = days;
    public static months: IMonth[] = months;

    public static getToday() {
        const date = new Date();

        return {
            month: this.getMonth(date),
            dayOfMonth: this.getDayOfMonth(date),
            dayOfWeek: this.getDayOfWeek(date),
            year: this.getYear(date)
        }
    }

    /* returns object for specified month if provided or current month */
    public static getMonth(date?: Date, monthNumb?: number) {
        let month: IMonth;
        let monthIndex: number;

        if (monthNumb !== undefined) {
            monthIndex = monthNumb
            month = months[monthNumb];
        } else {
            const now = this.dateInstance(date);

            monthIndex = now.getMonth();
            month = months[monthIndex];
        }

        return {...month, monthIndex};
    }

    public static getDayOfMonth(date?: Date) {
        let now = this.dateInstance(date);

        return now.getDate();
    }

    /* returns data on current day of the week */
    public static getDayOfWeek(date?: Date) {
        let now = this.dateInstance(date);

        const day = now.getDay();

        return {
            numb: day,
            day: days[day - 1]
        }
    }

    /* returns current year in format YYYY */
    public static getYear(date?: Date) {
        let now = this.dateInstance(date);

        return now.getFullYear();
    }

    public static dateInstance(date?: Date) {
        return (date ?? new Date());
    }
}