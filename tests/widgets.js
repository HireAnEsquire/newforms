QUnit.module("widgets")

QUnit.test("TextInput", 8, function() {
  var w = forms.TextInput()
  reactHTMLEqual(w.render("email", ""),
        "<input type=\"text\" name=\"email\"/>")
  reactHTMLEqual(w.render("email", null),
        "<input type=\"text\" name=\"email\"/>")
  reactHTMLEqual(w.render("email", "test@example.com"),
        "<input type=\"text\" name=\"email\" value=\"test@example.com\"/>")
  reactHTMLEqual(w.render("email", "some \"quoted\" & ampersanded value"),
        "<input type=\"text\" name=\"email\" value=\"some &quot;quoted&quot; &amp; ampersanded value\"/>")
  reactHTMLEqual(w.render("email", "test@example.com", {attrs: {"className": "fun"}}),
        "<input type=\"text\" name=\"email\" class=\"fun\" value=\"test@example.com\"/>")

  // You can also pass "attrs" to the constructor
  w = forms.TextInput({attrs: {"className": "fun", "type": "email"}})
  reactHTMLEqual(w.render("email", ""),
        "<input class=\"fun\" type=\"email\" name=\"email\"/>")
  reactHTMLEqual(w.render("email", "foo@example.com"),
        "<input class=\"fun\" type=\"email\" name=\"email\" value=\"foo@example.com\"/>")

  // Attributes passed to render() get precedence over those passed to the constructor
  w = forms.TextInput({attrs: {"className": "pretty"}})
  reactHTMLEqual(w.render("email", "", {attrs: {"className": "special"}}),
        "<input class=\"special\" type=\"text\" name=\"email\"/>")
})

QUnit.test("HiddenInput", 10, function() {
  var w = forms.HiddenInput()
  reactHTMLEqual(w.render("email", ""),
        "<input type=\"hidden\" name=\"email\" value=\"\"/>")
  reactHTMLEqual(w.render("email", null),
        "<input type=\"hidden\" name=\"email\" value=\"\"/>")
  reactHTMLEqual(w.render("email", "test@example.com"),
        "<input type=\"hidden\" name=\"email\" value=\"test@example.com\"/>")
  reactHTMLEqual(w.render("email", "some \"quoted\" & ampersanded value"),
        "<input type=\"hidden\" name=\"email\" value=\"some &quot;quoted&quot; &amp; ampersanded value\"/>")
  reactHTMLEqual(w.render("email", "test@example.com", {attrs: {"className": "fun"}}),
        "<input type=\"hidden\" name=\"email\" class=\"fun\" value=\"test@example.com\"/>")

  // You can also pass "attrs" to the constructor
  w = forms.HiddenInput({attrs: {"className": "fun"}})
  reactHTMLEqual(w.render("email", ""),
        "<input class=\"fun\" type=\"hidden\" name=\"email\" value=\"\"/>")
  reactHTMLEqual(w.render("email", "foo@example.com"),
        "<input class=\"fun\" type=\"hidden\" name=\"email\" value=\"foo@example.com\"/>")

  // Attributes passed to render() get precedence over those passed to the constructor
  w = forms.HiddenInput({attrs: {"className": "pretty"}})
  reactHTMLEqual(w.render("email", "", {attrs: {"className": "special"}}),
        "<input class=\"special\" type=\"hidden\" name=\"email\" value=\"\"/>")

  // Boolean values are rendered to their string forms ("true" and "false")
  w = forms.HiddenInput()
  reactHTMLEqual(w.render('get_spam', false),
        "<input type=\"hidden\" name=\"get_spam\" value=\"false\"/>")
  reactHTMLEqual(w.render('get_spam', true),
        "<input type=\"hidden\" name=\"get_spam\" value=\"true\"/>")
})

QUnit.test("MultipleHiddenInput", 12, function() {
  var w = forms.MultipleHiddenInput()
  reactHTMLEqual(w.render("email", []), "<div></div>")
  reactHTMLEqual(w.render("email", null), "<div></div>")
  reactHTMLEqual(w.render("email", ["test@example.com"]),
        "<div><input type=\"hidden\" name=\"email\" value=\"test@example.com\"/></div>")
  reactHTMLEqual(w.render("email", ["some \"quoted\" & ampersanded value"]),
        "<div><input type=\"hidden\" name=\"email\" value=\"some &quot;quoted&quot; &amp; ampersanded value\"/></div>")
  reactHTMLEqual(w.render("email", ["test@example.com", "foo@example.com"]),
        "<div><input type=\"hidden\" name=\"email\" value=\"test@example.com\"/><input type=\"hidden\" name=\"email\" value=\"foo@example.com\"/></div>")
  reactHTMLEqual(w.render("email", ["test@example.com"], {attrs: {"className": "fun"}}),
        "<div><input type=\"hidden\" name=\"email\" class=\"fun\" value=\"test@example.com\"/></div>")
  reactHTMLEqual(w.render("email", ["test@example.com", "foo@example.com"], {attrs: {"className": "fun"}}),
        "<div><input type=\"hidden\" name=\"email\" class=\"fun\" value=\"test@example.com\"/><input type=\"hidden\" name=\"email\" class=\"fun\" value=\"foo@example.com\"/></div>")

  // You can also pass "attrs" to the constructor
  w = forms.MultipleHiddenInput({attrs: {"className": "fun"}})
  reactHTMLEqual(w.render("email", []), "<div></div>")
  reactHTMLEqual(w.render("email", ["foo@example.com"]),
        "<div><input class=\"fun\" type=\"hidden\" name=\"email\" value=\"foo@example.com\"/></div>")
  reactHTMLEqual(w.render("email", ["foo@example.com", "test@example.com"]),
        "<div><input class=\"fun\" type=\"hidden\" name=\"email\" value=\"foo@example.com\"/><input class=\"fun\" type=\"hidden\" name=\"email\" value=\"test@example.com\"/></div>")

  // Attributes passed to render() get precedence over those passed to the constructor
  w = forms.MultipleHiddenInput({attrs: {"className": "pretty"}})
  reactHTMLEqual(w.render("email", ["foo@example.com"], {attrs: {"className": "special"}}),
        "<div><input class=\"special\" type=\"hidden\" name=\"email\" value=\"foo@example.com\"/></div>")

  // Each input gets a unique id
  w = forms.MultipleHiddenInput()
  reactHTMLEqual(w.render.bind(w, "letters", ["a", "b", "c"], {attrs: {'id': 'hideme'}}),
        "<div><input type=\"hidden\" name=\"letters\" id=\"hideme_0\" value=\"a\"/><input type=\"hidden\" name=\"letters\" id=\"hideme_1\" value=\"b\"/><input type=\"hidden\" name=\"letters\" id=\"hideme_2\" value=\"c\"/></div>")
})

QUnit.test("FileInput", 7, function() {
  // FileInput widgets don't ever show the value, because the old value is of
  // no use if you are updating the form or if the provided file generated an
  // error.
  var w = forms.FileInput()
  reactHTMLEqual(w.render("email", ""),
        "<input type=\"file\" name=\"email\"/>")
  reactHTMLEqual(w.render("email", null),
        "<input type=\"file\" name=\"email\"/>")
  reactHTMLEqual(w.render("email", "test@example.com"),
        "<input type=\"file\" name=\"email\"/>")
  reactHTMLEqual(w.render("email", "some \"quoted\" & ampersanded value"),
        "<input type=\"file\" name=\"email\"/>")
  reactHTMLEqual(w.render("email", "test@example.com", {attrs: {"className": "fun"}}),
        "<input type=\"file\" name=\"email\" class=\"fun\"/>")

  // You can also pass "attrs" to the constructor
  w = forms.FileInput({attrs: {"className": "fun"}})
  reactHTMLEqual(w.render("email", ""),
        "<input class=\"fun\" type=\"file\" name=\"email\"/>")
  reactHTMLEqual(w.render("email", "foo@example.com"),
        "<input class=\"fun\" type=\"file\" name=\"email\"/>")
})

