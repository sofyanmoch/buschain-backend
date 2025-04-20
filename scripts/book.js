const hre = require("hardhat");
require('dotenv').config();

async function main() {
  try {
    const [deployer] = await hre.ethers.getSigners();
    console.log("Deployer address:", deployer.address);

    const contractAddress = process.env.CONTRACT_ADDRESS;
    if (!contractAddress) {
      throw new Error("CONTRACT_ADDRESS not found in environment variables");
    }

    console.log("Connecting to contract at:", contractAddress);
    const booking = await hre.ethers.getContractAt(
      "BusBooking",
      contractAddress,
      deployer
    );

    // Get total trips
    const totalTrips = await booking.getTotalTrips();
    console.log("Total trips available:", totalTrips.toString());

    if (totalTrips === BigInt(0)) {
      throw new Error("No trips available. Please create a trip first using createTrip.js");
    }

    // Get the latest trip (most recently created)
    const tripId = totalTrips - BigInt(1);
    const trip = await booking.getTrip(tripId);
    
    console.log("\nTrip Details:");
    console.log("ID:", trip.id.toString());
    console.log("Route:", trip.startCity, "->", trip.destinationCity);
    console.log("Available seats:", trip.availableSeats.toString());
    console.log("Price per seat:", hre.ethers.formatEther(trip.pricePerSeat), "ETH");

    if (trip.availableSeats === BigInt(0)) {
      throw new Error("No seats available for this trip");
    }

    const seats = BigInt(1); // Number of seats to book
    const totalPrice = trip.pricePerSeat * seats;

    console.log("\nBooking seats...");
    const tx = await booking.bookSeat(tripId, seats, {
      value: totalPrice
    });

    console.log("Transaction sent, waiting for confirmation...");
    await tx.wait();
    console.log("Booking berhasil!");
    
    // Check updated trip details
    const updatedTrip = await booking.getTrip(tripId);
    console.log("\nUpdated Trip Details:");
    console.log("Available seats:", updatedTrip.availableSeats.toString());

  } catch (error) {
    console.error("Error details:", error);
    process.exitCode = 1;
  }
}

main();
