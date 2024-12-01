const express = require('express');
const bodyParser = require('body-parser');
const {
    enrollAdmin,
    registerAndEnrollUser,
    buildCAClient,
} = require('../../../javascript/CAUtil');
const {
    buildCCPInsurance,
    buildCCPHospital,
    buildWallet,
} = require('../../../javascript/AppUtil');
const { Wallets } = require('fabric-network');
const FabricCAServices = require('fabric-ca-client');
const path = require('path');
// const cors = require("cors");
const router = express.Router();

const app = express();
app.use(bodyParser.json());
// app.use(cors());
const mspInsurance = 'InsuranceMSP';
const mspHospital = 'HospitalMSP';

async function connectToOrgCA(org, cnic = null) {
    let ccp, caClient, walletPath, wallet, msp;
    if (org === 'Insurance' || org === 'insurance') {
        ccp = buildCCPInsurance();
        caClient = buildCAClient(
            FabricCAServices,
            ccp,
            'ca.Insurance.example.com'
        );
        walletPath = path.join(__dirname, 'wallet/Insurance');
        wallet = await buildWallet(Wallets, walletPath);
        msp = mspInsurance;
    } else if (org === 'Hospital' || org === 'hospital') {
        ccp = buildCCPHospital();
        caClient = buildCAClient(
            FabricCAServices,
            ccp,
            'ca.Hospital.example.com'
        );
        walletPath = path.join(__dirname, 'wallet/Hospital');
        wallet = await buildWallet(Wallets, walletPath);
        msp = mspHospital;
    } else {
        throw new Error('Org must be Insurance or Hospital');
    }

    return { caClient, wallet, msp, cnic };
}

router.post('/enrollAdmin', async (req, res) => {
    const { org } = req.body;

    try {
        const { caClient, wallet, msp } = await connectToOrgCA(org);
        await enrollAdmin(caClient, wallet, msp);
        res.status(200).send(`Successfully enrolled admin for ${org}`);
    } catch (error) {
        res.status(500).send(
            `Failed to enroll admin for ${org}: ${error.message}`
        );
    }
});

router.post('/registerUser', async (req, res) => {
    const {
        org,
        userId,
        cnic,
        affiliation,
        attributes,
        user_password,
        user_name,
    } = req.body;

    try {
        const { caClient, wallet, msp } = await connectToOrgCA(org, cnic);
        await registerAndEnrollUser(
            caClient,
            org,
            wallet,
            msp,
            userId,
            cnic,
            affiliation,
            attributes,
            user_password,
            user_name
        );
        res.status(200).send(
            `Successfully registered and enrolled user ${userId} for ${org}`
        );
    } catch (error) {
        res.status(500).send(
            `Failed to register and enroll user ${userId} for ${org}: ${error.message}`
        );
    }
});

module.exports = router;
