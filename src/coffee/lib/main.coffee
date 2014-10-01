# vim: set et sw=4 ts=4 :
program = require "commander"
colors = require "colors"
pkg = require "../package.json"
path = require "path-extra"
cli = require "./cli"
seraphim = require "seraphim"
app = null

datadir = path.datadir pkg.name 
default_config = path.join datadir, "settings.json"
vault = seraphim.createVault()

program
    .version(pkg.version)
    .option "-c, --config [filename]", "set config filename."

program
    .command "user <user>"
    .description "show information about a user"
    .action (u, p) -> vault.on "end", cli.print_user u

program
    .command "conversations <user>"
    .description "show user's conversations"
    .action (u, p) -> vault.on "end", cli.print_convos u

program
    .command "conversation <id>"
    .description "show a conversation"
    .action (id, p) -> vault.on "end", cli.print_conversation id

program.on "--help", ->
    console.log "  Examples:"
    console.log ""
    console.log "    $ #{ pkg.name } user user@domain.com"
    return

program.parse process.argv

vault.on "error", cli.print_error
config = program.config or process.env['NODECOM_CONFIG'] or default_config
vault.load config
