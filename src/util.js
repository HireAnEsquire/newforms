var Concur = require('Concur')
  , DOMBuilder = require('DOMBuilder')
  , is = require('isomorph/lib/is')
  , object = require('isomorph/lib/object')

var DEFAULT_DATE_INPUT_FORMATS = [
      '%Y-%m-%d'              // '2006-10-25'
    , '%m/%d/%Y', '%m/%d/%y'  // '10/25/2006', '10/25/06'
    , '%b %d %Y', '%b %d, %Y' // 'Oct 25 2006', 'Oct 25, 2006'
    , '%d %b %Y', '%d %b, %Y' // '25 Oct 2006', '25 Oct, 2006'
    , '%B %d %Y', '%B %d, %Y' // 'October 25 2006', 'October 25, 2006'
    , '%d %B %Y', '%d %B, %Y' // '25 October 2006', '25 October, 2006'
    ]
  , DEFAULT_TIME_INPUT_FORMATS = [
      '%H:%M:%S' // '14:30:59'
    , '%H:%M'    // '14:30'
    ]
  , DEFAULT_DATETIME_INPUT_FORMATS = [
      '%Y-%m-%d %H:%M:%S' // '2006-10-25 14:30:59'
    , '%Y-%m-%d %H:%M'    // '2006-10-25 14:30'
    , '%Y-%m-%d'          // '2006-10-25'
    , '%m/%d/%Y %H:%M:%S' // '10/25/2006 14:30:59'
    , '%m/%d/%Y %H:%M'    // '10/25/2006 14:30'
    , '%m/%d/%Y'          // '10/25/2006'
    , '%m/%d/%y %H:%M:%S' // '10/25/06 14:30:59'
    , '%m/%d/%y %H:%M'    // '10/25/06 14:30'
    , '%m/%d/%y'          // '10/25/06'
    ]

function isCallable(o) {
  return (is.Function(o) || is.Function(o.__call__))
}

/**
 * Calls a validator, which may be a function or an objects with a
 * __call__ method, with the given value.
 */
function callValidator(v, value) {
  if (is.Function(v)) {
    v(value)
  }
  else if (is.Function(v.__call__)) {
    v.__call__(value)
  }
}

/**
 * Allows an Array. an object with an __iter__ method or a function which
 * returns one be used when ultimately expecting an Array.
 */
function iterate(o) {
  if (is.Array(o)) {
    return o
  }
  if (is.Function(o)) {
    o = o()
  }
  if (o != null && is.Function(o.__iter__)) {
    o = o.__iter__()
  }
  return o || []
}

/**
 * Converts 'firstName' and 'first_name' to 'First name', and
 * 'SHOUTING_LIKE_THIS' to 'SHOUTING LIKE THIS'.
 */
var prettyName = (function() {
  var capsRE = /([A-Z]+)/g
    , splitRE = /[ _]+/
    , trimRE = /(^ +| +$)/g
    , allCapsRE = /^[A-Z][A-Z0-9]+$/

  return function(name) {
    // Prefix sequences of caps with spaces and split on all space
    // characters.
    var parts = name.replace(capsRE, ' $1').split(splitRE)

    // If we had an initial cap...
    if (parts[0] === '') {
      parts.splice(0, 1)
    }

    // Give the first word an initial cap and all subsequent words an
    // initial lowercase if not all caps.
    for (var i = 0, l = parts.length; i < l; i++) {
      if (i == 0) {
        parts[0] = parts[0].charAt(0).toUpperCase() +
                   parts[0].substr(1)
      }
      else if (!allCapsRE.test(parts[i])) {
        parts[i] = parts[i].charAt(0).toLowerCase() +
                   parts[i].substr(1)
      }
    }

    return parts.join(' ')
  }
})()

/**
 * Creates an object representing the data held in a form.
 *
 * @param form a form object or a <code>String</code> specifying a form's
 *        <code>name</code> or <code>id</code> attribute. If a
 *        <code>String</code> is given, name is tried before id when attempting
 *        to find the form.
 *
 * @return an object representing the data present in the form. If the form
 *         could not be found, this object will be empty.
 */
