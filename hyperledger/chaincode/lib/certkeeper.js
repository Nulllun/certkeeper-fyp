'use strict';

const { Contract } = require('fabric-contract-api');

class CertKeeper extends Contract {

    async initLedger(ctx){
        // generate certificates for testing
        const certs = [
            {
                recipientID: 'CERT-testID',
                courseTitle: 'testCourseTitle',
                grade: 'testGrade',
            },
        ];

        for (let i = 0; i < certs.length ; i++){
            certs[i].docType = "CERT";
            await ctx.stub.putState(certs[i].certID, Buffer.from(JSON.stringify(certs[i])));
        }

    }

    async queryCert(ctx, certID){
        const certAsBytes = await ctx.stub.getState(certID);
        if (!certAsBytes || certAsBytes.length === 0) {
            throw new Error(`${certID} does not exist`);
        }
        console.log(certAsBytes.toString());
        let cert = JSON.parse(certAsBytes.toString());
        cert.certID = certID;
        return JSON.stringify(cert);
    }

    async queryCertByString(ctx, query){
        const iterator = await ctx.stub.getQueryResult(query);
        const allResults = [];
        while (true) {
            const res = await iterator.next();

            if (res.value && res.value.value.toString()) {
                console.log(res.value.value.toString('utf8'));

                let Record;
                try {
                    Record = JSON.parse(res.value.value.toString('utf8'));
                } catch (err) {
                    console.log(err);
                    Record = res.value.value.toString('utf8');
                }
                Record.certID = res.value.key;
                allResults.push(Record);
            }
            if (res.done) {
                await iterator.close();
                return JSON.stringify(allResults);
            }
        }
    }

    async issueCert(ctx, certStr){
        let cert = JSON.parse(certStr);
        cert.docType = 'CERT';
        await ctx.stub.putState(cert.certID, Buffer.from(JSON.stringify(cert)));
    }

    async signCert(ctx, certID, signature){
        var cert = await ctx.stub.getState(certID);
        if(cert.signature == ''){
            cert.signature = signature;
            await ctx.stub.putState(certID, Buffer.from(JSON.stringify(cert)));
        }
    }

    async deleteCert(ctx, certID){
        await ctx.stub.deleteState(certID);
    }

    async insertPubKey(ctx, userID, publicKey){
        const turple = {
            userID: userID,
            publicKey: publicKey,
            docType: "PUBKEY"
        }
        await ctx.stub.putState("PUBKEY-" + turple.userID, Buffer.from(JSON.stringify(turple)));
    }

    async queryPubKey(ctx, userID){
        const publicKey = await ctx.stub.getState("PUBKEY-" + userID);
        if (!publicKey || publicKey.length === 0) {
            throw new Error(`${userID} does not exist`);
        }
        return JSON.stringify({publicKey: publicKey});
    }

}

module.exports = CertKeeper;