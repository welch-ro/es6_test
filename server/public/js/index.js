/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(2);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	'use strict';

	{
		//es5的方法
		var ajax = function ajax(cb) {
			//执行
			console.log('执行');
			setTimeout(function () {
				cb();
			}, 2000);
		};
		ajax(function () {
			console.log('timeout1');
		});
	}

	{
		var _ajax = function _ajax() {
			console.log('执行2');
			return new Promise(function (resolve, reject) {
				setTimeout(function () {
					resolve();
				}, 2000);
			});
		};

		_ajax().then(function () {
			console.log('timeout2');
		});
	}

	{
		//多个回调
		var _ajax2 = function _ajax2() {
			console.log('执行3');
			return new Promise(function (resolve, reject) {
				console.log('执行3-1');
				setTimeout(function () {
					resolve();
				}, 2000);
			});
		};

		_ajax2().then(function () {
			console.log('执行3-2');
			return new Promise(function (resolve, reject) {
				console.log('执行3-2-1');
				setTimeout(function () {
					console.log('time3-2');
					resolve();
				}, 1000);
			});
		}).then(function () {
			console.log('执行3-3');
			return new Promise(function (resolve, reject) {
				console.log('执行3-3-1');
				setTimeout(function () {
					console.log('time3-3');
					resolve();
				}, 1000);
			});
		}).then(function () {
			console.log('执行3-3');
			console.log('time3-4');
		});
	}

	{
		//捕获错误
		var _ajax3 = function _ajax3(num) {
			console.log('执行4');
			return new Promise(function (resolve, reject) {
				if (num < 5) {
					resolve();
				} else {
					throw new Error('参数值不得低于5');
				}
			});
		};

		_ajax3(6).then(function () {}).catch(function (err) {
			console.log('错误了', err);
		});
	}

	{
		//图片加载完成后再显示
		var loadImg = function loadImg(src) {
			return new Promise(function (resolve, reject) {
				var img_ele = document.createElement('img');
				img_ele.src = src;
				img_ele.onload = function () {
					console.log(img_ele);
					resolve(img_ele);
				};
				img_ele.onerror = function (err) {
					reject(err);
				};
			});
		};

		var showImg = function showImg(imgs) {
			document.body.appendChild(imgs);
		};

		loadImg('http://cimg1.fenqile.com/product3/M00/0B/E5/RrQHAFsPzhGAKo5KAAGk2s0PpvM080.jpg').then(showImg);
	}

	{
		//多个图片加载完成后再显示
		var _showImg = function _showImg(imgs) {
			imgs.forEach(function (item) {
				var img_ele = document.createElement('img');
				img_ele.src = item;
				document.body.appendChild(img_ele);
			});
		};

		Promise.all(['http://cimg1.fenqile.com/product3/M00/0B/E5/RrQHAFsPzhGAKo5KAAGk2s0PpvM080.jpg', 'http://cimg1.fenqile.com/product3/M00/0B/E5/RrQHAFsPzhSABQz-AAEMmT5alLw574.jpg', 'http://cimg1.fenqile.com/product3/M00/0B/E5/RrQHAFsPzjCAGwQfAAAsb4v5IpM814.jpg']).then(_showImg);
	}

	{
		//promice race方法，多个异步，哪个先到就用哪个，慢得就不要了

		var _loadImg = function _loadImg(src) {
			return new Promise(function (resolve, reject) {
				var img_ele = document.createElement('img');
				img_ele.src = src;
				img_ele.onload = function () {
					resolve(img_ele);
				};
				img_ele.onerror = function (err) {
					reject(err);
				};
			});
		};

		var _showImg2 = function _showImg2(imgs) {
			var img_ele = document.createElement('img');
			img_ele.src = imgs;
			var p_ele = document.createElement('p');
			p_ele.appendChild(img_ele);
			document.body.appendChild(p_ele);
		};

		Promise.race(['http://cimg1.fenqile.com/product3/M00/0B/E5/RrQHAFsPzhGAKo5KAAGk2s0PpvM080.jpg', 'http://cimg1.fenqile.com/product3/M00/0B/E5/RrQHAFsPzhSABQz-AAEMmT5alLw574.jpg', 'http://cimg1.fenqile.com/product3/M00/0B/E5/RrQHAFsPzjCAGwQfAAAsb4v5IpM814.jpg']).then(_showImg2);
	}

	{
		// console.log("1");
		// setTimeout(()=>{
		//     console.log(2)
		//     Promise.resolve().then(()=>{
		//         console.log(3);
		//         process.nextTick(function foo() {
		//             console.log(4);
		//         });
		//     })
		// })
		// Promise.resolve().then(()=>{
		//     console.log(5);    
		//     setTimeout(()=>{
		//         console.log(6)
		//     })
		//     Promise.resolve().then(()=>{
		//         console.log(7);
		//     })
		// })

		// process.nextTick(function foo() {
		//     console.log(8);
		//     process.nextTick(function foo() {
		//         console.log(9);
		//     });
		// });
		// console.log("10")
	}

	{
		var test = function test(num) {
			for (var i = 0; i < num; i++) {}
			console.log('t2');
		};

		//promise建立后就会立即执行，then里的方法，只有同步的代码都结束后，才会执行

		setTimeout(function () {
			console.log('t4');
		}, 0);
		var promise = new Promise(function (resolve, reject) {
			console.log('t1');
			resolve();
		});

		promise.then(function () {
			console.log('t_resolve');
		});

		test(100000);
		console.log('t3');
	}

	{}

/***/ })
/******/ ]);