QUnit.test("Textarea", 8, function() {
  var w = forms.Textarea()
  reactHTMLEqual(w.render("msg", ""),
        "<textarea rows=\"3\" cols=\"40\" name=\"msg\"></textarea>")
  reactHTMLEqual(w.render("msg", null),
        "<textarea rows=\"3\" cols=\"40\" name=\"msg\"></textarea>")
  reactHTMLEqual(w.render("msg", "value"),
        "<textarea rows=\"3\" cols=\"40\" name=\"msg\">value</textarea>")
  reactHTMLEqual(w.render("msg", "some \"quoted\" & ampersanded value"),
        "<textarea rows=\"3\" cols=\"40\" name=\"msg\">some &quot;quoted&quot; &amp; ampersanded value</textarea>")
  reactHTMLEqual(w.render("msg", "value", {attrs: {"className": "pretty", rows: 20}}),
        "<textarea rows=\"20\" cols=\"40\" name=\"msg\" class=\"pretty\">value</textarea>")

  // You can also pass "attrs" to the constructor
  w = forms.Textarea({attrs: {"className": "pretty"}})
  reactHTMLEqual(w.render("msg", ""),
        "<textarea rows=\"3\" cols=\"40\" class=\"pretty\" name=\"msg\"></textarea>")
  reactHTMLEqual(w.render("msg", "example"),
        "<textarea rows=\"3\" cols=\"40\" class=\"pretty\" name=\"msg\">example</textarea>")

  // Attributes passed to render() get precedence over those passed to the constructor
  w = forms.Textarea({attrs: {"className": "pretty"}})
  reactHTMLEqual(w.render("msg", "", {attrs: {"className": "special"}}),
        "<textarea rows=\"3\" cols=\"40\" class=\"special\" name=\"msg\"></textarea>")
})

QUnit.test("CheckboxInput", 18, function() {
  var w = forms.CheckboxInput()
  reactHTMLEqual(w.render("is_cool", ""),
        "<input type=\"checkbox\" name=\"is_cool\"/>")
  reactHTMLEqual(w.render("is_cool", null),
        "<input type=\"checkbox\" name=\"is_cool\"/>")
  reactHTMLEqual(w.render("is_cool", false),
        "<input type=\"checkbox\" name=\"is_cool\"/>")
  reactHTMLEqual(w.render("is_cool", true),
        "<input type=\"checkbox\" name=\"is_cool\" checked=\"\"/>")

  // Using any value that's not in ("", null, false, true) will check the
  // checkbox and set the "value" attribute.
  reactHTMLEqual(w.render("is_cool", "foo"),
        "<input type=\"checkbox\" name=\"is_cool\" value=\"foo\" checked=\"\"/>")

  reactHTMLEqual(w.render("is_cool", false, {attrs: {"className": "pretty"}}),
        "<input type=\"checkbox\" name=\"is_cool\" class=\"pretty\"/>")

  // Regression for Django #17114
  reactHTMLEqual(w.render('is_cool', 0),
        '<input type="checkbox" name="is_cool" value="0" checked=\"\"/>')
  reactHTMLEqual(w.render('is_cool', 1),
        '<input type="checkbox" name="is_cool" value="1" checked=\"\"/>')

  // You can also pass "attrs" to the constructor
  w = forms.CheckboxInput({attrs: {"className": "pretty"}})
  reactHTMLEqual(w.render("is_cool", ""),
        "<input class=\"pretty\" type=\"checkbox\" name=\"is_cool\"/>")

  // Attributes passed to render() get precedence over those passed to the constructor
  w = forms.CheckboxInput({attrs: {"className": "pretty"}})
  reactHTMLEqual(w.render("is_cool", false, {attrs: {"className": "special"}}),
        "<input class=\"special\" type=\"checkbox\" name=\"is_cool\"/>")

  // You can pass "checkTest" to the constructor. This is a function that
  // takes the value and returns true if the box should be checked.
  w = forms.CheckboxInput({checkTest: function(value) { return value.indexOf("hello") == 0; }})
  reactHTMLEqual(w.render("greeting", ""),
        "<input type=\"checkbox\" name=\"greeting\"/>")
  reactHTMLEqual(w.render("greeting", "hello"),
        "<input type=\"checkbox\" name=\"greeting\" value=\"hello\" checked=\"\"/>")
  reactHTMLEqual(w.render("greeting", "hello there"),
        "<input type=\"checkbox\" name=\"greeting\" value=\"hello there\" checked=\"\"/>")
  reactHTMLEqual(w.render("greeting", "hello & goodbye"),
        "<input type=\"checkbox\" name=\"greeting\" value=\"hello &amp; goodbye\" checked=\"\"/>")

  // Calling "checkTest" shouldn't swallow exceptions
  throws(function() { w.render("greeting", true) }, "Calling checkTest() shouldn't swallow exceptions")

  // The CheckboxInput widget will return False if the key is not found in
  // the data (because HTML form submission doesn't send any result for
  // unchecked checkboxes).
  strictEqual(w.valueFromData({}, {}, 'testing'), false)

  var value = w.valueFromData({testing: '0'}, {}, 'testing')
  equal(typeof value, 'boolean')
  strictEqual(value, true)
})

QUnit.test("Select", 15, function() {
  var w = forms.Select()
  reactHTMLEqual(w.render("beatle", "J", {choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]}),
"<select name=\"beatle\">" +
"<option selected=\"\" value=\"J\">John</option>" +
"<option value=\"P\">Paul</option>" +
"<option value=\"G\">George</option>" +
"<option value=\"R\">Ringo</option>" +
"</select>")

  // Lazy additional choices are normalised to value, label pairs
  reactHTMLEqual(w.render("beatle", "John", {choices: ['John', 'Paul', 'George', 'Ringo']}),
"<select name=\"beatle\">" +
"<option selected=\"\" value=\"John\">John</option>" +
"<option value=\"Paul\">Paul</option>" +
"<option value=\"George\">George</option>" +
"<option value=\"Ringo\">Ringo</option>" +
"</select>")

  // If the value is null, none of the options are selected
  reactHTMLEqual(w.render("beatle", null, {choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]}),
"<select name=\"beatle\">" +
"<option value=\"J\">John</option>" +
"<option value=\"P\">Paul</option>" +
"<option value=\"G\">George</option>" +
"<option value=\"R\">Ringo</option>" +
"</select>")

  // If the value corresponds to a label (but not to an option value), none of the options are selected
  reactHTMLEqual(w.render("beatle", "John", {choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]}),
"<select name=\"beatle\">" +
"<option value=\"J\">John</option>" +
"<option value=\"P\">Paul</option>" +
"<option value=\"G\">George</option>" +
"<option value=\"R\">Ringo</option>" +
"</select>")

  // Only one option can be selected
