const replaceText = (text, prop = {}) => {
  return text ? text.replace(/\{\{(.[^}]+)\}\}/g, (_, match) => prop[match] || [match])  : '';
};

module.exports = replaceText;
