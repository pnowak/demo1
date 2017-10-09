/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _highcharts = __webpack_require__(4);

var _highcharts2 = _interopRequireDefault(_highcharts);

var _amCharts = __webpack_require__(1);

var _amCharts2 = _interopRequireDefault(_amCharts);

var _chartJs = __webpack_require__(2);

var _chartJs2 = _interopRequireDefault(_chartJs);

var _fusionCharts = __webpack_require__(3);

var _fusionCharts2 = _interopRequireDefault(_fusionCharts);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chartWrappers = [];
var selectedClass = 'selected';
var controls = document.getElementById('controls');
var mapChartsToWrapper = new Map();

mapChartsToWrapper.set('Highcharts', _highcharts2.default);
mapChartsToWrapper.set('amCharts', _amCharts2.default);
mapChartsToWrapper.set('Chart.js', _chartJs2.default);
mapChartsToWrapper.set('FusionCharts', _fusionCharts2.default);

function onAfterInit() {
  var _this = this;

  var isListItem = document.getElementsByTagName('li');
  var allListItems = Array.from(isListItem);

  allListItems.forEach(function (li) {
    if (Handsontable.dom.hasClass(li, selectedClass)) {
      var chartName = li.children[0].textContent;
      var ActiveChartWrapper = mapChartsToWrapper.get(chartName);

      chartWrappers.push(new ActiveChartWrapper('chart', _this));
    }
  });
}

function onBeforeChange(changes) {
  var _this2 = this;

  changes.forEach(function (change) {
    chartWrappers.forEach(function (chartWrapper) {
      var _change = _slicedToArray(change, 2),
          row = _change[0],
          column = _change[1];

      var currentValue = change[3] === '' ? 0 : change[3];

      if (change[3] === '') {
        _this2.setDataAtCell(row, column, 0, 'onBeforeChange');
      }

      chartWrapper.updateChartData(row, column, currentValue, _this2);
    });
  });
}

function onAfterCreateColumn(index) {
  var _this3 = this;

  chartWrappers.forEach(function (chartWrapper) {
    chartWrapper.addNewTeam(_this3, index);
  });
}

function onAfterCreateRow(index) {
  var _this4 = this;

  chartWrappers.forEach(function (chartWrapper) {
    chartWrapper.addNewGame(_this4, index);
  });
}

function onAfterRemoveColumn(index) {
  var _this5 = this;

  chartWrappers.forEach(function (chartWrapper) {
    chartWrapper.removeColumn(index, _this5);
  });
}

function onAfterRemoveRow(index) {
  var _this6 = this;

  chartWrappers.forEach(function (chartWrapper) {
    chartWrapper.removeRow(index, _this6);
  });
}

var hot = new Handsontable(document.getElementById('root'), {
  data: [[120, 160, 80], [130, 115, 95], [150, 120, 60]],
  colHeaders: function colHeaders(index) {
    return 'Team ' + (index + 1);
  },
  rowHeaders: function rowHeaders(index) {
    return 'Game ' + (index + 1);
  },

  contextMenu: ['remove_row', 'remove_col'],
  rowHeaderWidth: 100,
  className: 'htCenter',
  type: 'numeric',
  width: 650,
  maxRows: 5,
  maxCols: 5,
  stretchH: 'all',
  allowInvalid: false,
  afterInit: onAfterInit,
  beforeChange: onBeforeChange,
  afterCreateCol: onAfterCreateColumn,
  afterCreateRow: onAfterCreateRow,
  afterRemoveCol: onAfterRemoveColumn,
  afterRemoveRow: onAfterRemoveRow
});