function formData(form) {
  var data = {}
  if (is.String(form)) {
    form = document.forms[form] || document.getElementById(form)
  }
  if (!form) {
    return data
  }

  for (var i = 0, l = form.elements.length; i < l; i++) {
    var element = form.elements[i]
      , type = element.type
      , value = null

    // Retrieve the element's value (or values)
    if (type == 'hidden' || type == 'password' || type == 'text' ||
        type == 'textarea' || ((type == 'checkbox' ||
                                type == 'radio') && element.checked)) {
      value = element.value
    }
    else if (type == 'select-one') {
      value = element.options[element.selectedIndex].value
    }
    else if (type == 'select-multiple') {
      value = []
      for (var j = 0, m = element.options.length; j < m; j++) {
        if (element.options[j].selected) {
          value[value.length] = element.options[j].value
        }
      }
      if (value.length == 0) {
        value = null
      }
    }

    // Add any value obtained to the data object
    if (value !== null) {
      if (object.hasOwn(data, element.name)) {
        if (is.Array(data[element.name])) {
          data[element.name] = data[element.name].concat(value)
        }
        else {
          data[element.name] = [data[element.name], value]
        }
      }
      else {
        data[element.name] = value
      }
    }
  }

  return data
}

/**
 * Coerces to string and strips leading and trailing spaces.
 */
function strip(s) {
  return (''+s).replace(/(^\s+|\s+$)/g, '')
}

/**
 * A collection of errors that knows how to display itself in various formats.
 *
 * This object's properties are the field names, and corresponding values are
 * the errors.
 *
 * @constructor
 */
var ErrorObject = Concur.extend({
  constructor: function(errors) {
    if (!(this instanceof ErrorObject)) return new ErrorObject(errors)
    this.errors = errors || {}
  }
})

ErrorObject.prototype.set = function(name, error) {
  this.errors[name] = error
}

ErrorObject.prototype.get = function(name) {
  return this.errors[name]
}

ErrorObject.prototype.toString = function() {
  return ''+this.defaultRendering()
}

ErrorObject.prototype.defaultRendering = function() {
  return this.asUL()
}

/**
 * Determines if any errors are present.
 *
 * @return {Boolean} <code>true</code> if this object has had any properties
 *                   set, <code>false</code> otherwise.
 */
ErrorObject.prototype.isPopulated = function() {
  for (var name in this.errors) {
    if (object.hasOwn(this.errors, name)) {
      return true
    }
  }
  return false
}

/**
 * Displays error details as a list.
 */
ErrorObject.prototype.asUL = function() {
  var items = []
  for (var name in this.errors) {
    if (object.hasOwn(this.errors, name)) {
      items.push(DOMBuilder.createElement('li', {},
                     [name, this.errors[name].defaultRendering()]))
    }
  }
  if (!items.length) {
    return DOMBuilder.fragment()
  }
  return DOMBuilder.createElement('ul', {'class': 'errorlist'}, items)
}

/**
 * Displays error details as text.
 */
ErrorObject.prototype.asText = function() {
  var items = []
  for (var name in this.errors) {
    if (object.hasOwn(this.errors, name)) {
      items.push('* ' + name)
      var errorList = this.errors[name]
      for (var i = 0, l = errorList.errors.length; i < l; i++) {
        items.push('  * ' + errorList.errors[i])
      }
    }
  }
  return items.join('\n')
}

/**
 * A list of errors which knows how to display itself in various formats.
 *
 * @param {Array} [errors] a list of errors.
 * @constructor
 */
var ErrorList = Concur.extend({
  constructor: function(errors) {
    if (!(this instanceof ErrorList)) return new ErrorList(errors)
    this.errors = errors || []
  }
})

ErrorList.prototype.toString = function() {
  return ''+this.defaultRendering()
}

ErrorList.prototype.defaultRendering = function() {
  return this.asUL()
}

/**
 * Adds errors from another ErrorList.
 *
 * @param {ErrorList} errorList an ErrorList whose errors should be added.
 */
ErrorList.prototype.extend = function(errorList) {
  this.errors = this.errors.concat(errorList.errors)
}

/**
 * Displays errors as a list.
 */
