const errorParse = error => error ? ({
  message: error.msg,
  param: error.param,
  in: error.location,
}) : {};

const errorsParse = (errors = []) => {
  return {
    errors: errors.map((error) => errorParse(error)),
  };
};

module.exports = {
  errorsParse,
  errorParse,
};