controls.addEventListener('click', function (event) {
  var isButton = event.target.nodeName.toLowerCase() === 'button';

  if (isButton) {
    var buttonValue = event.target.value;

    if (buttonValue === 'addNewGame') {
      var nextRow = hot.countRows() + 1;

      if (nextRow <= hot.getSettings().maxRows) {
        hot.alter('insert_row', nextRow);
      }
    }

    if (buttonValue === 'addNewTeam') {
      var nextColumn = hot.countCols() + 1;

      if (nextColumn <= hot.getSettings().maxCols) {
        hot.alter('insert_col', nextColumn);
      }
    }
  }
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* A amChart data visualisation.
*
* Create amChart instance linked with data from Handsontable.
*
* @class AmChartsWrapper.
*/
var AmChartsWrapper = function () {
  /**
  * Create a AmChartsWrapper.
  * @param {string} amChartsRootId - element id.
  * @param {object} hotInstance - a reference to the Handsontable instance.
  */
  function AmChartsWrapper(amChartsRootId, hotInstance) {
    _classCallCheck(this, AmChartsWrapper);

    this.name = 'amCharts';
    this.chart = AmCharts.makeChart(amChartsRootId, AmChartsWrapper.getChartOptions(hotInstance));
  }

  /**
  *
  * amChart options object.
  *
  * @returns {Object} amChart object configs.
  */


  _createClass(AmChartsWrapper, [{
    key: 'addNewGame',


    /**
    *
    * Create new row
    *
    * @param {Object} Handsontable object.
    * @param {Number} index index next row.
    *
    */
    value: function addNewGame(hotInstance, index) {
      var objectGraph = {
        fillAlphas: 0.8,
        lineAlpha: 0.2,
        type: 'column',
        balloonText: hotInstance.getSettings().rowHeaders(index) + ': [[' + hotInstance.getSettings().rowHeaders(index) + ']]',
        valueField: '' + hotInstance.getSettings().rowHeaders(index)
      };

      this.chart.graphs.push(objectGraph);

      for (var indexColumn = 0; indexColumn < hotInstance.countCols(); indexColumn += 1) {
        this.chart.dataProvider[indexColumn][hotInstance.getSettings().rowHeaders(index)] = 0;
      }

      this.chart.validateNow(true);
    }

    /**
    *
    * Create new column
    *
    * @param {Object} Handsontable object.
    * @param {Number} index index next column.
    *
    */

  }, {
    key: 'addNewTeam',
    value: function addNewTeam(hotInstance, index) {
      var objectTeam = {
        team: 'Team ' + (index + 1)
      };

      for (var indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
        objectTeam[hotInstance.getSettings().rowHeaders(indexRow)] = 0;
      }

      this.chart.dataProvider.push(objectTeam);

      this.chart.validateNow(true);
    }

    /**
    *
    * Remove row
    *
    * @param {Number} index index remove row.
    * @param {Object} Handsontable object.
    *
    */

  }, {
    key: 'removeRow',
    value: function removeRow(index, hotInstance) {
      this.chart.graphs.splice(index, 1);

      for (var indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
        for (var indexColumn = 0; indexColumn < hotInstance.countCols(); indexColumn += 1) {
          this.chart.dataProvider[indexColumn][hotInstance.getSettings().rowHeaders(indexRow)] = hotInstance.getDataAtCell(indexRow, indexColumn);
        }

        this.chart.graphs[indexRow].balloonText = hotInstance.getSettings().rowHeaders(indexRow) + ': [[' + hotInstance.getSettings().rowHeaders(indexRow) + ']]';
        this.chart.graphs[indexRow].valueField = '' + hotInstance.getSettings().rowHeaders(indexRow);
      }

      this.chart.validateNow(true);
    }

    /**
    *
    * Remove column
    *
    * @param {Number} index index remove column.
    * @param {Object} Handsontable object.
    *
    */

  }, {
    key: 'removeColumn',
    value: function removeColumn(index, hotInstance) {
      this.chart.dataProvider.splice(index, 1);

      for (var indexColumn = 0; indexColumn < hotInstance.countCols(); indexColumn += 1) {
        this.chart.dataProvider[indexColumn].team = hotInstance.getSettings().colHeaders(indexColumn);

        for (var indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
          this.chart.graphs[indexRow].balloonText = hotInstance.getSettings().rowHeaders(indexRow) + ': [[' + hotInstance.getSettings().rowHeaders(indexRow) + ']]';
          this.chart.graphs[indexRow].valueField = '' + hotInstance.getSettings().rowHeaders(indexRow);
        }
      }

      this.chart.validateNow(true);
    }

    /**
    *
    * Watches changes from Handsontable and updates it in the chart.
    *
    * @param {Number} column column index.
    * @param {Number} value column value.
    *
    */

  }, {
    key: 'updateChartData',
    value: function updateChartData(row, column, value, hotInstance) {
      this.chart.dataProvider[column][hotInstance.getSettings().rowHeaders(row)] = value;

      this.chart.validateNow(true);
    }
  }], [{
    key: 'getChartOptions',
    value: function getChartOptions(hotInstance) {
      return {
        type: 'serial',
        theme: 'light',
        dataProvider: AmChartsWrapper.zipTeamWithGameData(hotInstance),
        valueAxes: [{
          gridColor: '#FFFFFF',
          gridAlpha: 0.2,
          dashLength: 0
        }],
        gridAboveGraphs: true,
        startDuration: 1,
        graphs: AmChartsWrapper.updateChartGraphs(hotInstance),
        chartCursor: {
          categoryBalloonEnabled: false,
          cursorAlpha: 0,
          zoomable: false
        },
        categoryField: 'team',
        categoryAxis: {
          gridPosition: 'start',
          gridAlpha: 0,
          tickPosition: 'start',
          tickLength: 20
        },
        export: {
          enabled: true
        }
      };
    }

    /**
    * Helper function.
    *
    * Zip column header to the value of the column from Handsontable object settings.
    * amCharts data provider needs data array in form:
    *
    * @example
    * {
    *  "name": "Team 1",
    *  "game1": 144,
    *  "game2": 30,
    *  and so on
    * }
    *
    * @param {Object} Handsontable object.
    * @returns {Array} a merged key-value pair in array.
    */

  }, {
    key: 'zipTeamWithGameData',
    value: function zipTeamWithGameData(hotInstance) {
      var colsArray = [];

      var _loop = function _loop(indexColumn) {
        var obj = {};

        obj.team = hotInstance.getSettings().colHeaders(indexColumn);

        hotInstance.getDataAtCol(indexColumn).map(function (item, index) {
          obj[hotInstance.getSettings().rowHeaders(index)] = item;

          return obj;
        });

        colsArray.push(obj);
      };

      for (var indexColumn = 0; indexColumn < hotInstance.countCols(); indexColumn += 1) {
        _loop(indexColumn);
      }

      return colsArray;
    }

    /**
    * Helper function.
    *
    *
    *
    * @param {Object} Handsontable object.
    * @returns {Array} a merged key-value pair in array.
    */

  }, {
    key: 'updateChartGraphs',
    value: function updateChartGraphs(hotInstance) {
      var graphs = [];

      for (var indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
        var objectGraph = {};

        objectGraph.fillAlphas = 0.8;
        objectGraph.lineAlpha = 0.2;
        objectGraph.type = 'column';
        objectGraph.balloonText = hotInstance.getSettings().rowHeaders(indexRow) + ': [[' + hotInstance.getSettings().rowHeaders(indexRow) + ']]';
        objectGraph.valueField = '' + hotInstance.getSettings().rowHeaders(indexRow);

        graphs.push(objectGraph);
      }

      return graphs;
    }
  }]);

  return AmChartsWrapper;
}();

exports.default = AmChartsWrapper;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* A ChartJs data visualisation.
*
* Create ChartJs instance linked with data from Handsontable.
*
* @class ChartJsWrapper.
*/
var ChartJsWrapper = function () {
  /**
  * Create a ChartJsWrapper.
  * @param {string} chartJsRootId - element id.
  * @param {object} hotInstance - a reference to the Handsontable instance.
  */
  function ChartJsWrapper(chartJsRootId, hotInstance) {
    _classCallCheck(this, ChartJsWrapper);

    this.name = 'ChartJs';
    this.chart = new Chart(document.getElementById(chartJsRootId), ChartJsWrapper.getChartOptions(hotInstance));
  }

  /**
  *
  * ChartJs options object.
  *
  * @returns {Object} ChartJs object configs.
  */


  _createClass(ChartJsWrapper, [{
    key: 'addNewGame',


    /**
    *
    * Create new row
    *
    * @param {Object} Handsontable object.
    * @param {Number} index index next row.
    *
    */
    value: function addNewGame(hotInstance, index) {
      var backgroundColors = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'];
      var objectTeam = {};

      objectTeam.label = hotInstance.getSettings().rowHeaders(index);
      objectTeam.backgroundColor = backgroundColors[index];

      objectTeam.data = hotInstance.getDataAtRow(index).map(function (item) {
        var objectGame = {};

        objectGame.value = item;

        return objectGame;
      });

      this.chart.data.datasets.push(objectTeam);

      this.chart.update();
    }

    /**
    *
    * Create new column
    *
    * @param {Object} Handsontable object.
    * @param {Number} index index next column.
    *
    */

  }, {
    key: 'addNewTeam',
    value: function addNewTeam(hotInstance, index) {
      this.chart.data.labels.push(hotInstance.getSettings().colHeaders(index));

      for (var indexDataset = 0; indexDataset < this.chart.data.datasets.length; indexDataset += 1) {
        this.chart.data.datasets[indexDataset].data[index] = { value: null };
      }

      this.chart.update();
    }

    /**
    *
    * Remove row
    *
    * @param {Number} index index remove row.
    * @param {Object} Handsontable object.
    *
    */

  }, {
    key: 'removeRow',
    value: function removeRow(index, hotInstance) {
      this.chart.data.datasets.splice(index, 1);

      for (var indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
        this.chart.data.datasets[indexRow].label = hotInstance.getSettings().rowHeaders(indexRow);
      }

      this.chart.update();
    }

    /**
    *
    * Remove column
    *
    * @param {Number} index index remove column.
    * @param {Object} Handsontable object.
    *
    */

  }, {
    key: 'removeColumn',
    value: function removeColumn(index, hotInstance) {
      this.chart.data.labels.splice(index, 1);

      for (var indexcolumn = 0; indexcolumn < hotInstance.countCols(); indexcolumn += 1) {
        this.chart.data.labels[indexcolumn] = hotInstance.getSettings().colHeaders(indexcolumn);

        for (var indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
          this.chart.data.datasets[indexRow].label = hotInstance.getSettings().rowHeaders(indexRow);
          this.chart.data.datasets[indexRow].data[index] = hotInstance.getDataAtCell(indexRow, indexcolumn);
        }
      }

      this.chart.update();
    }

    /**
    *
    * Watches changes from Handsontable and updates it in the chart.
    *
    * @param {Number} column column index.
    * @param {Number} value column value.
    *
    */

  }, {
    key: 'updateChartData',
    value: function updateChartData(row, column, value) {
      this.chart.data.datasets[row].data[column] = value;
      this.chart.update();
    }
  }], [{
    key: 'getChartOptions',
    value: function getChartOptions(hotInstance) {
      return {
        type: 'bar',
        data: {
          labels: ChartJsWrapper.updateChartColumns(hotInstance),
          datasets: ChartJsWrapper.zipTeamWithRowData(hotInstance)
        },
        options: {
          legend: {
            display: false
          },
          title: {
            display: true,
            fontSize: 32,
            fontStyle: 'normal',
            text: 'Chart.js & Handsontable'
          },
          tooltips: {
            titleFontSize: 21,
            bodyFontSize: 18
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true,
                fontSize: 23
              }
            }],
            xAxes: [{
              ticks: {
                fontSize: 23
              }
            }]
          }
        }
      };
    }

    /**
    * Helper function.
    *
    * Zip column header to the value of the column from Handsontable object settings.
    * chart.js data provider needs data array in form:
    *
    * @example
    * {
    *  label: "Game 1",
    *  backgroundColor: "rgba(255, 99, 132, 0.2)",
    *  data: [144, 12, 13]
    * }
    *
    * @param {Object} Handsontable object.
    * @returns {Array} a merged key-value pair in array.
    */

  }, {
    key: 'zipTeamWithRowData',
    value: function zipTeamWithRowData(hotInstance) {
      var rowsArray = [];
      var backgroundColors = ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)', 'rgba(75, 192, 192, 0.2)', 'rgba(153, 102, 255, 0.2)'];

      for (var indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
        var objectTeam = {};

        objectTeam.label = hotInstance.getSettings().rowHeaders(indexRow);
        objectTeam.backgroundColor = backgroundColors[indexRow];
        objectTeam.data = hotInstance.getDataAtRow(indexRow);

        rowsArray.push(objectTeam);
      }

      return rowsArray;
    }

    /**
    * Helper function.
    *
    * @param {Object} Handsontable object.
    * @returns {Array} merged key-value pair
    */

  }, {
    key: 'updateChartColumns',
    value: function updateChartColumns(hotInstance) {
      var categoriesArray = [];

      for (var indexColumn = 0; indexColumn < hotInstance.countCols(); indexColumn += 1) {
        categoriesArray.push(hotInstance.getSettings().colHeaders(indexColumn));
      }

      return categoriesArray;
    }
  }]);

  return ChartJsWrapper;
}();

