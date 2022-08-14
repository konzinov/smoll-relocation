class QuotationRequest {
    id: string
    elevatorAvailable: boolean
    relocationDate: Date

    constructor(id: string, elevatorAvailable: boolean, relocationDate: Date) {
        this.id = id
        this.elevatorAvailable = elevatorAvailable
        this.relocationDate = relocationDate
    }
}

export {QuotationRequest}