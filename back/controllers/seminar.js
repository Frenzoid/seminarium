const Schedule = require("../models/schedule");
const Seminar = require("../models/seminar");
const User = require("../models/user");

/**
 * Item controller, here you'll be managing all bussiness logic.
 */
async function getSeminars(req, res) {
    const seminars = await Seminar.findAll({ include: [{ model: Schedule, order: [['time', 'ASC']], limit: 1 }] });
    return res.json(seminars);
}


async function getSeminar(req, res) {
    const seminar = await Seminar.findByPk(req.params.id, { include: [{ model: Schedule, order: [['time', 'ASC']] }] });
    return res.json(seminar);
}


async function addSeminaroCurrentUser(req, res) {

    let seminar = await Seminar.findByPk(req.params.id);

    if (!seminar) res.boom.notFound("Seminar with id '" + req.params.id + "'not found");

    const currentUser = await User.findByPk(req.jwtpayload.userid);

    currentUser.addSeminar(seminar);
}

module.exports = { getSeminars, getSeminar, addSeminaroCurrentUser }