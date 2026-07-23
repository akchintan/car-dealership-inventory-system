import Car from '../../models/car.model';

describe('Car model', () => {
  it('exists and contains the required fields', () => {
    expect(Car).toBeDefined();
    expect(Car.schema.paths).toHaveProperty('brand');
    expect(Car.schema.paths).toHaveProperty('model');
    expect(Car.schema.paths).toHaveProperty('year');
    expect(Car.schema.paths).toHaveProperty('price');
    expect(Car.schema.paths).toHaveProperty('mileage');
    expect(Car.schema.paths).toHaveProperty('status');
  });
});
