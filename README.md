# DNN Puppeteer Demo

These node scripts use [Puppeteer](https://github.com/GoogleChrome/puppeteer) (library to
drive headless Chrome) to control DNN. The goal of this project is to test how we could
abstract common operations in DNN. Ultimately it serves to see if automated browser testing
is realistic for DNN.

Note: Puppeteer downloads its own copy of Chrome so sit back and relax during npm install as
it sucks in roughly 150 megs of Chrome.

## Manual

Run `node test.js` to run the test script. Check your url and host password. This script now
creates 4 test users.

