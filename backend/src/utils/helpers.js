const generatePagination = (page, limit) => {
  const p = Math.max(1, parseInt(page) || 1);
  const l = Math.min(100, Math.max(1, parseInt(limit) || 20));
  const skip = (p - 1) * l;
  return { page: p, limit: l, skip };
};

const formatResponse = (success, statusCode, message, data, pagination) => {
  const response = {
    success,
    statusCode,
    message,
  };

  if (data) response.data = data;
  if (pagination) response.pagination = pagination;

  return response;
};

const getSearchQuery = (searchTerm) => {
  if (!searchTerm) return {};
  return { $text: { $search: searchTerm } };
};

module.exports = {
  generatePagination,
  formatResponse,
  getSearchQuery,
};
