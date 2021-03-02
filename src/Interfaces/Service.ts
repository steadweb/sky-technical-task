interface Service {
  name: String,
  fn: BuildableService
};

interface BuildableService {
  new(): any;
};

export { BuildableService, Service };
