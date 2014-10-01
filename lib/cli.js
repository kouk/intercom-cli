(function() {
  var colors, intercom, intercom_response, intercom_response_json, list_conversation_parts, list_conversations, pkg, prettyjson, print, print_conversation, print_convos, print_error, print_user;

  colors = require("colors");

  pkg = require("../package.json");

  prettyjson = require("prettyjson");

  intercom = require("walkie-talkie");

  exports.print = print = function(options) {
    if (options && options.message && typeof options.message === 'string') {
      return console.log("[", pkg.name.white, "]", options.message.toString().cyan);
    } else {
      throw new Error('no message defined to print!');
    }
  };

  exports.print_error = print_error = function(e) {
    return console.log("[", "error".red, "]", e.toString().red);
  };

  intercom_response = function(code, body) {
    console.log("[", pkg.name.white, "]", code.toString().cyan);
    return console.log("[", pkg.name.white, "]", prettyjson.render(body));
  };

  intercom_response_json = function(code, body) {
    return intercom_response(code, JSON.parse(body));
  };

  exports.print_user = print_user = function(email) {
    return function(config) {
      var app;
      app = intercom.app(config.intercom_settings);
      return app.users.get(email, intercom_response_json);
    };
  };

  list_conversations = function(code, conversations) {
    var c, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = conversations.length; _i < _len; _i++) {
      c = conversations[_i];
      _results.push(console.log("[", pkg.name.white, "] ID:", c.id, ", SUBJECT:", c.conversation_message.subject));
    }
    return _results;
  };

  list_conversation_parts = function(code, body) {
    var c, p, _i, _len, _ref, _results;
    c = JSON.parse(body);
    console.log("[", pkg.name.white, "] ", c.conversation_message.author, c.conversation_message.body);
    _ref = c.conversation_parts.conversation_parts;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      p = _ref[_i];
      _results.push(console.log("[", pkg.name.white, "] ", p.author, p.body));
    }
    return _results;
  };

  exports.print_convos = print_convos = function(email) {
    return function(config) {
      var app;
      app = intercom.app(config.intercom_settings);
      return app.conversations.user(email, list_conversations);
    };
  };

  exports.print_conversation = print_conversation = function(id) {
    return function(config) {
      var app;
      app = intercom.app(config.intercom_settings);
      return app.conversations.get(id, list_conversation_parts);
    };
  };

}).call(this);
