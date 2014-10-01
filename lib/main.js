(function() {
  var app, cli, colors, config, datadir, default_config, path, pkg, program, seraphim, vault;

  program = require("commander");

  colors = require("colors");

  pkg = require("../package.json");

  path = require("path-extra");

  cli = require("./cli");

  seraphim = require("seraphim");

  app = null;

  datadir = path.datadir(pkg.name);

  default_config = path.join(datadir, "settings.json");

  vault = seraphim.createVault();

  program.version(pkg.version).option("-c, --config [filename]", "set config filename.");

  program.command("user <user>").description("show information about a user").action(function(u, p) {
    return vault.on("end", cli.print_user(u));
  });

  program.command("conversations <user>").description("show user's conversations").action(function(u, p) {
    return vault.on("end", cli.print_convos(u));
  });

  program.command("conversation <id>").description("show a conversation").action(function(id, p) {
    return vault.on("end", cli.print_conversation(id));
  });

  program.on("--help", function() {
    console.log("  Examples:");
    console.log("");
    console.log("    $ " + pkg.name + " user user@domain.com");
  });

  program.parse(process.argv);

  vault.on("error", cli.print_error);

  config = program.config || process.env['NODECOM_CONFIG'] || default_config;

  vault.load(config);

}).call(this);