ErrorList.prototype.asUL = function() {
  return DOMBuilder.createElement('ul', {'class': 'errorlist'},
      DOMBuilder.map('li', {}, this.errors))
}

/**
 * Displays errors as text.
 */
ErrorList.prototype.asText = function() {
  var items = []
  for (var i = 0, l = this.errors.length; i < l; i++) {
    items.push('* ' + this.errors[i])
  }
  return items.join('\n')
}

/**
 * Determines if any errors are present.
 *
 * @return {Boolean} <code>true</code> if this object contains any errors
 *                   <code>false</code> otherwise.
 */
ErrorList.prototype.isPopulated = function() {
  return this.errors.length > 0
}

/**
 * A validation error, containing a list of messages. Single messages
 * (e.g. those produced by validators may have an associated error code
 * and parameters to allow customisation by fields.
 */
var ValidationError = Concur.extend({
  constructor: function(message, kwargs) {
    if (!(this instanceof ValidationError)) return new ValidationError(message, kwargs)
    kwargs = object.extend({code: null, params: null}, kwargs)
    if (is.Array(message)) {
      this.messages = message
    }
    else {
      this.code = kwargs.code
      this.params = kwargs.params
      this.messages = [message]
    }
  }
})

ValidationError.prototype.toString = function() {
  return ('ValidationError: ' + this.messages.join('; '))
}

/**
 * Copyright (c) 2010 Nick Galbreath
 * http://code.google.com/p/stringencoders/source/browse/#svn/trunk/javascript
 * See LICENSE for license.
 */
var urlparse = {}

urlparse.urlsplit = function(url, default_scheme, allow_fragments)
{
    var leftover
    if (typeof allow_fragments == 'undefined') {
        allow_fragments = true
    }

    // scheme (optional), host, port
    var fullurl = /^([A-Za-z]+)?(:?\/\/)([0-9.\-A-Za-z]*)(?::(\d+))?(.*)$/
    // path, query, fragment
    var parse_leftovers = /([^?#]*)?(?:\?([^#]*))?(?:#(.*))?$/

    var o = {}

    var parts = url.match(fullurl)
    if (parts) {
        o.scheme = parts[1] || default_scheme || ''
        o.hostname = parts[3].toLowerCase() || ''
        o.port = parseInt(parts[4], 10) || ''
        // Probably should grab the netloc from regexp
        //  and then parse again for hostname/port

        o.netloc = parts[3]
        if (parts[4]) {
            o.netloc += ':' + parts[4]
        }

        leftover = parts[5]
    } else {
        o.scheme = default_scheme || ''
        o.netloc = ''
        o.hostname = ''
        leftover = url
    }
    o.scheme = o.scheme.toLowerCase()

    parts = leftover.match(parse_leftovers)

    o.path = parts[1] || ''
    o.query = parts[2] || ''

    if (allow_fragments) {
        o.fragment = parts[3] || ''
    } else {
        o.fragment = ''
    }

    return o
}

urlparse.urlunsplit = function(o) {
    var s = ''
    if (o.scheme) {
        s += o.scheme + '://'
    }

    if (o.netloc) {
        if (s == '') {
            s += '//'
        }
        s += o.netloc
    } else if (o.hostname) {
        // extension.  Python only uses netloc
        if (s == '') {
            s += '//'
        }
        s += o.hostname
        if (o.port) {
            s += ':' + o.port
        }
    }

    if (o.path) {
        s += o.path
    }

    if (o.query) {
        s += '?' + o.query
    }
    if (o.fragment) {
        s += '#' + o.fragment
    }
    return s
}

module.exports = {
  DEFAULT_DATE_INPUT_FORMATS: DEFAULT_DATE_INPUT_FORMATS
, DEFAULT_TIME_INPUT_FORMATS: DEFAULT_TIME_INPUT_FORMATS
, DEFAULT_DATETIME_INPUT_FORMATS: DEFAULT_DATETIME_INPUT_FORMATS
, callValidator: callValidator
, ErrorObject: ErrorObject
, ErrorList: ErrorList
, formData: formData
, ValidationError: ValidationError
, isCallable: isCallable
, iterate: iterate
, prettyName: prettyName
, strip: strip
, urlparse: urlparse
}