//   reactHTMLEqual(w.render('choices', '0', {choices: [['0', '0'], ['1', '1'], ['2', '2'], ['3', '3'], ['0', 'extra']]}),
// '<select name="choices">' +
// '<option selected="" value="0">0</option>' +
// '<option value="1">1</option>' +
// '<option value="2">2</option>' +
// '<option value="3">3</option>' +
// '<option value="0">extra</option>' +
// '</select>')

  // The value is compared to its String representation
  reactHTMLEqual(w.render("num", 2, {choices: [['1', '1'], ['2', '2'], ['3', '3']]}),
"<select name=\"num\">" +
"<option value=\"1\">1</option>" +
"<option selected=\"\" value=\"2\">2</option>" +
"<option value=\"3\">3</option>" +
"</select>")
  reactHTMLEqual(w.render("num", "2", {choices: [[1, 1], [2, 2], [3, 3]]}),
"<select name=\"num\">" +
"<option value=\"1\">1</option>" +
"<option selected=\"\" value=\"2\">2</option>" +
"<option value=\"3\">3</option>" +
"</select>")
  reactHTMLEqual(w.render("num", 2, {choices: [[1, 1], [2, 2], [3, 3]]}),
"<select name=\"num\">" +
"<option value=\"1\">1</option>" +
"<option selected=\"\" value=\"2\">2</option>" +
"<option value=\"3\">3</option>" +
"</select>")

  // You can also pass "choices" to the constructor:
  w = forms.Select({choices: [[1, 1], [2, 2], [3, 3]]})
  reactHTMLEqual(w.render("num", 2),
"<select name=\"num\">" +
"<option value=\"1\">1</option>" +
"<option selected=\"\" value=\"2\">2</option>" +
"<option value=\"3\">3</option>" +
"</select>")

  // If "choices" is passed to both the constructor and render(), then they'll both be in the output
  reactHTMLEqual(w.render("num", 2, {choices: [[4, 4], [5, 5]]}),
"<select name=\"num\">" +
"<option value=\"1\">1</option>" +
"<option selected=\"\" value=\"2\">2</option>" +
"<option value=\"3\">3</option>" +
"<option value=\"4\">4</option>" +
"<option value=\"5\">5</option>" +
"</select>")

  // Choices are escaped correctly
  reactHTMLEqual(w.render("num", null, {choices: [["bad", "you & me"]]}),
"<select name=\"num\">" +
"<option value=\"1\">1</option>" +
"<option value=\"2\">2</option>" +
"<option value=\"3\">3</option>" +
"<option value=\"bad\">you &amp; me</option>" +
"</select>")

  // Choices can be nested one level in order to create HTML optgroups
  w.choices = [['outer1', 'Outer 1'], ['Group "1"', [['inner1', 'Inner 1'], ['inner2', 'Inner 2']]]]
  reactHTMLEqual(w.render("nestchoice", null),
"<select name=\"nestchoice\">" +
"<option value=\"outer1\">Outer 1</option>" +
"<optgroup label=\"Group &quot;1&quot;\">" +
"<option value=\"inner1\">Inner 1</option>" +
"<option value=\"inner2\">Inner 2</option>" +
"</optgroup>" +
"</select>")
  reactHTMLEqual(w.render("nestchoice", "outer1"),
"<select name=\"nestchoice\">" +
"<option selected=\"\" value=\"outer1\">Outer 1</option>" +
"<optgroup label=\"Group &quot;1&quot;\">" +
"<option value=\"inner1\">Inner 1</option>" +
"<option value=\"inner2\">Inner 2</option>" +
"</optgroup>" +
"</select>")
  reactHTMLEqual(w.render("nestchoice", "inner1"),
"<select name=\"nestchoice\">" +
"<option value=\"outer1\">Outer 1</option>" +
"<optgroup label=\"Group &quot;1&quot;\">" +
"<option selected=\"\" value=\"inner1\">Inner 1</option>" +
"<option value=\"inner2\">Inner 2</option>" +
"</optgroup>" +
"</select>")

  // Lazy choices passed to the constructor are normalised
  w = forms.Select({choices: [1, 2, 3]})
  reactHTMLEqual(w.render("num", 2),
"<select name=\"num\">" +
"<option value=\"1\">1</option>" +
"<option selected=\"\" value=\"2\">2</option>" +
"<option value=\"3\">3</option>" +
"</select>")
  // Lazy optgroups are normalised too
  reactHTMLEqual(w.render("num", 5, {choices: [['Big Numbers', [4, 5]]]}),
"<select name=\"num\">" +
"<option value=\"1\">1</option>" +
"<option value=\"2\">2</option>" +
"<option value=\"3\">3</option>" +
"<optgroup label=\"Big Numbers\">" +
"<option value=\"4\">4</option>" +
"<option selected=\"\" value=\"5\">5</option>" +
"</optgroup>" +
"</select>")
})

QUnit.test("NullBooleanSelect", 5, function() {
  var w = forms.NullBooleanSelect()
  reactHTMLEqual(w.render("is_cool", true),
"<select name=\"is_cool\">" +
"<option value=\"1\">Unknown</option>" +
"<option selected=\"\" value=\"2\">Yes</option>" +
"<option value=\"3\">No</option>" +
"</select>")
  reactHTMLEqual(w.render("is_cool", false),
"<select name=\"is_cool\">" +
"<option value=\"1\">Unknown</option>" +
"<option value=\"2\">Yes</option>" +
"<option selected=\"\" value=\"3\">No</option>" +
"</select>")
  reactHTMLEqual(w.render("is_cool", null),
"<select name=\"is_cool\">" +
"<option selected=\"\" value=\"1\">Unknown</option>" +
"<option value=\"2\">Yes</option>" +
"<option value=\"3\">No</option>" +
"</select>")
  reactHTMLEqual(w.render("is_cool", "2"),
"<select name=\"is_cool\">" +
"<option value=\"1\">Unknown</option>" +
"<option selected=\"\" value=\"2\">Yes</option>" +
"<option value=\"3\">No</option>" +
"</select>")
  reactHTMLEqual(w.render("is_cool", "3"),
"<select name=\"is_cool\">" +
"<option value=\"1\">Unknown</option>" +
"<option value=\"2\">Yes</option>" +
"<option selected=\"\" value=\"3\">No</option>" +
"</select>")
})

QUnit.test("SelectMultiple", 17, function() {
  var w = forms.SelectMultiple()
  reactHTMLEqual(w.render("beatles", ["J"], {choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]}),
"<select name=\"beatles\" multiple=\"\">" +
"<option selected=\"\" value=\"J\">John</option>" +
"<option value=\"P\">Paul</option>" +
"<option value=\"G\">George</option>" +
"<option value=\"R\">Ringo</option>" +
"</select>")
  reactHTMLEqual(w.render("beatles", ["J", "P"], {choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]}),
"<select name=\"beatles\" multiple=\"\">" +
"<option selected=\"\" value=\"J\">John</option>" +
"<option selected=\"\" value=\"P\">Paul</option>" +
"<option value=\"G\">George</option>" +
"<option value=\"R\">Ringo</option>" +
"</select>")
  reactHTMLEqual(w.render("beatles", ["J", "P", "R"], {choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]}),
"<select name=\"beatles\" multiple=\"\">" +
"<option selected=\"\" value=\"J\">John</option>" +
"<option selected=\"\" value=\"P\">Paul</option>" +
"<option value=\"G\">George</option>" +
"<option selected=\"\" value=\"R\">Ringo</option>" +
"</select>")

  // If the value is null, none of the options are selected
  reactHTMLEqual(w.render("beatles", null, {choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]}),
"<select name=\"beatles\" multiple=\"\">" +
"<option value=\"J\">John</option>" +
"<option value=\"P\">Paul</option>" +
"<option value=\"G\">George</option>" +
"<option value=\"R\">Ringo</option>" +
"</select>")

  // If the value corresponds to a label (but not to an option value), none of the options are selected
  reactHTMLEqual(w.render("beatles", ["John"], {choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]}),
"<select name=\"beatles\" multiple=\"\">" +
"<option value=\"J\">John</option>" +
"<option value=\"P\">Paul</option>" +
"<option value=\"G\">George</option>" +
"<option value=\"R\">Ringo</option>" +
"</select>")

  // Multiple options (with the same value) can be selected
  reactHTMLEqual(w.render('choices', ['0'], {choices: [['0', '0'], ['1', '1'], ['2', '2'], ['3', '3'], ['0', 'extra']]}),
'<select name="choices" multiple=\"\">' +
'<option selected="" value="0">0</option>' +
'<option value="1">1</option>' +
'<option value="2">2</option>' +
'<option value="3">3</option>' +
'<option selected="" value="0">extra</option>' +
'</select>')

  // If multiple values are given, but some of them are not valid, the valid ones are selected
  reactHTMLEqual(w.render("beatles", ["J", "G", "foo"], {choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]}),
