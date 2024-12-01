const path = require('path');

// Update paths based on the CNIC and organization
function updatePaths(cnic, org) {
    const cryptoPath = path.resolve(
        __dirname,
        '..',
        '..',
        '..',
        'test-network',
        'organizations',
        'peerOrganizations',
        `${org}.example.com`
    );

    return {
        cryptoPath,
        keyDirectoryPath: path.resolve(
            cryptoPath,
            'users',
            cnic,
            'msp',
            'keystore'
        ),
        certDirectoryPath: path.resolve(
            cryptoPath,
            'users',
            cnic,
            'msp',
            'signcerts'
        ),
        tlsCertPath: path.resolve(
            cryptoPath,
            'peers',
            `peer0.${org}.example.com`,
            'tls',
            'ca.crt'
        ),
    };
}

// Function to set peer and organization-specific details dynamically
function setOrgConfiguration(org) {
    const orgConfig = {
        Insurance: {
            peerEndpoint: 'localhost:7051',
            peerHostAlias: 'peer0.Insurance.example.com',
            mspId: 'InsuranceMSP',
        },
        Hospital: {
            peerEndpoint: 'localhost:9051',
            peerHostAlias: 'peer0.Hospital.example.com',
            mspId: 'HospitalMSP',
        },
    };

    const config = orgConfig[org];
    if (!config) {
        throw new Error(`Configuration for organization ${org} not found`);
    }

    // Return the configuration to set peer details globally
    return config;
}

module.exports = {
    updatePaths,
    setOrgConfiguration,
};
