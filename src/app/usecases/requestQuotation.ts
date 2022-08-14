import {QuotationRequestRepository} from "../../domain/gateways/quotationRequestRepository";
import {QuotationRequest} from "../../domain/models/quotationRequest";
import {DateProvider} from "../../domain/gateways/dateProvider";


class RequestQuotation {
    quotationRequestRepository: QuotationRequestRepository
    dateProvider: DateProvider

    constructor(quotationRequestRepository: QuotationRequestRepository,
                dateProvider: DateProvider) {
        this.quotationRequestRepository = quotationRequestRepository
        this.dateProvider = dateProvider
    }


    execute(quotationRequestId: string, elevatorAvailable: boolean, relocationDate: Date) {
        if (relocationDate < this.dateProvider.getCurrentDate()) {
            return
        }

        const quotationRequest = new QuotationRequest(quotationRequestId, elevatorAvailable, relocationDate)
        this.quotationRequestRepository.save(quotationRequest)
    }
}

export {RequestQuotation}