"<select name=\"beatles\" multiple=\"\">" +
"<option selected=\"\" value=\"J\">John</option>" +
"<option value=\"P\">Paul</option>" +
"<option selected=\"\" value=\"G\">George</option>" +
"<option value=\"R\">Ringo</option>" +
"</select>")

  // The value is compared to its String representation
  reactHTMLEqual(w.render("nums", [2], {choices: [['1', '1'], ['2', '2'], ['3', '3']]}),
"<select name=\"nums\" multiple=\"\">" +
"<option value=\"1\">1</option>" +
"<option selected=\"\" value=\"2\">2</option>" +
"<option value=\"3\">3</option>" +
"</select>")
  reactHTMLEqual(w.render("nums", ["2"], {choices: [[1, 1], [2, 2], [3, 3]]}),
"<select name=\"nums\" multiple=\"\">" +
"<option value=\"1\">1</option>" +
"<option selected=\"\" value=\"2\">2</option>" +
"<option value=\"3\">3</option>" +
"</select>")
  reactHTMLEqual(w.render("nums", [2], {choices: [[1, 1], [2, 2], [3, 3]]}),
"<select name=\"nums\" multiple=\"\">" +
"<option value=\"1\">1</option>" +
"<option selected=\"\" value=\"2\">2</option>" +
"<option value=\"3\">3</option>" +
"</select>")

  // You can also pass "choices" to the constructor:
  w = forms.SelectMultiple({choices: [[1, 1], [2, 2], [3, 3]]})
  reactHTMLEqual(w.render("nums", [2]),
"<select name=\"nums\" multiple=\"\">" +
"<option value=\"1\">1</option>" +
"<option selected=\"\" value=\"2\">2</option>" +
"<option value=\"3\">3</option>" +
"</select>")

  // If "choices" is passed to both the constructor and render(), then they'll both be in the output
  reactHTMLEqual(w.render("nums", [2], {choices: [[4, 4], [5, 5]]}),
"<select name=\"nums\" multiple=\"\">" +
"<option value=\"1\">1</option>" +
"<option selected=\"\" value=\"2\">2</option>" +
"<option value=\"3\">3</option>" +
"<option value=\"4\">4</option>" +
"<option value=\"5\">5</option>" +
"</select>")

  // Choices are escaped correctly
  reactHTMLEqual(w.render("nums", null, {choices: [["bad", "you & me"]]}),
"<select name=\"nums\" multiple=\"\">" +
"<option value=\"1\">1</option>" +
"<option value=\"2\">2</option>" +
"<option value=\"3\">3</option>" +
"<option value=\"bad\">you &amp; me</option>" +
"</select>")

  // Choices can be nested one level in order to create HTML optgroups
  w.choices = [['outer1', 'Outer 1'], ['Group "1"', [['inner1', 'Inner 1'], ['inner2', 'Inner 2']]]]
  reactHTMLEqual(w.render("nestchoice", null),
"<select name=\"nestchoice\" multiple=\"\">" +
"<option value=\"outer1\">Outer 1</option>" +
"<optgroup label=\"Group &quot;1&quot;\">" +
"<option value=\"inner1\">Inner 1</option>" +
"<option value=\"inner2\">Inner 2</option>" +
"</optgroup>" +
"</select>")
  reactHTMLEqual(w.render("nestchoice", ["outer1"]),
"<select name=\"nestchoice\" multiple=\"\">" +
"<option selected=\"\" value=\"outer1\">Outer 1</option>" +
"<optgroup label=\"Group &quot;1&quot;\">" +
"<option value=\"inner1\">Inner 1</option>" +
"<option value=\"inner2\">Inner 2</option>" +
"</optgroup>" +
"</select>")
  reactHTMLEqual(w.render("nestchoice", ["inner1"]),
"<select name=\"nestchoice\" multiple=\"\">" +
"<option value=\"outer1\">Outer 1</option>" +
"<optgroup label=\"Group &quot;1&quot;\">" +
"<option selected=\"\" value=\"inner1\">Inner 1</option>" +
"<option value=\"inner2\">Inner 2</option>" +
"</optgroup>" +
"</select>")
  reactHTMLEqual(w.render("nestchoice", ["outer1", "inner2"]),
 "<select name=\"nestchoice\" multiple=\"\">" +
"<option selected=\"\" value=\"outer1\">Outer 1</option>" +
"<optgroup label=\"Group &quot;1&quot;\">" +
"<option value=\"inner1\">Inner 1</option>" +
"<option selected=\"\" value=\"inner2\">Inner 2</option>" +
"</optgroup>" +
"</select>")
})

QUnit.test("RadioSelect", 21, function() {
  var w = forms.RadioSelect()
  reactHTMLEqual(w.render("beatle", "J", {choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]}),
"<ul>" +
"<li><label><input type=\"radio\" name=\"beatle\" value=\"J\" checked=\"\"/> John</label></li>" +
"<li><label><input type=\"radio\" name=\"beatle\" value=\"P\"/> Paul</label></li>" +
"<li><label><input type=\"radio\" name=\"beatle\" value=\"G\"/> George</label></li>" +
"<li><label><input type=\"radio\" name=\"beatle\" value=\"R\"/> Ringo</label></li>" +
"</ul>")

  // If the value is null, none of the options are checked
  reactHTMLEqual(w.render("beatle", null, {choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]}),
"<ul>" +
"<li><label><input type=\"radio\" name=\"beatle\" value=\"J\"/> John</label></li>" +
"<li><label><input type=\"radio\" name=\"beatle\" value=\"P\"/> Paul</label></li>" +
"<li><label><input type=\"radio\" name=\"beatle\" value=\"G\"/> George</label></li>" +
"<li><label><input type=\"radio\" name=\"beatle\" value=\"R\"/> Ringo</label></li>" +
"</ul>")

  // If the value corresponds to a label (but not to an option value), none of the options are checked
  reactHTMLEqual(w.render("beatle", "John", {choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]}),
