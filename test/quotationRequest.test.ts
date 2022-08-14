import {InmemoryQuotationRequestRepository} from "../src/infra/adapters/inmemoryQuotationRequestRepository";
import {RequestQuotation} from "../src/app/usecases/requestQuotation";
import {QuotationRequest} from "../src/domain/models/quotationRequest";
import {DeterministicDateProvider} from "../src/infra/adapters/deterministicDateProvider";



describe("quotation request", () => {
    let quotationRequestRepository: InmemoryQuotationRequestRepository

    beforeEach(() => {
         quotationRequestRepository = new InmemoryQuotationRequestRepository()
    })

    describe("relocation happening in future dates", () => {
        it("should accept quotation request with no elevator available", () => {
            const dateProvider: DeterministicDateProvider = new DeterministicDateProvider(new Date(2022, 7, 14))
            const requestQuotation: RequestQuotation = new RequestQuotation(quotationRequestRepository, dateProvider)
            requestQuotation.execute("quotation-request-id", false, new Date(2022, 7, 16))
            expect(quotationRequestRepository.all()).toStrictEqual([new QuotationRequest("quotation-request-id", false, new Date(2022, 7, 16))])
        })

        it("should accept quotation request with elevator available", () => {
            const dateProvider: DeterministicDateProvider = new DeterministicDateProvider(new Date(2022, 6, 30))
            const requestQuotation: RequestQuotation = new RequestQuotation(quotationRequestRepository, dateProvider)
            requestQuotation.execute("quotation-request-id", true, new Date(2022, 7, 1))
            expect(quotationRequestRepository.all()).toStrictEqual([new QuotationRequest("quotation-request-id", true, new Date(2022, 7, 1))])
        })
    })

    describe("relocation happening in the past", () => {
        it("should reject quotation request when relocation date is in the past", () => {
            const dateProvider: DeterministicDateProvider = new DeterministicDateProvider(new Date(2022, 7, 14))
            const requestQuotation: RequestQuotation = new RequestQuotation(quotationRequestRepository, dateProvider)
            requestQuotation.execute("quotation-request-id", true, new Date(2021, 7, 16))
            expect(quotationRequestRepository.all()).toStrictEqual([])
        })
    })

})