exports.default = ChartJsWrapper;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* A FusionCharts data visualisation.
*
* Create FusionCharts instance linked with data from Handsontable.
*
* @class FusionChartsWrapper.
*/
var FusionChartsWrapper = function () {
  /**
  * Create a FusionChartsWrapper.
  * @param {string} fusionChartsRootId - element id.
  * @param {object} hotInstance - a reference to the Handsontable instance.
  */
  function FusionChartsWrapper(fusionChartsRootId, hotInstance) {
    _classCallCheck(this, FusionChartsWrapper);

    this.name = 'fusioncharts';
    this.chart = new FusionCharts(FusionChartsWrapper.getChartOptions(fusionChartsRootId, hotInstance)).render();
  }

  /**
  *
  * FusionCharts options object.
  *
  * @returns {Object} FusionCharts object configs.
  */


  _createClass(FusionChartsWrapper, [{
    key: 'addNewGame',


    /**
    *
    * Create new row
    *
    * @param {Object} Handsontable object.
    * @param {Number} index index next row.
    *
    */
    value: function addNewGame(hotInstance, index) {
      var objectTeam = {};

      objectTeam.seriesname = hotInstance.getSettings().rowHeaders(index);
      objectTeam.data = hotInstance.getDataAtRow(index).map(function (item) {
        var objectGame = {};

        objectGame.value = item;

        return objectGame;
      });

      this.chart.args.dataSource.dataset.push(objectTeam);

      this.chart.setJSONData(this.chart.args.dataSource);
    }

    /**
    *
    * Create new column
    *
    * @param {Object} Handsontable object.
    * @param {Number} index index next column.
    *
    */

  }, {
    key: 'addNewTeam',
    value: function addNewTeam(hotInstance, index) {
      var objectTeam = {};
      objectTeam.label = hotInstance.getSettings().colHeaders(index);

      this.chart.args.dataSource.categories[0].category.push(objectTeam);

      for (var indexDataset = 0; indexDataset < this.chart.args.dataSource.dataset.length; indexDataset += 1) {
        this.chart.args.dataSource.dataset[indexDataset].data[index] = { value: null };
      }

      this.chart.setJSONData(this.chart.args.dataSource);
    }

    /**
    *
    * Remove row
    *
    * @param {Number} index index remove row.
    * @param {Object} Handsontable object.
    *
    */

  }, {
    key: 'removeRow',
    value: function removeRow(index, hotInstance) {
      this.chart.args.dataSource.dataset.splice(index, 1);

      for (var indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
        this.chart.args.dataSource.dataset[indexRow].seriesname = hotInstance.getSettings().rowHeaders(indexRow);
      }

      this.chart.setJSONData(this.chart.args.dataSource);
    }

    /**
    *
    * Remove column
    *
    * @param {Number} index index remove column.
    * @param {Object} Handsontable object.
    *
    */

  }, {
    key: 'removeColumn',
    value: function removeColumn(index, hotInstance) {
      this.chart.args.dataSource.categories[0].category.splice(index, 1);

      for (var indexColumn = 0; indexColumn < hotInstance.countCols(); indexColumn += 1) {
        this.chart.args.dataSource.categories[0].category[indexColumn].label = hotInstance.getSettings().colHeaders(indexColumn);

        for (var indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
          this.chart.args.dataSource.dataset[indexRow].seriesname = hotInstance.getSettings().rowHeaders(indexRow);
          this.chart.args.dataSource.dataset[indexRow].data[indexColumn].value = hotInstance.getDataAtCell(indexRow, indexColumn);
        }
      }

      this.chart.setJSONData(this.chart.args.dataSource);
    }

    /**
    *
    * Watches changes from Handsontable and updates it in the chart.
    *
    * @param {Number} column column index.
    * @param {Number} value column value.
    *
    */

  }, {
    key: 'updateChartData',
    value: function updateChartData(row, column, value) {
      this.chart.args.dataSource.dataset[row].data[column].value = value;

      this.chart.setJSONData(this.chart.args.dataSource);
    }
  }], [{
    key: 'getChartOptions',
    value: function getChartOptions(fusionChartsRootId, hotInstance) {
      return {
        id: 'fusionChart',
        type: 'mscolumn2d',
        renderAt: fusionChartsRootId,
        width: 650,
        height: 420,
        dataFormat: 'json',
        dataSource: {
          chart: {
            caption: 'FusionCharts & Handsontable',
            xAxisName: 'Teams',
            yAxisName: 'Values'
          },
          categories: [{ category: FusionChartsWrapper.updateChartColumns(hotInstance) }],
          dataset: FusionChartsWrapper.zipTeamWithRowData(hotInstance)
        }
      };
    }

    /**
    * Helper function.
    *
    * Zip column header to the value of the column from Handsontable object settings.
    * amCharts data provider needs data array in form:
    *
    * @example
    * {
    *  "seriesname": "Game 1",
    *  "data": [144, 12, 13]
    * }
    *
    * @param {Object} Handsontable object.
    * @returns {Array} a merged key-value pair in array.
    */

  }, {
    key: 'zipTeamWithRowData',
    value: function zipTeamWithRowData(hotInstance) {
      var rowsArray = [];

      for (var indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
        var objectGame = {};

        objectGame.seriesname = hotInstance.getSettings().rowHeaders(indexRow);
        objectGame.data = hotInstance.getDataAtRow(indexRow).map(function (item) {
          var objectResult = {};

          objectResult.value = item;

          return objectResult;
        });

        rowsArray.push(objectGame);
      }

      return rowsArray;
    }

    /**
    * Helper function.
    *
    *
    *
    * @param {Object} Handsontable object.
    * @returns {Array} a merged key-value pair in array.
    */

  }, {
    key: 'updateChartColumns',
    value: function updateChartColumns(hotInstance) {
      var category = [];

      for (var indexColumn = 0; indexColumn < hotInstance.countCols(); indexColumn += 1) {
        var objectTeam = {};

        objectTeam.label = hotInstance.getSettings().colHeaders(indexColumn);

        category.push(objectTeam);
      }

      return category;
    }
  }]);

  return FusionChartsWrapper;
}();