"<ul>" +
"<li><label><input type=\"radio\" name=\"beatle\" value=\"J\"/> John</label></li>" +
"<li><label><input type=\"radio\" name=\"beatle\" value=\"P\"/> Paul</label></li>" +
"<li><label><input type=\"radio\" name=\"beatle\" value=\"G\"/> George</label></li>" +
"<li><label><input type=\"radio\" name=\"beatle\" value=\"R\"/> Ringo</label></li>" +
"</ul>")

  // The value is compared to its String representation
  reactHTMLEqual(w.render("num", 2, {choices: [['1', '1'], ['2', '2'], ['3', '3']]}),
"<ul>" +
"<li><label><input type=\"radio\" name=\"num\" value=\"1\"/> 1</label></li>" +
"<li><label><input type=\"radio\" name=\"num\" value=\"2\" checked=\"\"/> 2</label></li>" +
"<li><label><input type=\"radio\" name=\"num\" value=\"3\"/> 3</label></li>" +
"</ul>")
  reactHTMLEqual(w.render("num", "2", {choices: [[1, 1], [2, 2], [3, 3]]}),
"<ul>" +
"<li><label><input type=\"radio\" name=\"num\" value=\"1\"/> 1</label></li>" +
"<li><label><input type=\"radio\" name=\"num\" value=\"2\" checked=\"\"/> 2</label></li>" +
"<li><label><input type=\"radio\" name=\"num\" value=\"3\"/> 3</label></li>" +
"</ul>")
  reactHTMLEqual(w.render("num", 2, {choices: [[1, 1], [2, 2], [3, 3]]}),
"<ul>" +
"<li><label><input type=\"radio\" name=\"num\" value=\"1\"/> 1</label></li>" +
"<li><label><input type=\"radio\" name=\"num\" value=\"2\" checked=\"\"/> 2</label></li>" +
"<li><label><input type=\"radio\" name=\"num\" value=\"3\"/> 3</label></li>" +
"</ul>")

  // You can also pass "choices" to the constructor:
  w = forms.RadioSelect({choices: [[1, 1], [2, 2], [3, 3]]})
  reactHTMLEqual(w.render("num", 2),
"<ul>" +
"<li><label><input type=\"radio\" name=\"num\" value=\"1\"/> 1</label></li>" +
"<li><label><input type=\"radio\" name=\"num\" value=\"2\" checked=\"\"/> 2</label></li>" +
"<li><label><input type=\"radio\" name=\"num\" value=\"3\"/> 3</label></li>" +
"</ul>")

  // If 'choices' is passed to both the constructor and render(), then they'll both be in the output
  reactHTMLEqual(w.render("num", 2, {choices: [[4, 4], [5, 5]]}),
"<ul>" +
"<li><label><input type=\"radio\" name=\"num\" value=\"1\"/> 1</label></li>" +
"<li><label><input type=\"radio\" name=\"num\" value=\"2\" checked=\"\"/> 2</label></li>" +
"<li><label><input type=\"radio\" name=\"num\" value=\"3\"/> 3</label></li>" +
"<li><label><input type=\"radio\" name=\"num\" value=\"4\"/> 4</label></li>" +
"<li><label><input type=\"radio\" name=\"num\" value=\"5\"/> 5</label></li>" +
"</ul>")

  // RadioSelect uses a RadioFieldRenderer to render the individual radio
  // inputs. You can manipulate that object directly to customise the way
  // the RadioSelect is rendered.
  w = forms.RadioSelect()
  var r = w.getRenderer("beatle", "J", {choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]})
  var inputs1 = [], inputs2 = [], inputs3 = []
  var radioInputs = r.choiceInputs()
  for (var i = 0, inp; inp = radioInputs[i]; i++) {
    inputs1.push(inp.render(), React.createElement('br', null))
    inputs2.push(React.createElement('p', null, inp.tag(), " ", inp.choiceLabel))
    inputs3.push(React.createElement('span', null,
        [inp.name, inp.value, inp.choiceValue, inp.choiceLabel, inp.isChecked()].join(' ')))
  }
  reactHTMLEqual(React.createElement('div', null, inputs1),
"<div>" +
"<label><input type=\"radio\" name=\"beatle\" value=\"J\" checked=\"\"/> John</label><br/>" +
"<label><input type=\"radio\" name=\"beatle\" value=\"P\"/> Paul</label><br/>" +
"<label><input type=\"radio\" name=\"beatle\" value=\"G\"/> George</label><br/>" +
"<label><input type=\"radio\" name=\"beatle\" value=\"R\"/> Ringo</label><br/>" +
"</div>")
  reactHTMLEqual(React.createElement('div', null, inputs2),
"<div>" +
"<p><input type=\"radio\" name=\"beatle\" value=\"J\" checked=\"\"/> John</p>" +
"<p><input type=\"radio\" name=\"beatle\" value=\"P\"/> Paul</p>" +
"<p><input type=\"radio\" name=\"beatle\" value=\"G\"/> George</p>" +
"<p><input type=\"radio\" name=\"beatle\" value=\"R\"/> Ringo</p>" +
"</div>")
  reactHTMLEqual(React.createElement('div', null, inputs3),
"<div>" +
"<span>beatle J J John true</span>" +
"<span>beatle J P Paul false</span>" +
"<span>beatle J G George false</span>" +
"<span>beatle J R Ringo false</span>" +
"</div>")

  // You can create your own custom renderers for RadioSelect to use.
  var MyRenderer = forms.RadioFieldRenderer.extend()
  MyRenderer.prototype.render = function() {
    var inputs = this.choiceInputs()
    var items = []
    for (var i = 0, l = inputs.length; i < l; i++) {
      items.push(inputs[i].render())
      if (i != l - 1) {
        items.push(React.createElement('br', null))
      }
    }
    return React.createElement('div', null, items)
  }

  w = forms.RadioSelect({renderer: MyRenderer})
  reactHTMLEqual(w.render("beatle", "G", {choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]}),
        "<div><label><input type=\"radio\" name=\"beatle\" value=\"J\"/> John</label><br/><label><input type=\"radio\" name=\"beatle\" value=\"P\"/> Paul</label><br/><label><input type=\"radio\" name=\"beatle\" value=\"G\" checked=\"\"/> George</label><br/><label><input type=\"radio\" name=\"beatle\" value=\"R\"/> Ringo</label></div>")

  // Or you can use custom RadioSelect fields that use your custom renderer
  var CustomRadioSelect = forms.RadioSelect.extend({
    constructor: function() {
      forms.RadioSelect.call(this, {renderer: MyRenderer})
    }
  })

  w = new CustomRadioSelect()
  reactHTMLEqual(w.render("beatle", "G", {choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]}),
        "<div><label><input type=\"radio\" name=\"beatle\" value=\"J\"/> John</label><br/><label><input type=\"radio\" name=\"beatle\" value=\"P\"/> Paul</label><br/><label><input type=\"radio\" name=\"beatle\" value=\"G\" checked=\"\"/> George</label><br/><label><input type=\"radio\" name=\"beatle\" value=\"R\"/> Ringo</label></div>")

  // A RadioFieldRenderer object also allows index access to individual
  // RadioInput objects.
  w = forms.RadioSelect()
  r = w.getRenderer("beatle", "J", {choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]})
  reactHTMLEqual(r.choiceInput(1).render(), "<label><input type=\"radio\" name=\"beatle\" value=\"P\"/> Paul</label>")
  reactHTMLEqual(r.choiceInput(0).render(), "<label><input type=\"radio\" name=\"beatle\" value=\"J\" checked=\"\"/> John</label>")
  strictEqual(r.choiceInput(0).isChecked(), true)
  strictEqual(r.choiceInput(1).isChecked(), false)
  throws(function() { r.choiceInput(10) })

  // Choices are escaped correctly
  w = forms.RadioSelect()
  reactHTMLEqual(w.render("escape", null, {choices: [["bad", "you & me"]]}),
"<ul>" +
"<li><label><input type=\"radio\" name=\"escape\" value=\"bad\"/> you &amp; me</label></li>" +
"</ul>")

  // Attributes provided at instantiation are passed to the constituent inputs
  w = forms.RadioSelect({attrs: {id: "foo"}})
  reactHTMLEqual(w.render.bind(w, "beatle", "J", {choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]}),
"<ul id=\"foo\">" +
"<li><label for=\"foo_0\"><input id=\"foo_0\" type=\"radio\" name=\"beatle\" value=\"J\" checked=\"\"/> John</label></li>" +
"<li><label for=\"foo_1\"><input id=\"foo_1\" type=\"radio\" name=\"beatle\" value=\"P\"/> Paul</label></li>" +
"<li><label for=\"foo_2\"><input id=\"foo_2\" type=\"radio\" name=\"beatle\" value=\"G\"/> George</label></li>" +
"<li><label for=\"foo_3\"><input id=\"foo_3\" type=\"radio\" name=\"beatle\" value=\"R\"/> Ringo</label></li>" +
"</ul>")

  // Attributes provided at render-time are passed to the constituent inputs
  w = forms.RadioSelect()
  reactHTMLEqual(w.render.bind(w, "beatle", "J", {attrs: {id: "bar"}, choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]}),
"<ul id=\"bar\">" +
"<li><label for=\"bar_0\"><input id=\"bar_0\" type=\"radio\" name=\"beatle\" value=\"J\" checked=\"\"/> John</label></li>" +
"<li><label for=\"bar_1\"><input id=\"bar_1\" type=\"radio\" name=\"beatle\" value=\"P\"/> Paul</label></li>" +
"<li><label for=\"bar_2\"><input id=\"bar_2\" type=\"radio\" name=\"beatle\" value=\"G\"/> George</label></li>" +
"<li><label for=\"bar_3\"><input id=\"bar_3\" type=\"radio\" name=\"beatle\" value=\"R\"/> Ringo</label></li>" +
"</ul>")
})

