const checkMillionDollarIdea = (req, res, next) => {
    const {numWeeks, weeklyRevenue} = req.body;
    const total = numWeeks * weeklyRevenue;
    if ( total < 1000000 || !numWeeks || !weeklyRevenue || isNaN(total)) {
        res.status(400).send();
    } else {
        next();
    }
};

// Leave this exports assignment so that the function can be used elsewhere


module.exports = checkMillionDollarIdea;
