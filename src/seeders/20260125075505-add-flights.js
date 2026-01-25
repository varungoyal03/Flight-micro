'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Flights', [
      {
        flightNumber: 'AI-101',
        airplaneId: 1,
        departureAirportId: 'DEL',
        arrivalAirportId: 'BOM',
        departureTime: new Date('2026-02-01T06:00:00'),
        arrivalTime: new Date('2026-02-01T08:15:00'),
        price: 6500,
        boardingGate: 'A1',
        totalSeats: 180,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flightNumber: 'AI-202',
        airplaneId: 5,
        departureAirportId: 'BOM',
        arrivalAirportId: 'BLR',
        departureTime: new Date('2027-02-01T10:00:00'),
        arrivalTime: new Date('2027-02-01T11:40:00'),
        price: 5200,
        boardingGate: 'B3',
        totalSeats: 160,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flightNumber: 'AI-303',
        airplaneId: 6,
        departureAirportId: 'BLR',
        arrivalAirportId: 'HYD',
        departureTime: new Date('2027-02-01T14:00:00'),
        arrivalTime: new Date('2027-02-01T15:10:00'),
        price: 4100,
        boardingGate: 'C2',
        totalSeats: 150,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flightNumber: 'AI-404',
        airplaneId: 7,
        departureAirportId: 'HYD',
        arrivalAirportId: 'DEL',
        departureTime: new Date('2027-02-01T17:30:00'),
        arrivalTime: new Date('2027-02-01T20:00:00'),
        price: 7200,
        boardingGate: 'D5',
        totalSeats: 170,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        flightNumber: 'AI-505',
        airplaneId: 8,
        departureAirportId: 'DEL',
        arrivalAirportId: 'IXC',
        departureTime: new Date('2026-02-02T09:00:00'),
        arrivalTime: new Date('2026-02-02T10:10:00'),
        price: 3600,
        boardingGate: 'A4',
        totalSeats: 120,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Flights', {
      flightNumber: ['AI-101', 'AI-202', 'AI-303', 'AI-404', 'AI-505']
    });
  }
};
