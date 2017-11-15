export class Material {
    constructor(
        public ClientId: number,
        public FeatureGuid: string,
        public InstallYear: number,
        public MaterialCode: string,
        public MaterialDescription: string,
        public MaterialType: string,
        public MaterialTypeDescription: string,
        public Quantity: number,
        public SagFactor: number,
        public Span: number,
        public SpanAdder: number,
        public WorkOrderId: number
    ) { }
}