const demonetization = (value = '') => {
  const sanitizedMoney = String(value).replace(/\D/g, '');
  return parseInt(sanitizedMoney || 0, 10);
};

module.exports = {
  demonetization,
};
