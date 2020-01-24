import { TouristModule } from './tourist.module';

describe('TouristModule', () => {
  let touristModule: TouristModule;

  beforeEach(() => {
    touristModule = new TouristModule();
  });

  it('should create an instance', () => {
    expect(touristModule).toBeTruthy();
  });
});
