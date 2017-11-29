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
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

  var socket = io();

// Finds the element that has a data-todo-id="todo._id" property
function findElement(todo) {
  return $('#todos').find('[data-todo-id="' + todo._id + '"]')
}

// Returns the data-todo-id property for the parent li element
function getId(element) {
  console.log(element);
  return $(element).parents('li').data('todo-id');
}

// A general callback for service methods that just alerts
// the error if one happened
function errorHandler(error) {
  if(error) {
    alert('There was an error: ' + error.message);
  }
}

  $('#todos').on('submit', 'form.create-todo', function(ev) {
    // Find the todo text form field
    var field = $(this).find('[name="description"]');
    // Call todos.create(data, {}, callback)
    socket.emit('todos::create', {
      text: field.val(),
      complete: false
    }, {}, errorHandler);
    // Reset the value
    field.val('');
    // Prevent actual form submission
    ev.preventDefault();
  }).on('click', '.delete', function(ev) {
    var id = getId(this);
    // Call todos.remove(id, {}, callback)
    socket.emit('todos::remove', id, {}, errorHandler);
    ev.preventDefault();
  }).on('click', '[name="complete"]', function() {
    var id = getId(this);
    // Complete status is the checkbox status
    var complete = $(this).is(':checked');
    // patch will merge existing data (udpate replaces everything)
    // Call todos.patch(id, { complete: status }, {}, callback)
    socket.emit('todos::patch', id, {
      complete: complete
    }, {}, errorHandler);
  });

  socket.on('todos created', function(todo) {
    // Create the HTML for the new list element. This can be done nicer
    // eventually by using a view engine like EJS in the browser and sharing
    // the template from index.ejs
    var html = '<li class="page-header checkbox" data-id="' + todo._id + '">' +
          '<label><input type="checkbox" name="done">' +
          todo.text +
          '</label><a href="javascript://" class="pull-right delete">' +
          '<span class="glyphicon glyphicon-remove"></span>' +
          '</a></li>';

    // Add it to the todo list
    $('.todos').append(html);
  });

  // Listen to a patched todo
  socket.on('todos patched', function(todo) {
    var element = findElement(todo);
    // Find the checkbox element
    var checkbox = element.find('[name="complete"]');
    // Set the checked property to the todo complete status
    checkbox.prop('checked', todo.complete);
  });

  socket.on('todos removed', function(todo) {
    // Find the element and remove it
    findElement(todo).remove();
  });

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgNmU4ZDg1ZDI1MjUzNjEzY2EzNmEiLCJ3ZWJwYWNrOi8vLy4vYXNzZXQvanMvbWFpbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNoRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBc0QsK0RBQStEOztBQUVySDtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7QUM3REE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUM7QUFDakM7QUFDQTtBQUNBO0FBQ0EsS0FBSyxJQUFJO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQSwrQkFBK0I7QUFDL0IsdUNBQXVDO0FBQ3ZDO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLG1CQUFtQixJQUFJO0FBQ3BEO0FBQ0E7QUFDQSxLQUFLLElBQUk7QUFDVCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxHQUFHLEUiLCJmaWxlIjoibWFpbi5idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCA2ZThkODVkMjUyNTM2MTNjYTM2YSIsIiAgdmFyIHNvY2tldCA9IGlvKCk7XHJcblxyXG4vLyBGaW5kcyB0aGUgZWxlbWVudCB0aGF0IGhhcyBhIGRhdGEtdG9kby1pZD1cInRvZG8uX2lkXCIgcHJvcGVydHlcclxuZnVuY3Rpb24gZmluZEVsZW1lbnQodG9kbykge1xyXG4gIHJldHVybiAkKCcjdG9kb3MnKS5maW5kKCdbZGF0YS10b2RvLWlkPVwiJyArIHRvZG8uX2lkICsgJ1wiXScpXHJcbn1cclxuXHJcbi8vIFJldHVybnMgdGhlIGRhdGEtdG9kby1pZCBwcm9wZXJ0eSBmb3IgdGhlIHBhcmVudCBsaSBlbGVtZW50XHJcbmZ1bmN0aW9uIGdldElkKGVsZW1lbnQpIHtcclxuICBjb25zb2xlLmxvZyhlbGVtZW50KTtcclxuICByZXR1cm4gJChlbGVtZW50KS5wYXJlbnRzKCdsaScpLmRhdGEoJ3RvZG8taWQnKTtcclxufVxyXG5cclxuLy8gQSBnZW5lcmFsIGNhbGxiYWNrIGZvciBzZXJ2aWNlIG1ldGhvZHMgdGhhdCBqdXN0IGFsZXJ0c1xyXG4vLyB0aGUgZXJyb3IgaWYgb25lIGhhcHBlbmVkXHJcbmZ1bmN0aW9uIGVycm9ySGFuZGxlcihlcnJvcikge1xyXG4gIGlmKGVycm9yKSB7XHJcbiAgICBhbGVydCgnVGhlcmUgd2FzIGFuIGVycm9yOiAnICsgZXJyb3IubWVzc2FnZSk7XHJcbiAgfVxyXG59XHJcblxyXG4gICQoJyN0b2RvcycpLm9uKCdzdWJtaXQnLCAnZm9ybS5jcmVhdGUtdG9kbycsIGZ1bmN0aW9uKGV2KSB7XHJcbiAgICAvLyBGaW5kIHRoZSB0b2RvIHRleHQgZm9ybSBmaWVsZFxyXG4gICAgdmFyIGZpZWxkID0gJCh0aGlzKS5maW5kKCdbbmFtZT1cImRlc2NyaXB0aW9uXCJdJyk7XHJcbiAgICAvLyBDYWxsIHRvZG9zLmNyZWF0ZShkYXRhLCB7fSwgY2FsbGJhY2spXHJcbiAgICBzb2NrZXQuZW1pdCgndG9kb3M6OmNyZWF0ZScsIHtcclxuICAgICAgdGV4dDogZmllbGQudmFsKCksXHJcbiAgICAgIGNvbXBsZXRlOiBmYWxzZVxyXG4gICAgfSwge30sIGVycm9ySGFuZGxlcik7XHJcbiAgICAvLyBSZXNldCB0aGUgdmFsdWVcclxuICAgIGZpZWxkLnZhbCgnJyk7XHJcbiAgICAvLyBQcmV2ZW50IGFjdHVhbCBmb3JtIHN1Ym1pc3Npb25cclxuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgfSkub24oJ2NsaWNrJywgJy5kZWxldGUnLCBmdW5jdGlvbihldikge1xyXG4gICAgdmFyIGlkID0gZ2V0SWQodGhpcyk7XHJcbiAgICAvLyBDYWxsIHRvZG9zLnJlbW92ZShpZCwge30sIGNhbGxiYWNrKVxyXG4gICAgc29ja2V0LmVtaXQoJ3RvZG9zOjpyZW1vdmUnLCBpZCwge30sIGVycm9ySGFuZGxlcik7XHJcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gIH0pLm9uKCdjbGljaycsICdbbmFtZT1cImNvbXBsZXRlXCJdJywgZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgaWQgPSBnZXRJZCh0aGlzKTtcclxuICAgIC8vIENvbXBsZXRlIHN0YXR1cyBpcyB0aGUgY2hlY2tib3ggc3RhdHVzXHJcbiAgICB2YXIgY29tcGxldGUgPSAkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpO1xyXG4gICAgLy8gcGF0Y2ggd2lsbCBtZXJnZSBleGlzdGluZyBkYXRhICh1ZHBhdGUgcmVwbGFjZXMgZXZlcnl0aGluZylcclxuICAgIC8vIENhbGwgdG9kb3MucGF0Y2goaWQsIHsgY29tcGxldGU6IHN0YXR1cyB9LCB7fSwgY2FsbGJhY2spXHJcbiAgICBzb2NrZXQuZW1pdCgndG9kb3M6OnBhdGNoJywgaWQsIHtcclxuICAgICAgY29tcGxldGU6IGNvbXBsZXRlXHJcbiAgICB9LCB7fSwgZXJyb3JIYW5kbGVyKTtcclxuICB9KTtcclxuXHJcbiAgc29ja2V0Lm9uKCd0b2RvcyBjcmVhdGVkJywgZnVuY3Rpb24odG9kbykge1xyXG4gICAgLy8gQ3JlYXRlIHRoZSBIVE1MIGZvciB0aGUgbmV3IGxpc3QgZWxlbWVudC4gVGhpcyBjYW4gYmUgZG9uZSBuaWNlclxyXG4gICAgLy8gZXZlbnR1YWxseSBieSB1c2luZyBhIHZpZXcgZW5naW5lIGxpa2UgRUpTIGluIHRoZSBicm93c2VyIGFuZCBzaGFyaW5nXHJcbiAgICAvLyB0aGUgdGVtcGxhdGUgZnJvbSBpbmRleC5lanNcclxuICAgIHZhciBodG1sID0gJzxsaSBjbGFzcz1cInBhZ2UtaGVhZGVyIGNoZWNrYm94XCIgZGF0YS1pZD1cIicgKyB0b2RvLl9pZCArICdcIj4nICtcclxuICAgICAgICAgICc8bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJkb25lXCI+JyArXHJcbiAgICAgICAgICB0b2RvLnRleHQgK1xyXG4gICAgICAgICAgJzwvbGFiZWw+PGEgaHJlZj1cImphdmFzY3JpcHQ6Ly9cIiBjbGFzcz1cInB1bGwtcmlnaHQgZGVsZXRlXCI+JyArXHJcbiAgICAgICAgICAnPHNwYW4gY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXJlbW92ZVwiPjwvc3Bhbj4nICtcclxuICAgICAgICAgICc8L2E+PC9saT4nO1xyXG5cclxuICAgIC8vIEFkZCBpdCB0byB0aGUgdG9kbyBsaXN0XHJcbiAgICAkKCcudG9kb3MnKS5hcHBlbmQoaHRtbCk7XHJcbiAgfSk7XHJcblxyXG4gIC8vIExpc3RlbiB0byBhIHBhdGNoZWQgdG9kb1xyXG4gIHNvY2tldC5vbigndG9kb3MgcGF0Y2hlZCcsIGZ1bmN0aW9uKHRvZG8pIHtcclxuICAgIHZhciBlbGVtZW50ID0gZmluZEVsZW1lbnQodG9kbyk7XHJcbiAgICAvLyBGaW5kIHRoZSBjaGVja2JveCBlbGVtZW50XHJcbiAgICB2YXIgY2hlY2tib3ggPSBlbGVtZW50LmZpbmQoJ1tuYW1lPVwiY29tcGxldGVcIl0nKTtcclxuICAgIC8vIFNldCB0aGUgY2hlY2tlZCBwcm9wZXJ0eSB0byB0aGUgdG9kbyBjb21wbGV0ZSBzdGF0dXNcclxuICAgIGNoZWNrYm94LnByb3AoJ2NoZWNrZWQnLCB0b2RvLmNvbXBsZXRlKTtcclxuICB9KTtcclxuXHJcbiAgc29ja2V0Lm9uKCd0b2RvcyByZW1vdmVkJywgZnVuY3Rpb24odG9kbykge1xyXG4gICAgLy8gRmluZCB0aGUgZWxlbWVudCBhbmQgcmVtb3ZlIGl0XHJcbiAgICBmaW5kRWxlbWVudCh0b2RvKS5yZW1vdmUoKTtcclxuICB9KTtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL2Fzc2V0L2pzL21haW4uanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==