QUnit.test("Nested choices", 2, function() {
  // Choices can be nested for radio buttons
  var w = forms.RadioSelect()
  w.choices = [
    ['unknown', 'Unknown']
  , ['Audio', [['vinyl', 'Vinyl'], ['cd', 'CD']]]
  , ['Video', [['vhs', 'VHS'], ['dvd', 'DVD']]]
  ]

  reactHTMLEqual(w.render.bind(w, 'nestchoice', 'dvd', {attrs: {id: 'media'}}),
"<ul id=\"media\">" +
"<li><label for=\"media_0\"><input id=\"media_0\" type=\"radio\" name=\"nestchoice\" value=\"unknown\"/> Unknown</label></li>" +
"<li>Audio<ul id=\"media_1\">" +
  "<li><label for=\"media_1_0\"><input id=\"media_1_0\" type=\"radio\" name=\"nestchoice\" value=\"vinyl\"/> Vinyl</label></li>" +
  "<li><label for=\"media_1_1\"><input id=\"media_1_1\" type=\"radio\" name=\"nestchoice\" value=\"cd\"/> CD</label></li>" +
"</ul></li>" +
"<li>Video<ul id=\"media_2\">" +
  "<li><label for=\"media_2_0\"><input id=\"media_2_0\" type=\"radio\" name=\"nestchoice\" value=\"vhs\"/> VHS</label></li>" +
  "<li><label for=\"media_2_1\"><input id=\"media_2_1\" type=\"radio\" name=\"nestchoice\" value=\"dvd\" checked=\"\"/> DVD</label></li>" +
"</ul></li>" +
"</ul>")

  // Choices can be nested for checkboxes:
  w = forms.CheckboxSelectMultiple()
  w.choices = [
    ['unknown', 'Unknown']
  , ['Audio', [['vinyl', 'Vinyl'], ['cd', 'CD']]]
  , ['Video', [['vhs', 'VHS'], ['dvd', 'DVD']]]
  ]
  reactHTMLEqual(w.render.bind(w, 'nestchoice', ['vinyl', 'dvd'], {attrs: {id: 'media'}}),
"<ul id=\"media\">" +
"<li><label for=\"media_0\"><input id=\"media_0\" type=\"checkbox\" name=\"nestchoice\" value=\"unknown\"/> Unknown</label></li>" +
"<li>Audio<ul id=\"media_1\">" +
  "<li><label for=\"media_1_0\"><input id=\"media_1_0\" type=\"checkbox\" name=\"nestchoice\" value=\"vinyl\" checked=\"\"/> Vinyl</label></li>" +
  "<li><label for=\"media_1_1\"><input id=\"media_1_1\" type=\"checkbox\" name=\"nestchoice\" value=\"cd\"/> CD</label></li>" +
"</ul></li>" +
"<li>Video<ul id=\"media_2\">" +
  "<li><label for=\"media_2_0\"><input id=\"media_2_0\" type=\"checkbox\" name=\"nestchoice\" value=\"vhs\"/> VHS</label></li>" +
  "<li><label for=\"media_2_1\"><input id=\"media_2_1\" type=\"checkbox\" name=\"nestchoice\" value=\"dvd\" checked=\"\"/> DVD</label></li>" +
"</ul></li>" +
"</ul>")
})

QUnit.test("CheckboxSelectMultiple", 17, function() {
  var w = forms.CheckboxSelectMultiple()
  reactHTMLEqual(w.render("beatles", ["J"], {choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]}),
"<ul>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"J\" checked=\"\"/> John</label></li>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"P\"/> Paul</label></li>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"G\"/> George</label></li>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"R\"/> Ringo</label></li>" +
"</ul>")
  reactHTMLEqual(w.render("beatles", ["J", "P"], {choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]}),
"<ul>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"J\" checked=\"\"/> John</label></li>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"P\" checked=\"\"/> Paul</label></li>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"G\"/> George</label></li>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"R\"/> Ringo</label></li>" +
"</ul>")
  reactHTMLEqual(w.render("beatles", ["J", "P", "R"], {choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]}),
"<ul>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"J\" checked=\"\"/> John</label></li>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"P\" checked=\"\"/> Paul</label></li>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"G\"/> George</label></li>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"R\" checked=\"\"/> Ringo</label></li>" +
"</ul>")

  // If the value is null, none of the options are selected
  reactHTMLEqual(w.render("beatles", null, {choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]}),
"<ul>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"J\"/> John</label></li>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"P\"/> Paul</label></li>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"G\"/> George</label></li>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"R\"/> Ringo</label></li>" +
"</ul>")

  // If the value corresponds to a label (but not to an option value), none of the options are selected
  reactHTMLEqual(w.render("beatles", ["John"], {choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]}),
"<ul>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"J\"/> John</label></li>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"P\"/> Paul</label></li>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"G\"/> George</label></li>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"R\"/> Ringo</label></li>" +
"</ul>")

  // If multiple values are given, but some of them are not valid, the valid ones are selected
  reactHTMLEqual(w.render("beatles", ["J", "G", "foo"], {choices: [['J', 'John'], ['P', 'Paul'], ['G', 'George'], ['R', 'Ringo']]}),
"<ul>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"J\" checked=\"\"/> John</label></li>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"P\"/> Paul</label></li>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"G\" checked=\"\"/> George</label></li>" +
"<li><label><input type=\"checkbox\" name=\"beatles\" value=\"R\"/> Ringo</label></li>" +
"</ul>")

  // The value is compared to its String representation
  reactHTMLEqual(w.render("nums", [2], {choices: [['1', '1'], ['2', '2'], ['3', '3']]}),
"<ul>" +
"<li><label><input type=\"checkbox\" name=\"nums\" value=\"1\"/> 1</label></li>" +
"<li><label><input type=\"checkbox\" name=\"nums\" value=\"2\" checked=\"\"/> 2</label></li>" +
"<li><label><input type=\"checkbox\" name=\"nums\" value=\"3\"/> 3</label></li>" +
"</ul>")
  reactHTMLEqual(w.render("nums", ["2"], {choices: [[1, 1], [2, 2], [3, 3]]}),
"<ul>" +
"<li><label><input type=\"checkbox\" name=\"nums\" value=\"1\"/> 1</label></li>" +
"<li><label><input type=\"checkbox\" name=\"nums\" value=\"2\" checked=\"\"/> 2</label></li>" +
"<li><label><input type=\"checkbox\" name=\"nums\" value=\"3\"/> 3</label></li>" +
"</ul>")
  reactHTMLEqual(w.render("nums", [2], {choices: [[1, 1], [2, 2], [3, 3]]}),
"<ul>" +
"<li><label><input type=\"checkbox\" name=\"nums\" value=\"1\"/> 1</label></li>" +
"<li><label><input type=\"checkbox\" name=\"nums\" value=\"2\" checked=\"\"/> 2</label></li>" +
"<li><label><input type=\"checkbox\" name=\"nums\" value=\"3\"/> 3</label></li>" +
"</ul>")

  // You can also pass 'choices' to the constructor
  w = forms.CheckboxSelectMultiple({choices: [[1, 1], [2, 2], [3, 3]]})
  reactHTMLEqual(w.render("nums", [2]),
"<ul>" +
"<li><label><input type=\"checkbox\" name=\"nums\" value=\"1\"/> 1</label></li>" +
"<li><label><input type=\"checkbox\" name=\"nums\" value=\"2\" checked=\"\"/> 2</label></li>" +
"<li><label><input type=\"checkbox\" name=\"nums\" value=\"3\"/> 3</label></li>" +
"</ul>")

  // If 'choices' is passed to both the constructor and render(), then they'll both be in the output
  reactHTMLEqual(w.render("nums", [2], {choices: [[4, 4], [5, 5]]}),
"<ul>" +
"<li><label><input type=\"checkbox\" name=\"nums\" value=\"1\"/> 1</label></li>" +
"<li><label><input type=\"checkbox\" name=\"nums\" value=\"2\" checked=\"\"/> 2</label></li>" +
"<li><label><input type=\"checkbox\" name=\"nums\" value=\"3\"/> 3</label></li>" +
"<li><label><input type=\"checkbox\" name=\"nums\" value=\"4\"/> 4</label></li>" +
"<li><label><input type=\"checkbox\" name=\"nums\" value=\"5\"/> 5</label></li>" +
"</ul>")

  // Choices are escaped correctly
  reactHTMLEqual(w.render("escape", null, {choices: [["bad", "you & me"]]}),
"<ul>" +
"<li><label><input type=\"checkbox\" name=\"escape\" value=\"1\"/> 1</label></li>" +
"<li><label><input type=\"checkbox\" name=\"escape\" value=\"2\"/> 2</label></li>" +
"<li><label><input type=\"checkbox\" name=\"escape\" value=\"3\"/> 3</label></li>" +
"<li><label><input type=\"checkbox\" name=\"escape\" value=\"bad\"/> you &amp; me</label></li>" +
"</ul>")

  // Each input gets a separate ID
  w = forms.CheckboxSelectMultiple()
  reactHTMLEqual(w.render.bind(w, 'letters', ['a', 'c'], {
    choices: [['a', 'A'], ['b', 'B'], ['c', 'C']]
  , attrs: {id: 'abc'}
  }),
"<ul id=\"abc\">" +
"<li><label for=\"abc_0\"><input id=\"abc_0\" type=\"checkbox\" name=\"letters\" value=\"a\" checked=\"\"/> A</label></li>" +
"<li><label for=\"abc_1\"><input id=\"abc_1\" type=\"checkbox\" name=\"letters\" value=\"b\"/> B</label></li>" +
"<li><label for=\"abc_2\"><input id=\"abc_2\" type=\"checkbox\" name=\"letters\" value=\"c\" checked=\"\"/> C</label></li>" +
"</ul>")

  // Each input gets a separate ID when the ID is passed to the constructor
  w = forms.CheckboxSelectMultiple({attrs: {id: 'abc'}})
  reactHTMLEqual(w.render.bind(w, 'letters', ['a', 'c'], {
    choices: [['a', 'A'], ['b', 'B'], ['c', 'C']]
  }),
"<ul id=\"abc\">" +
"<li><label for=\"abc_0\"><input id=\"abc_0\" type=\"checkbox\" name=\"letters\" value=\"a\" checked=\"\"/> A</label></li>" +
"<li><label for=\"abc_1\"><input id=\"abc_1\" type=\"checkbox\" name=\"letters\" value=\"b\"/> B</label></li>" +
"<li><label for=\"abc_2\"><input id=\"abc_2\" type=\"checkbox\" name=\"letters\" value=\"c\" checked=\"\"/> C</label></li>" +
"</ul>")

  w = forms.CheckboxSelectMultiple()
  var r = w.getRenderer("abc", "b", {choices:[['a', 'A'], ['b', 'B'], ['c', 'C']]})
  // You can access elements of a CheckboxFieldRenderer
  reactHTMLEqual(r.choiceInputs().map(function(input) { return input.render() }),
"<label><input type=\"checkbox\" name=\"abc\" value=\"a\"/> A</label>" +
"<label><input type=\"checkbox\" name=\"abc\" value=\"b\" checked=\"\"/> B</label>" +
"<label><input type=\"checkbox\" name=\"abc\" value=\"c\"/> C</label>")
  // You can access individual elements
  reactHTMLEqual(r.choiceInput(1).render(), "<label><input type=\"checkbox\" name=\"abc\" value=\"b\" checked=\"\"/> B</label>")
  throws(function() { r.choiceInput(10) })
})

