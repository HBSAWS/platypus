# Platypus Documentation (Draft)

#### HBS Admin App Dev UI/UX Framework

## Installation
1) Clone repo and install dependecies:
```shell
git clone https://github.com/HBSAWS/platypus
cd platypus && sudo npm install
```

## Running the App
Start up the MongoDB process
```shell
sudo mongod  
```
Run Gulp
```shell
gulp  
```
Go to [http://localhost:3000](http://localhost:3000)

**TODO**: Import db dump

## Building
TODO

## Testing
Platypus is setup to use Selenium 2.5.3 for end-to-end testing. The standalone version of Selenium will be automatically downloaded and installed during the node package installation. 

#### Runnings tests:
```shell
gulp nightwatch:<<browser>> 
```
Available browsers: 'chrome', 'safari'*, 'ie'*

##### Safari Setup:
* Safari requires this [browser extension](http://selenium-release.storage.googleapis.com/index.html?path=2.48/)

##### IE Setup:
* Download the 32bit (not 64, [why?](https://github.com/seleniumhq/selenium-google-code-issue-archive/issues/5116)) driver [here](http://selenium-release.storage.googleapis.com/index.html?path=2.48/)
* Unzip and save the executable as ./node_modules/nightwatch/bin/IEDriverServer.exe

Then, open IE and set "Protected Mode" ON for all zones:
* Go to Tools > Internet Options > Security
* Set all zones (Internet, Local intranet, Trusted sites, Restricted sites) to the same protected mode, enabled or disabled should not matter.
* Finally, set Zoom level to 100% by right clicking on the gear located at the top right corner and enabling the status-bar. Default zoom level is now displayed at the lower right.

## Versioning
To set the default version of documentation, simply change the local variable 'current' in /config/config.js
```javascript
res.locals.current = "0.1";
```
Versioning documents:
```javascript
[GET] /articles/set/:ver // Sets initial version on (all documents)
[GET] /articles/del/:ver // Deletes all documents with specific version
[GET] /articles/cp/:from/:to // copy all documents matching :from, updating version tag to :to
````

## Questions?
Contact [Rob Silva](mailto:rsilva@hbs.edu)  



