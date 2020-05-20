const {
  errorsParse,
  errorParse,
} = require('../../../../src/helpers/api/response');

describe('Helpers Api Response', () => {
  it('should be defined', () => {
    expect(errorParse).toBeDefined();
    expect(errorsParse).toBeDefined();
  });

  it('should be array of errors', () => {
    expect(errorsParse([{
      msg: 'Invalid value',
      param: 'username',
      location: 'body',
    }])).toEqual({
      errors: [{
        message: 'Invalid value',
        param: 'username',
        in: 'body',
      }],
    });
  });

  it('should be a object error', () => {
    expect(errorParse({
      msg: 'Invalid value',
      param: 'username',
      location: 'body',
    })).toEqual({
      message: 'Invalid value',
      param: 'username',
      in: 'body',
    });
  });

  it('should be empty array', () => {
    expect(errorsParse()).toEqual({
      errors: [],
    });
  });

  it('should be null', () => {
    expect(errorParse()).toEqual({});
  });
});
