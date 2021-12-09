import { DateUtils } from "@groupfitnessapp/common/src/utils/DateUtils"

export interface IMetricDate {
    /* index of current month (0-11) */
    month: number; 
    day: number; 
    year: number
}

export interface IUserWeight {
    date: IMetricDate
    weight: { value: number; unit: string }
}

export class UserUtils {
    /**
     * returns an array for every day in the past x months with the user's 
     * weight on that day if it was recorded
     * @param weightData - record of each time user recorded their weight
     * @param maxHistory - number of months back to collect metric data for
     */
    public static getUserWeightMetricData(weightData: IUserWeight[], maxHistory?: number) {
        const date = DateUtils.dateInstance();
        const currentMonth = DateUtils.getMonth(date);
        const currentDay = DateUtils.getDayOfMonth(date);

        // month being iterated on -> 0-11
        let monthIndex = currentMonth.monthIndex;
        let year = DateUtils.getYear(date);

        // next metric data set in arr of metric records
        let nextMetricIndex = weightData.length - 1;
        // largest value being returned
        let maxWeight = 0;
        // smallest value being returned
        let minWeight: number = -1;

        // user weight timeline with deeper detail
        const metricTimeline: (IUserWeight | null)[] = [];

        // iterate over each month for specified history length or until all user weight records have been mapped
        for (let i = 0; (maxHistory ? i < maxHistory : true); i++) {

            const daysInMonth = DateUtils.getMonth(undefined, monthIndex).days;
            // check if this is last month being iterated on
            let isLastMonthInHistory = maxHistory && (i === (maxHistory - 1))

            // iterate over days in month
            for (let day = (i === 0 ? currentDay : daysInMonth); day > 0; day--) {
                const nextMetric = weightData[nextMetricIndex];

                if (nextMetric) {
                    const { day: mDay, month: mMonth, year: mYear } = nextMetric.date;

                    // check if next metric in array is from current date being iterated on
                    const isNextMetricFromCurrentDate = mDay === day && mMonth === monthIndex && mYear === year;

                    if (isNextMetricFromCurrentDate) {
                        metricTimeline.push(nextMetric);
                        nextMetricIndex--
                    } else {
                        metricTimeline.push(null);
                    }

                    if (nextMetric.weight.value > maxWeight) {
                        maxWeight = nextMetric.weight.value;
                    } else if (minWeight === -1) {
                        minWeight = nextMetric.weight.value;
                    } else if (nextMetric.weight.value < minWeight) {
                        minWeight = nextMetric.weight.value;
                    }
                } else {
                    metricTimeline.push(null);
                }

                // if this is the last month being iterated on and the day of month being iterated on is the current day of the current month
                if (isLastMonthInHistory && day === currentDay) {
                    // break out of loop to stop adding to array of data
                    break;
                }
            }

            monthIndex--
        }

        return { metricTimeline, maxWeight, minWeight }
    }
}
