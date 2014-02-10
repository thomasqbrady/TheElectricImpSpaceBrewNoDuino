# _The Electric Impspacebrewnoduino_

_Description: A simple example application that demos how to use [The Electric Imp](http://electricimp.com), and Arduino, [Spacebrew](http://docs.spacebrew.cc) and Node.js to build a multi-use sensor_

## What does it do?

This is an example application that demos how to:

1. Use an Arduino to power a proximity sensor as a motion detector, and, when it sees motion, send a command over serial to an
2. Electric Imp, which throws an event over the Internet to
3. Electric Imp's cloud service, which we've configured to exposes an API that rolls up and reports these events upon HTTP GET, which
4. Our Node.js server polls, and upon finding new events, acts by both
5. Writing a record to a mongoDB and
6. Forwarding the event to
7. Spacebrew

Up to this point we have built a Spacebrew publisher, that happens to also persist data (something not typically included in Spacebrew).

We have also included an example Spacebrew subscriber, in the form of a web app that uses the Spacebrew javascript API in order to increment a count of movements observed. Our web app first polls our Node app to get a historical count for the day, and the timestamp of that last movement. The real-time Spacebrew updates then increment this historical count, and reset the last-movement-seen clock.

## Hardware used

I used:

* $5: [Arduino Pro Mini 5v 16MHz](http://www.amazon.com/gp/product/B00CERRT7O/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B00CERRT7O&linkCode=as2&tag=tum0a8-20) for the size, but you could use any Arduino

* $29: [Electric Imp](http://www.amazon.com/gp/product/B009K2ILKK/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B009K2ILKK&linkCode=as2&tag=tum0a8-20)—You'll also probably need a breakout board for your Imp.

* $10 or $20: I used the small [April](http://www.amazon.com/gp/product/B009K2KVU8/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B009K2KVU8&linkCode=as2&tag=tum0a8-20) breakout board, but there's also an [Arduino Shield](http://www.amazon.com/gp/product/B009K2JWH6/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B009K2JWH6&linkCode=as2&tag=tum0a8-20)

* $7: [Proximity Sensor](http://www.amazon.com/gp/product/B004U8TOE6/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B004U8TOE6&linkCode=as2&tag=tum0a8-20)

* $10: And you might want a [project box](http://www.amazon.com/gp/product/B00CSRW6UU/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B00CSRW6UU&linkCode=as2&tag=tum0a8-20)

* $6: [some jumpers](http://www.amazon.com/gp/product/B0040DEI9M/ref=as_li_ss_tl?ie=UTF8&camp=1789&creative=390957&creativeASIN=B0040DEI9M&linkCode=as2&tag=tum0a8-20)

All told, this is about $70.

## Software Dependencies

You'll need to have, and know your way around:

* [The Arduino IDE](http://arduino.cc/en/main/software)
* [Node.js and NPM](http://nodejs.org)—I recommend installing via [Homebrew](http://brew.sh) if you're on a Mac
* [mongoDB](http://www.mongodb.com)—again, install with Homebrew if you can
* Some sort of HTTP server. I set one up that listened on port 80. If that doesn't mean anything to you, try [using the Apache server built into OS X](http://brianflove.com/2013/10/23/os-x-mavericks-and-apache/) if you're on a Mac.

## Installation

1. You'll first need mongoDB and Node up and running. Again, if you're on a Mac, I recommend using Homebrew to get that far.
2. Start mongoDB, whichever way you choose (see documentation accompanying whichever method you used to install)
3. Start Spacebrew ([instructions](https://github.com/Spacebrew/spacebrew))
4. Start app.js in the elevator-subscribe folder
5. Start up your web server.
6. Pull up [the Spacebrew admin](http://spacebrew.github.io/spacebrew/admin/admin.html?server=localhost) and connect your publisher and subscriber

Keep in mind, I have used localhost all over the place here. If you want to be able to access this from other clients, you'll want to use an IP address or hostname that works on your network.

## License

As you wish.