import {QuotationRequest} from "../models/quotationRequest";

interface QuotationRequestRepository {
    save(quotationRequestId: QuotationRequest): void
}

export {QuotationRequestRepository}