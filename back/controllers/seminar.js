const Schedule = require("../models/schedule");
const Seminar = require("../models/seminar");
const sequelize = require('../config/database');

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
        include: [{ model: Schedule }],
        order: [[{ model: Schedule }, 'time', 'ASC']]
    });

    if (!seminar) return res.boom.badRequest("Seminar not found :c");
    if (seminar.image) seminar.image = seminar.image.toString();

    return res.json(seminar);
}

async function addSeminar(req, res) {
    const seminar = req.body;
    console.log(seminar);

    if (!seminar.schedules || seminar.schedules.length === 0)
        return res.boom.badRequest("The seminar must have at least one schedule! (Starting time).");

    let transaction;

    try {
        transaction = await sequelize.transaction();

        const newSeminar = await Seminar.create(seminar, {
            include: [Schedule],
            transaction: transaction
        });

        await transaction.commit();
        return res.json(newSeminar);
    } catch (error) {
        if (transaction) await transaction.rollback();
        throw error;
    }
}

async function editSeminar(req, res) {
    const { id } = req.params;
    const seminar = req.body;

    if (!seminar.schedules || seminar.schedules.length === 0)
        return res.boom.badRequest("The seminar must have at least one schedule! (Starting time).");

    const transaction = await sequelize.transaction();

    try {
        // Update seminar
        const updatedSeminar = await Seminar.update(seminar, {
            where: { id },
            transaction,
        });

        // Update schedules
        await Schedule.destroy({ where: { seminarId: id }, transaction });
        await Schedule.bulkCreate(seminar.schedules.map((schedule) => ({
            ...schedule,
            seminarId: id
        })), { transaction });

        await transaction.commit();
        res.json(updatedSeminar);

    } catch (error) {
        await transaction.rollback();
        throw error;
    }
}

async function deleteSeminar(req, res) {
    const { id } = req.params;
    await Seminar.destroy({ where: { id }, include: [Schedule] });
    return res.json({ message: "Seminar deleted" });
}

module.exports = { getSeminars, getSeminar, addSeminar, editSeminar, deleteSeminar }