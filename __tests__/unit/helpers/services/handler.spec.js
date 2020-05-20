const handler = require('../../../../src/helpers/services/handler');

let mockRequest = {}

const mockResponse = {
  send: function(r) {
    return r
  },
  json: function(r) {
    return r
  },
  status: function() {
    return this;
  }
};

describe('Helpers Services Handler', () => {
  it('should be defined', () => {
    expect(handler).toBeDefined();
    expect(handler.handlerService).toBeDefined();
  });

  it('should have been successfuly without errors', async () => {
    const fn = jest.fn();

    await handler.handlerService(mockRequest, mockResponse, fn);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('have throw error with invalid request', async () => {
    const fn = jest.fn();

    await handler.handlerService(null, mockResponse, fn);
    expect(fn).toHaveBeenCalledTimes(0);
  });
});
