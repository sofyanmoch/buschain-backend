// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract BusBooking {
    struct Trip {
        uint id;
        string startCity;
        string destinationCity;
        uint date;
        uint availableSeats;
        uint pricePerSeat;
        address company;
    }

    uint public nextTripId;
    mapping(uint => Trip) public trips;
    mapping(uint => address[]) public bookings;

    event TripCreated(uint id, string start, string destination, uint date, uint seats, uint price, address company);
    event SeatBooked(uint tripId, address passenger, uint seatCount);

    function createTrip(
        string memory _start,
        string memory _dest,
        uint _date,
        uint _seats,
        uint _price
    ) external {
        trips[nextTripId] = Trip(nextTripId, _start, _dest, _date, _seats, _price, msg.sender);
        emit TripCreated(nextTripId, _start, _dest, _date, _seats, _price, msg.sender);
        nextTripId++;
    }

    function bookSeat(uint _tripId, uint _seats) external payable {
        Trip storage trip = trips[_tripId];
        require(_seats > 0 && trip.availableSeats >= _seats, "Not enough seats");
        require(msg.value == _seats * trip.pricePerSeat, "Wrong value sent");

        trip.availableSeats -= _seats;
        bookings[_tripId].push(msg.sender);
        payable(trip.company).transfer(msg.value);

        emit SeatBooked(_tripId, msg.sender, _seats);
    }

    function getTrip(uint _id) public view returns (Trip memory) {
        return trips[_id];
    }

    function getTotalTrips() public view returns (uint) {
        return nextTripId;
    }
}