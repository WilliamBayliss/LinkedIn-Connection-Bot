# LinkedIn-Connection-Bot
A simple node script with puppeteer that looks up a person on linked in and sends them a connection request

The script takes two command line arguments for first and last name, logs into LinkedIn with the session cookie in .env and searches the given name.
It will click the 'view full profile' button on the first search result, send that person a connection request with no message, wait a spell and then exit the browser.

usage: $ node request_bot.js first_name last_name

Built to learn some browser automation with JavaScript and Puppeteer


known bugs: if a person is not close enough for LinkedIn to highlight their profile with a larger card and the primary styled full profile button it will raise an error and exit.
                - TODO: find first search result with secondary styled connect button and send request and exit if this occurs.
                - TODO: add a personalized message
