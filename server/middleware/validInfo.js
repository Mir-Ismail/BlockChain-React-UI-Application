module.exports = function (req, res, next) {
    const {
        org,
        userId,
        cnic,
        affiliation,
        attributes,
        user_password,
        user_name,
    } = req.body;

    function validEmail(userId) {
        return /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(userId);
    }
    if (req.path === '/registerUser') {
        if (
            ![
                org,
                userId,
                cnic,
                affiliation,
                attributes,
                user_password,
                user_name,
            ].every(Boolean)
        ) {
            return res.status(401).json('Missing Credentials');
        } else if (!validEmail(userId)) {
            return res.status(401).json('Invalid Email');
        }
    } else if (req.path === '/userlogin') {
        if (![cnic, user_password].every(Boolean)) {
            return res.status(401).json('Missing Credentials');
        }
    }
    next();
};
