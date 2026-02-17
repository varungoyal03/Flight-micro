const amqplib = require('amqplib');
const { updateSeats } = require('./flight-service');

async function connectSeatReleaseQueue() {
    try {
        const connection = await amqplib.connect('amqp://localhost');
        const channel = await connection.createChannel();
        await channel.assertQueue('seat-release-queue');

        channel.consume('seat-release-queue', async (data) => {
            const message = JSON.parse(data.content.toString());
            if (message.type === 'RELEASE_SEATS') {
                const { flightId, seats } = message.data;
                try {
                    await updateSeats({ flightId, seats, dec: false });
                    console.log(`[SEAT_RELEASE] Released ${seats} seats for flightId=${flightId}`);
                } catch (err) {
                    console.error(`[SEAT_RELEASE] Failed to release seats:`, err);
                }
            }
            channel.ack(data);
        });
    } catch (error) {
        console.error('[SEAT_RELEASE_QUEUE] Error:', error);
    }
}

module.exports = {
    connectSeatReleaseQueue
};
