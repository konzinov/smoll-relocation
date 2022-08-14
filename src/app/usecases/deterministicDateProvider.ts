import {DateProvider} from "../../domain/gateways/dateProvider";

class DeterministicDateProvider implements DateProvider {
    currentDate: Date

    constructor(currentDate: Date) {
        this.currentDate = currentDate
    }


    getCurrentDate(): Date {
        return this.currentDate
    }
}

export {DeterministicDateProvider}