QUnit.test("Subwidget", 3, function() {
  // Each subwidget tag gets a separate ID when the widget has an ID specified
  var w = forms.CheckboxSelectMultiple({attrs: {id: 'abc'}})
  var subWidgets = w.subWidgets("letters", ['a', 'c'], {choices:[['a', 'A'], ['b', 'B'], ['c', 'C']]})
  reactHTMLEqual(function() { return subWidgets.map(function(s) { return s.tag() }) },
"<input id=\"abc_0\" type=\"checkbox\" name=\"letters\" value=\"a\" checked=\"\"/>" +
"<input id=\"abc_1\" type=\"checkbox\" name=\"letters\" value=\"b\"/>" +
"<input id=\"abc_2\" type=\"checkbox\" name=\"letters\" value=\"c\" checked=\"\"/>")

  // Each subwidget tag does not get an ID if the widget does not have an ID specified
  w = forms.CheckboxSelectMultiple()
  subWidgets = w.subWidgets("letters", ['a', 'c'], {choices:[['a', 'A'], ['b', 'B'], ['c', 'C']]})
  reactHTMLEqual(function() { return subWidgets.map(function(s) { return s.tag() }) },
"<input type=\"checkbox\" name=\"letters\" value=\"a\" checked=\"\"/>" +
"<input type=\"checkbox\" name=\"letters\" value=\"b\"/>" +
"<input type=\"checkbox\" name=\"letters\" value=\"c\" checked=\"\"/>")

  // The idForLabel method of the subwidget should return the ID that is used on
  // the subwidget's tag.
  w = forms.CheckboxSelectMultiple({attrs: {id: 'abc'}})
  subWidgets = w.subWidgets("letters", [], {choices:[['a', 'A'], ['b', 'B'], ['c', 'C']]})
  equal(subWidgets.map(function(s) { return s.choiceValue + ' ' + s.idForLabel() }).join(''),
"a abc_0" +
"b abc_1" +
"c abc_2")
})

QUnit.test("MultiWidget", 6, function() {
  var MyMultiWidget = forms.MultiWidget.extend()
  MyMultiWidget.prototype.decompress = function(value) {
    if (value) {
      return value.split("__")
    }
    return ["", ""]
  }

  var w = new MyMultiWidget([forms.TextInput({attrs: {"className": "big"}}), forms.TextInput({attrs: {"className": "small"}})])
  reactHTMLEqual(w.render("name", ["john", "lennon"]),
        "<div><input class=\"big\" type=\"text\" name=\"name_0\" data-newforms-field=\"name\" value=\"john\"/><input class=\"small\" type=\"text\" name=\"name_1\" data-newforms-field=\"name\" value=\"lennon\"/></div>")
  reactHTMLEqual(w.render("name", "john__lennon"),
        "<div><input class=\"big\" type=\"text\" name=\"name_0\" data-newforms-field=\"name\" value=\"john\"/><input class=\"small\" type=\"text\" name=\"name_1\" data-newforms-field=\"name\" value=\"lennon\"/></div>")
  reactHTMLEqual(w.render.bind(w, "name", "john__lennon", {attrs: {id: "foo"}}),
        "<div><input class=\"big\" type=\"text\" name=\"name_0\" data-newforms-field=\"name\" id=\"foo_0\" value=\"john\"/><input class=\"small\" type=\"text\" name=\"name_1\" data-newforms-field=\"name\" id=\"foo_1\" value=\"lennon\"/></div>")

  w = new MyMultiWidget([forms.TextInput({attrs: {"className": "big"}}), forms.TextInput({attrs: {"className": "small"}})], {attrs: {id: "bar"}})
  reactHTMLEqual(w.render.bind(w, "name", ["john", "lennon"]),
        "<div><input class=\"big\" type=\"text\" name=\"name_0\" id=\"bar_0\" data-newforms-field=\"name\" value=\"john\"/><input class=\"small\" type=\"text\" name=\"name_1\" id=\"bar_1\" data-newforms-field=\"name\" value=\"lennon\"/></div>")

  // Test needsMultipartForm if any widget needs it
  w = new MyMultiWidget([forms.TextInput(), forms.FileInput()])
  strictEqual(w.needsMultipartForm, true)
  // Test needsMultipartForm if no widget needs it
  w = new MyMultiWidget([forms.TextInput(), forms.TextInput()])
  strictEqual(w.needsMultipartForm, false)
})

