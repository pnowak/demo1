/**
* Helper function.
*
* Zip column header to the value of the column from Handsontable object settings.
* amCharts/FusionCharts data provider needs data array in form:
*
* @example
* {
*  "key": "May",
*  "value": 144
* }
*
* @param {String} columnHeaders column headers from Handsontable object settings.
* @param {Number} columnValues column values from Handsontable object settings.
* @returns {Array} a merged key-value pair in array.
*/
function zipHeadersWithValues(columnHeaders, columnValues, key) {
  return columnHeaders.map((item, index) => {
    const obj = {};

    obj[key] = item;
    obj.value = columnValues[index];

    return obj;
  });
}

export default zipHeadersWithValues;
