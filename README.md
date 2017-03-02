# Platypus Documentation (Draft)

#### HBS Admin App Dev UI/UX Framework

## Installation
1) Clone repo and install dependecies:
```shell
git clone https://github.com/HBSAWS/platypus
cd platypus && sudo npm install
```

## Running the App
Go to [http://localhost:3000](http://localhost:3000)

**TODO**: Import db dump

## Testing
Platypus is setup to use Selenium 2.5.3 for end-to-end testing. The standalone version of Selenium will be automatically downloaded and installed during the node package installation. 

#### Runnings tests:
```shell
gulp nightwatch:<<browser>> 
```
Available browsers: 'chrome', 'safari'*

* Safari requires this [browser extension](http://selenium-release.storage.googleapis.com/index.html?path=2.48/)

## Questions?
Contact [Rob Silva](mailto:rsilva@hbs.edu)  



