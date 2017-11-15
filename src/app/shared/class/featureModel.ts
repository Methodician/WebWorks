export class Feature {
    constructor(
        public AssociatedFeatureName: string,
        public Block: string,
        public Circuit: string,
        public ClassConnectable: string, // Should really be boolean?
        public ClientId: number,
        public FeatureClass: string,
        public FeatureGuid: string,
        public FeatureName: string,
        public FeatureTypeCode: string,
        public FeatureTypeName: string,
        public Geometry: {
            WellKnownText: string
        },
        public MapSpan: number,
        public Phase: string
    ) { }
}