exports.default = FusionChartsWrapper;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
* A Highcharts data visualisation.
*
* Create Highcharts instance linked with data from Handsontable.
*
* @class HighchartsWrapper.
*/
var HighchartsWrapper = function () {
  /**
  * Create a HighChartsWrapper.
  * @param {string} highChartsRootId - element id.
  * @param {object} hotInstance - a reference to the Handsontable instance.
  */
  function HighchartsWrapper(highChartsRootId, hotInstance) {
    _classCallCheck(this, HighchartsWrapper);

    this.name = 'highcharts';
    this.chart = new Highcharts.Chart(document.getElementById(highChartsRootId), HighchartsWrapper.getChartOptions(hotInstance));
  }

  /**
  *
  * HighCharts options object.
  *
  * @returns {Object} HighCharts object configs.
  */


  _createClass(HighchartsWrapper, [{
    key: 'addNewGame',


    /**
    *
    * Create new row
    *
    * @param {Object} Handsontable object.
    * @param {Number} index index next row.
    *
    */
    value: function addNewGame(hotInstance, index) {
      var objectGame = {};

      objectGame.name = hotInstance.getSettings().rowHeaders(index);
      objectGame.data = hotInstance.getDataAtRow(index);

      this.chart.addSeries(objectGame);

      this.chart.update(HighchartsWrapper.getChartOptions(hotInstance));
    }

    /**
    *
    * Create new column
    *
    * @param {Object} Handsontable object.
    * @param {Number} index index next column.
    *
    */

  }, {
    key: 'addNewTeam',
    value: function addNewTeam(hotInstance, index) {
      this.chart.xAxis[0].categories.push(hotInstance.getSettings().colHeaders(index));

      for (var indexSeries = 0; indexSeries < this.chart.series.length; indexSeries += 1) {
        this.chart.series[indexSeries].data[index] = hotInstance.getDataAtRow(index);
      }

      this.chart.update(HighchartsWrapper.getChartOptions(hotInstance));
    }

    /**
    *
    * Remove row
    *
    * @param {Number} index index remove row.
    * @param {Object} Handsontable object.
    *
    */

  }, {
    key: 'removeRow',
    value: function removeRow(index, hotInstance) {
      this.chart.series[index].remove();

      this.chart.update(HighchartsWrapper.getChartOptions(hotInstance));
    }

    /**
    *
    * Remove column
    *
    * @param {Number} index index remove column.
    * @param {Object} Handsontable object.
    *
    */

  }, {
    key: 'removeColumn',
    value: function removeColumn(index, hotInstance) {
      this.chart.xAxis[0].categories.splice(index, 1);

      this.chart.update(HighchartsWrapper.getChartOptions(hotInstance));
    }

    /**
    *
    * Watches changes from Handsontable and updates it in the chart.
    *
    * @param {Number} row row index.
    * @param {Number} column column index.
    * @param {Number} value column value.
    *
    */

  }, {
    key: 'updateChartData',
    value: function updateChartData(row, column, value) {
      this.chart.series[row].data[column].update(value);
    }
  }], [{
    key: 'getChartOptions',
    value: function getChartOptions(hotInstance) {
      return {
        chart: {
          type: 'column',
          width: 650
        },
        title: {
          text: 'Highcharts & Handsontable'
        },
        xAxis: {
          categories: HighchartsWrapper.updateChartColumns(hotInstance)
        },
        series: HighchartsWrapper.zipTeamWithRowData(hotInstance)
      };
    }

    /**
    * Helper function.
    *
    * Zip column header to the value of the column from Handsontable object settings.
    * amCharts data provider needs data array in form:
    *
    * @example
    * {
    *  "name": "Game 1",
    *  "data": [144, 12, 13]
    * }
    *
    * @param {Object} Handsontable object.
    * @returns {Array} a merged key-value pair in array.
    */

  }, {
    key: 'zipTeamWithRowData',
    value: function zipTeamWithRowData(hotInstance) {
      var rowsArray = [];

      for (var indexRow = 0; indexRow < hotInstance.countRows(); indexRow += 1) {
        var objectGame = {};

        objectGame.name = hotInstance.getSettings().rowHeaders(indexRow);
        objectGame.data = hotInstance.getDataAtRow(indexRow);

        rowsArray.push(objectGame);
      }

      return rowsArray;
    }

    /**
    * Helper function.
    *
    *
    *
    * @param {Object} Handsontable object.
    * @returns {Array} a column headers in array.
    */

  }, {
    key: 'updateChartColumns',
    value: function updateChartColumns(hotInstance) {
      var categoriesArray = [];

      for (var indexColumn = 0; indexColumn < hotInstance.countCols(); indexColumn += 1) {
        categoriesArray.push(hotInstance.getSettings().colHeaders(indexColumn));
      }

      return categoriesArray;
    }
  }]);

  return HighchartsWrapper;
}();

exports.default = HighchartsWrapper;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(0);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map