import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);

describe('Mock Tests', () => {
  it('should test the jest setup', () => {
    const res = 15 + 2;
    expect(res).to.equal(17);
  });
});
