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

    // Create a new trip with available seats
    const startCity = "Jakarta";
    const destinationCity = "Surabaya";
    const date = BigInt(Math.floor(Date.now() / 1000) + 86400); // Tomorrow's date
    const seats = BigInt(30); // Number of available seats
    const price = hre.ethers.parseEther("0.015"); // Price per seat in ETH

    console.log("Creating new trip...");
    const tx = await booking.createTrip(
      startCity,
      destinationCity,
      date,
      seats,
      price
    );

    console.log("Transaction sent, waiting for confirmation...");
    await tx.wait();
    
    // Get the new trip ID
    const totalTrips = await booking.getTotalTrips();
    const newTripId = totalTrips - BigInt(1);
    
    // Get trip details
    const trip = await booking.getTrip(newTripId);
    console.log("New trip created successfully!");
    console.log("Trip ID:", trip.id.toString());
    console.log("Route:", trip.startCity, "->", trip.destinationCity);
    console.log("Date:", new Date(Number(trip.date) * 1000).toISOString());
    console.log("Available seats:", trip.availableSeats.toString());
    console.log("Price per seat:", hre.ethers.formatEther(trip.pricePerSeat), "ETH");

  } catch (error) {
    console.error("Error details:", error);
    process.exitCode = 1;
  }
}

main(); 