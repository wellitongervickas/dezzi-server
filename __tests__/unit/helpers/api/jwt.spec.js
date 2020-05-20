const jwt = require('../../../../src/helpers/api/jwt');

process.env = {
  SERVER_TOKEN_SECRET: '1234',
  SERVER_TOKEN_EXPIRES: '86400000',
};

describe('Helpers Api Jwt', () => {
  it('should be defined', () => {
    expect(jwt).toBeDefined();
    expect(jwt.decode).toBeDefined();
    expect(jwt.extractor).toBeDefined();
    expect(jwt.generator).toBeDefined();
  });

  it('should generate a valid token', () => {
    expect(jwt.generator({ myToken: true })).not.toBeNull();
    expect(jwt.generator()).not.toBeNull();
  });

  it('should decode a valid token', () => {
    const token = jwt.generator({ myToken: true });

    expect(jwt.decode(token)).toMatchObject({
      myToken: true,
    });
  });

  it('should return null when dont receive token', () => {
    expect(jwt.decode()).toBeNull();
  });

  it('should return a slice of header authorization token', () => {
    const token = jwt.generator({ myToken: true });
    const authHeader = `Bearer ${token}`;

    expect(jwt.extractor(authHeader)).toBe(token);
  });

  it('should return null when invalid header authorization', () => {
    const token = jwt.generator({ myToken: true });

    expect(jwt.extractor(token)).toBeNull();
  });
});
