/**
 * @description - Filter through array of objects
 * @param {string} status
 * @param {array} searchArray
 * @returns {array} data
 */

/* istanbul ignore next */
const searchByStatus = (status, searchArray) => {
  const data = searchArray.filter((object) => {
    if (object.status === status) {
      return true;
    }
    return false;
  });
  return data;
};

export default searchByStatus;
