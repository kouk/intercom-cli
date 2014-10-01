colors = require "colors"
pkg = require "../package.json"
prettyjson = require "prettyjson"
intercom = require "walkie-talkie"
	
exports.print = print = (options) ->
	if options and options.message and typeof(options.message) is 'string'
		console.log "[", pkg.name.white, "]", options.message.toString().cyan
	else
		throw new Error 'no message defined to print!'

exports.print_error = print_error = (e) ->
    console.log "[", "error".red, "]", e.toString().red

intercom_response = (code, body) ->
    console.log "[", pkg.name.white, "]", code.toString().cyan
    console.log "[", pkg.name.white, "]", prettyjson.render body

intercom_response_json = (code, body) ->
    intercom_response code, JSON.parse body

exports.print_user = print_user = (email) -> (config) ->
    app = intercom.app config.intercom_settings
    app.users.get email, intercom_response_json

list_conversations = (code, conversations) ->
   console.log "[", pkg.name.white, "] ID:", c.id, ", SUBJECT:", c.conversation_message.subject for c in conversations

list_conversation_parts = (code, body) ->
   c = JSON.parse body
   console.log "[", pkg.name.white, "] ", c.conversation_message.author, c.conversation_message.body
   console.log "[", pkg.name.white, "] ", p.author, p.body for p in c.conversation_parts.conversation_parts

exports.print_convos = print_convos = (email) -> (config) ->
    app = intercom.app config.intercom_settings
    app.conversations.user email, list_conversations

exports.print_conversation = print_conversation = (id) -> (config) ->
    app = intercom.app config.intercom_settings
    app.conversations.get id, list_conversation_parts
