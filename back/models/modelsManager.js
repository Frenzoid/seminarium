const User = require('./user.js');
const Seminar = require('./seminar.js');
const Schedule = require('./schedule.js');

function issueRelations() {

    // User and Seminars Relations.
    User.hasMany(Seminar);
    Seminar.belongsTo(User);

    // Schedule and Seminars relations.
    Seminar.hasMany(Schedule);
    Schedule.belongsTo(Seminar);
}


async function createTablesFromModels() {

    // Sync all models.
    await User.sync({ force: true });
    await Seminar.sync({ force: true });
    await Schedule.sync({ force: true });
}

async function insertFillerData() {

    // Insert mock seminars.

    await Seminar.bulkCreate([
        {
            imagePath: "https://cdn.slidesharecdn.com/ss_thumbnails/machinelearninginhealthcare-221210065110-abdf3bb3-thumbnail.jpg",
            title: "AI in the real world",
            description: " A seminar about artificial intelligence in the real world, and how it can be applied to real life problems. ",
            speakers: "Speaker 1, Speaker 2",
            date: "2021-10-12",
            schedules: [
                { time: "10:00", name: "Start of the seminar" },
                { time: "11:00", name: "Break" },
                { time: "12:00", name: "End of the seminar" },
            ],
            place: "A1.04"
        },
        {
            imagePath: "https://cdn.slidesharecdn.com/ss_thumbnails/machinelearninginhealthcare-221210065110-abdf3bb3-thumbnail.jpg",
            title: "ML in Healthcare",
            description: " A seminar about machine learning in the healthcare industry, and how it can be applied to real life problems. ",
            speakers: "Speaker 1, Speaker 2",
            date: "2021-10-13",
            schedules: [
                { time: "10:00", name: "Start of the seminar" },
                { time: "11:00", name: "Break" },
                { time: "12:00", name: "End of the seminar" },
            ],
            place: "D1.02"

        },
        {
            imagePath: "https://cdn.slidesharecdn.com/ss_thumbnails/machinelearninginhealthcare-221210065110-abdf3bb3-thumbnail.jpg",
            title: "AI in the industrial field",
            description: " A seminar about artificial intelligence in the real world, and how it can be applied to real life problems. ",
            speakers: "Speaker 1, Speaker 2",
            date: "2021-10-14",
            schedules: [
                { time: "10:00", name: "Start of the seminar" },
                { time: "11:00", name: "Break" },
                { time: "12:00", name: "End of the seminar" },
            ],
            place: "B1.03"
        },
        {
            imagePath: "https://cdn.slidesharecdn.com/ss_thumbnails/machinelearninginhealthcare-221210065110-abdf3bb3-thumbnail.jpg",
            title: "AI in the real world",
            description: " A seminar about artificial intelligence in the real world, and how it can be applied to real life problems. ",
            speakers: "Speaker 1, Speaker 2",
            date: "2021-10-15",
            schedules: [
                { time: "10:00", name: "Start of the seminar" },
                { time: "11:00", name: "Break" },
                { time: "12:00", name: "End of the seminar" },
            ],
            place: "C1.04"
        },
    ], { include: [Schedule] });
}

module.exports = { createTablesFromModels, insertFillerData, issueRelations };