QUnit.test("SplitDateTimeWidget", 9, function() {
  var w = forms.SplitDateTimeWidget()
  reactHTMLEqual(w.render("date", ""),
        "<div><input type=\"text\" name=\"date_0\" data-newforms-field=\"date\"/><input type=\"text\" name=\"date_1\" data-newforms-field=\"date\"/></div>")
  reactHTMLEqual(w.render("date", new Date(2006, 0, 10, 7, 30)),
        "<div><input type=\"text\" name=\"date_0\" data-newforms-field=\"date\" value=\"2006-01-10\"/><input type=\"text\" name=\"date_1\" data-newforms-field=\"date\" value=\"07:30:00\"/></div>")
  reactHTMLEqual(w.render("date", [new Date(2006, 0, 10), new Date(1900, 0, 1, 7, 30)]),
        "<div><input type=\"text\" name=\"date_0\" data-newforms-field=\"date\" value=\"2006-01-10\"/><input type=\"text\" name=\"date_1\" data-newforms-field=\"date\" value=\"07:30:00\"/></div>")

  // You can also pass "attrs" to the constructor. In this case, the attrs
  // will be included on both widgets.
  w = forms.SplitDateTimeWidget({attrs: {"className": "pretty"}})
  reactHTMLEqual(w.render("date", new Date(2006, 0, 10, 7, 30)),
        "<div><input class=\"pretty\" type=\"text\" name=\"date_0\" data-newforms-field=\"date\" value=\"2006-01-10\"/><input class=\"pretty\" type=\"text\" name=\"date_1\" data-newforms-field=\"date\" value=\"07:30:00\"/></div>")

  // Use "dateFormat" and "timeFormat" to change the way a value is displayed
  w = forms.SplitDateTimeWidget({dateFormat: "%d/%m/%Y", timeFormat: "%H:%M"})
  reactHTMLEqual(w.render("date", new Date(2006, 0, 10, 7, 30)),
        "<div><input type=\"text\" name=\"date_0\" data-newforms-field=\"date\" value=\"10/01/2006\"/><input type=\"text\" name=\"date_1\" data-newforms-field=\"date\" value=\"07:30\"/></div>")

  // Django #13390  - SplitDateTimeWidget should recognise when it's no
  // longer required.
  var SplitDateForm = forms.Form.extend({
    field: forms.DateTimeField({required: false, widget: forms.SplitDateTimeWidget})
  })
  var f = new SplitDateForm({data: {field: ""}})
  strictEqual(f.isValid(), true)
  f = new SplitDateForm({data: {field: ["", ""]}})
  strictEqual(f.isValid(), true)

  var SplitDateRequiredForm = forms.Form.extend({
    field: forms.DateTimeField({required: true, widget: forms.SplitDateTimeWidget})
  })
  f = new SplitDateRequiredForm({data: {field: ""}})
  strictEqual(f.isValid(), false)
  f = new SplitDateRequiredForm({data: {field: ["", ""]}})
  strictEqual(f.isValid(), false)
})

QUnit.test("DateTimeInput", 4, function() {
  var w = forms.DateTimeInput()
  reactHTMLEqual(w.render("date", null),
        "<input type=\"text\" name=\"date\"/>")
  var d = new Date(2007, 8, 17, 12, 51, 34)

  reactHTMLEqual(w.render("date", d),
        "<input type=\"text\" name=\"date\" value=\"2007-09-17 12:51:34\"/>")
  reactHTMLEqual(w.render("date", new Date(2007, 8, 17, 12, 51)),
        "<input type=\"text\" name=\"date\" value=\"2007-09-17 12:51:00\"/>")

  // Use "format" to change the way a value is displayed
  w = forms.DateTimeInput({format: "%d/%m/%Y %H:%M", attrs: {type: "datetime"}})
  reactHTMLEqual(w.render("date", d),
        "<input type=\"datetime\" name=\"date\" value=\"17/09/2007 12:51\"/>")
})

QUnit.test("DateInput", 4, function() {
  var w = forms.DateInput()
  reactHTMLEqual(w.render("date", null),
        "<input type=\"text\" name=\"date\"/>")
  var d = new Date(2007, 8, 17)

  reactHTMLEqual(w.render("date", d),
        "<input type=\"text\" name=\"date\" value=\"2007-09-17\"/>")

  // We should be able to initialise from a String
  reactHTMLEqual(w.render("date", "2007-09-17"),
        "<input type=\"text\" name=\"date\" value=\"2007-09-17\"/>")

  // Use "format" to change the way a value is displayed
  w = forms.DateInput({format: "%d/%m/%Y", attrs: {type: "date"}})
  reactHTMLEqual(w.render("date", d),
        "<input type=\"date\" name=\"date\" value=\"17/09/2007\"/>")
})

QUnit.test("TimeInput", 5, function() {
  var w = forms.TimeInput()
  reactHTMLEqual(w.render("time", null),
        "<input type=\"text\" name=\"time\"/>")
  var t = new Date(1900, 0, 1, 12, 51, 34)

  reactHTMLEqual(w.render("time", t),
        "<input type=\"text\" name=\"time\" value=\"12:51:34\"/>")
  reactHTMLEqual(w.render("time", new Date(1900, 0, 1, 12, 51)),
        "<input type=\"text\" name=\"time\" value=\"12:51:00\"/>")

  // We should be able to initialise from a String
  reactHTMLEqual(w.render("time", "13:12:11"),
        "<input type=\"text\" name=\"time\" value=\"13:12:11\"/>")

  // Use "format" to change the way a value is displayed
  w = forms.TimeInput({format: "%H:%M", attrs: {type: "time"}})
  reactHTMLEqual(w.render("time", t),
        "<input type=\"time\" name=\"time\" value=\"12:51\"/>")
})

QUnit.test("SplitHiddenDateTimeWidget", 3, function() {
  var w = forms.SplitHiddenDateTimeWidget()
  reactHTMLEqual(w.render("date", ""),
        "<div><input type=\"hidden\" name=\"date_0\" data-newforms-field=\"date\" value=\"\"/><input type=\"hidden\" name=\"date_1\" data-newforms-field=\"date\" value=\"\"/></div>")
  var d = new Date(2007, 8, 17, 12, 51, 34)
  reactHTMLEqual(w.render("date", d),
        "<div><input type=\"hidden\" name=\"date_0\" data-newforms-field=\"date\" value=\"2007-09-17\"/><input type=\"hidden\" name=\"date_1\" data-newforms-field=\"date\" value=\"12:51:34\"/></div>")
  reactHTMLEqual(w.render("date", new Date(2007, 8, 17, 12, 51)),
        "<div><input type=\"hidden\" name=\"date_0\" data-newforms-field=\"date\" value=\"2007-09-17\"/><input type=\"hidden\" name=\"date_1\" data-newforms-field=\"date\" value=\"12:51:00\"/></div>")
})

QUnit.test("ClearableFileInput", 5, function() {
  // Quacks like a FieldFile (has a .url and string representation), but
  // doesn't require us to care about anything else.
  var FakeFieldFile = function() { this.url = "something"; }
  FakeFieldFile.prototype.toString = function() { return this.url;}

  // Clear input renders
  var w = forms.ClearableFileInput()
  w.isRequired = false
  reactHTMLEqual(w.render.bind(w, "myfile", new FakeFieldFile()),
"<span>Currently: <a href=\"something\">something</a> <input type=\"checkbox\" name=\"myfile-clear\" id=\"myfile-clear_id\"/> <label for=\"myfile-clear_id\">Clear</label><br/>Change: <input type=\"file\" name=\"myfile\"/></span>")

  // A ClearableFileInput should escape name, filename and URL when rendering
  // HTML.
  var StrangeFieldFile = function() { this.url = "something?chapter=1&sect=2&copy=3&lang=en"; }
  StrangeFieldFile.prototype.toString = function() { return "something<div onclick=\"alert('oops')\">.jpg"; }
  var file = new StrangeFieldFile()
  reactHTMLEqual(w.render.bind(w, "my<div>file", file),
"<span>Currently: <a href=\"something?chapter=1&amp;sect=2&amp;copy=3&amp;lang=en\">something&lt;div onclick=&quot;alert(&#x27;oops&#x27;)&quot;&gt;.jpg</a> <input type=\"checkbox\" name=\"my&lt;div&gt;file-clear\" id=\"my&lt;div&gt;file-clear_id\"/> <label for=\"my&lt;div&gt;file-clear_id\">Clear</label><br/>Change: <input type=\"file\" name=\"my&lt;div&gt;file\"/></span>")

  // A ClearableFileInput instantiated with no initial value does not render
  // a clear checkbox.
  reactHTMLEqual(w.render("myfile", null),
"<span><input type=\"file\" name=\"myfile\"/></span>")

  // ClearableFileInput.valueFromData returns false if the clear checkbox is
  // checked, if not required.
  strictEqual(w.valueFromData({"myfile-clear": true}, {}, "myfile"),
              false)

  w.isRequired = true

  // A ClearableFileInput with isRequired=True does not render a clear
  // checkbox.
  reactHTMLEqual(w.render("myfile", new FakeFieldFile()),
"<span>Currently: <a href=\"something\">something</a> <br/>Change: <input type=\"file\" name=\"myfile\"/></span>")
})
