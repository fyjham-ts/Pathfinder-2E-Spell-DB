# Pathfinder 2E Spell DB

This was created for my own personal use - if you have some fun with it that's great!

It allows you to search & find spells and powers across different classes quickly and easily.

# But how do I use it?

For android users, download the app from [Google Play](https://play.google.com/store/apps/details?id=com.fyjham_ts.pathfinder_2e_spell_db).

For iOS/Windows user (And I guess android users who don't like apps) I've got it up as a [offline-capable website](https://fyjham-ts.github.io/Pathfinder-2E-Spell-DB). What this means is once you visit that URL, you'll be able to bookmark it and open it even if you have no internet connection!

# Credit
[Paizo](http://www.paizo.com) as the makers of Pathfinder are ultimately the source of all the information in this application.

Also used a lot of tech libraries to make this work. I believe all remaining ones exist as node dependencies. Too many to list, but they're all in packages.json.

# I'm a developer

## How do I get a build environment set up?

I'm running in Visual Studio 2017 with the Apache Cordova plugins, but realistically I don't think that's critical. Get NPM running to load the packages, then you'll find the node commands for separate parts of the build in the package.json. A build is as defined in the "BeforeBuild" in -vs-binding. After this you'll just want to serve up the "www" folder via a webserver & you'll be able to test.

Use your choice of web server. The following commands have been contributed for running this with other toolsets:

**Python 2**
```
$ cd SpellDB
$ npm run build:js
$ cd www
$ python -m SimpleHTTPServer 8001
```

**Python 3**
```
$ cd SpellDB
$ npm run build:js
$ cd www
$ python -m http.server 8001
```

I recommend using "nocache.html" for local dev to save yourself having to clear cache - it's exactly the same as `index.html` but should update on refresh. If you end up getting a cached version then using chrome://appcache-internals to delete your offline cache or running build:manifest to generate a new manifest checksum is the way to get around it.

The final android build happens via PhoneGap Build pulling from this repo.

## Can I use the data?

I'm all for it! Make sure you have the appropriate OGL & Community use licensing in place because it's ultimately Paizo's data so you have to play by their rules (just like me) but I'm more than happy to have others build on top of the data I've collected. If you do use the data I'd love to hear about your project - as if it's good I'll proabably want to use it too!

As a help searching the repository, the app's reference data is all stored in the [/SpellDb/src/data](https://github.com/fyjham-ts/Pathfinder-2E-Spell-DB/tree/master/SpellDB/src/data]/SpellDb/src/data) folder.

The data is all in JSON format, which is a fairly widely used format & should be possible to load into many systems - including spreadsheet tools like Excel or Google Sheets. Some quick googling on loading JSON into your system of choice should hopefully serve you well.

Also if you're looking for pathfinder data you may want to check our [pathfinder-2-sqlite](https://gitlab.com/jrmiller82/pathfinder-2-sqlite) - found out about it as it incorporated some of my spell data, but they're aiming for more of a collated data set that other apps can use & a more structured SQLite format. If you're after data similar to what this app has you may find more there!

# Licensing?
I'm not a lawyer, I'm acting on a belief the data itself is licensed under the OGL (See license).

Anything that I have the rights to (presumably some of my code) I'm happy to offer under the MIT license, but I don't want to work out where that line goes.

If anyone from Paizo is looking I hope you don't mind. I believe I'm within the bounds of the OGL & community use licenses. Any request from Paizo regarding the usage of their content (up to and including removing this app) I'll comply with - even if it's not legally binding.

# Community Use
*This website and application uses trademarks and/or copyrights owned by Paizo Inc., which are used under Paizo's Community Use Policy. We are expressly prohibited from charging you to use or access this content. This website and application is not published, endorsed, or specifically approved by Paizo Inc. For more information about Paizo's Community Use Policy, please visit paizo.com/communityuse. For more information about Paizo Inc. and Paizo products, please visit paizo.com*
