intercom-cli
============

a simple node command line interface application for interacting with [intercom.io](http://intercom.io).

###to get up and running

* clone the repo

		git clone https://github.com/kouk/intercom-cli.git
    
* install the dependencies

		cd intercom-cli
		npm install
    
* make the file executable

		chmod u+x bin/intercom

* add your [intercom API credentials](http://docs.intercom.io/api) to `~/.config/intercom-cli/settings.json`:

        {
          "intercom_settings": {
            "api_key": "ro-203984098a09dff098da0980d9809e098df",
            "app_id": "aoijdfoi43"
          }
        }
    
* run the app with `-h` to see options:

		./bin/intercom
        Usage: intercom [options] [command]

        Commands:

          user <user>
             show information about a user
          
          conversations <user>
             show user's conversations
          
          conversation <id>
             show a conversation
          

        Options:

          -h, --help               output usage information
          -V, --version            output the version number
          -c, --config [filename]  set config filename.

        Examples:

          $ intercom-cli user user@domain.com

    
* start hacking!
* run tests with

		make test


###any problems?
contact me, I'll be happy to help you out. Tweet me at __@koukopoulos


@koukopoulos
