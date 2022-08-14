import {QuotationRequestRepository} from "../../domain/gateways/quotationRequestRepository";
import {QuotationRequest} from "../../domain/models/quotationRequest";

class InmemoryQuotationRequestRepository implements QuotationRequestRepository {
    quotationRequests: QuotationRequest[] = []

    save(quotationId: QuotationRequest) {
        this.quotationRequests.push(quotationId)
    }

    all() {
        return this.quotationRequests
    }
}

export {InmemoryQuotationRequestRepository}