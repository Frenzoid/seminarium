const Schedule = require("../models/schedule");
const Seminar = require("../models/seminar");
const User = require("../models/user");

/**
 * Item controller, here you'll be managing all bussiness logic.
 */
async function getSeminars(req, res) {
    const seminars = await Seminar.findAll({
        include: [{ model: Schedule, order: [['time', 'ASC']], limit: 1 }]
    });
    seminars.map((seminar) => {
        if (seminar.image) seminar.image = seminar.image.toString();
        return seminar;
    });
    return res.json(seminars);
}

async function getSeminar(req, res) {
    const seminar = await Seminar.findByPk(req.params.id, {
        include: [{ model: Schedule, order: [['time', 'ASC']] }]
    });
    if (seminar.image) seminar.image = seminar.image.toString();
    return res.json(seminar);
}

async function addSeminar(req, res) {
    const seminar = req.body;
    console.log(seminar);
    const newSeminar = await Seminar.create(seminar, { include: [Schedule] });
    return res.json(newSeminar);
}

async function editSeminar(req, res) {
    const { id } = req.body;
    const seminar = req.body;

    // Update Seminar
    await Seminar.update(seminar, { where: { id } });

    // Update Schedules
    if (seminar.schedules && seminar.schedules.length) {
        for (const schedule of seminarData.schedules) {
            await Schedule.update(schedule, { where: { id: schedule.id, seminarId: id } });
        }
    }

    const editedSeminar = await Seminar.findByPk(id, {
        include: [{ model: Schedule, order: [['time', 'ASC']] }]
    });

    return res.json(editedSeminar);
}

async function deleteSeminar(req, res) {
    const { id } = req.body;
    await Seminar.destroy({ where: { id } });
    return res.json({ message: "Seminar deleted" });
}

module.exports = { getSeminars, getSeminar, addSeminar, editSeminar, deleteSeminar }