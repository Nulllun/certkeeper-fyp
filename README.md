# CSFYP_CertKEEPer

The Chinese University of Hong Kong

Department of Computer Science and Engineering

Final Year Project 2019-2020

Group: IK1901

## Prerequisites:
Follow the instruction on this link and install the prerequisities:  
https://hyperledger-fabric.readthedocs.io/en/release-2.0/prereqs.html

## To start: 

```
git clone git@github.com:Nulllun/CSFYP_CertKEEPer.git

// To start the Hyperledger Fabric
cd hyperledger/test-network
./network.sh up createChannel -ca -s couchdb
./network.sh deployCC

(The front end is not ready, use Postman to test the API if needed)
// To start the front end
cd certkeeper
npm install
npm start

// To start the API server
cd certkeeper-api
npm install
node enrollAdmin_new.js
npm start
```