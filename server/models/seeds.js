import ConcertEvent from "./events.js";
import { User } from "./userSchema.js";
import { Comment } from "./comment.js";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
let ranya = {
  firstName: "Ranya",
  lastName: "Najehi",
  email: "ranya.najehi@esprit.tn",
  phone: "87654321",
  password: await bcrypt.hash("ranyaranya", 10),
  genre: "Femme",
  levelEnglish: "C1",
  role: "Admin",
  studentAvatar: "a2c7690e-ee45-4286-b04c-21c03bac2a9b.jpg",
};
const seedDatabase = async () => {
  try {
    // Seed Users
    const users = [];
    for (let i = 0; i < 20; i++) {
      const user = new User({
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        phone: "27334774", // Updated for new version
        password: await bcrypt.hash("password123", 10),
        genre: faker.helpers.arrayElement(["Homme", "Femme"]), // Updated to use helpers
        levelEnglish: faker.helpers.arrayElement([
          "A1",
          "A2",
          "B1",
          "B2",
          "C1",
          "C2",
        ]),
        role: faker.helpers.arrayElement(["Admin", "Student"]),
        studentAvatar: faker.helpers.arrayElement([
          "avatar-1.jpg",
          "avatar-2.jpg",
        ]),
        about: faker.lorem.paragraph(),
      });
      users.push(user);
    }
    users.push(ranya);
    await User.insertMany(users);
    console.log("Seeded Users");

    // Seed Events
    const events = [];
    for (let i = 0; i < 10; i++) {
      const event = new ConcertEvent({
        title: faker.lorem.words(),
        description: faker.lorem.paragraph(),
        date: faker.date.future(),
        startTime: faker.date
          .recent()
          .toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }), // "HH:mm" format
        endTime: faker.date
          .recent()
          .toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }), // "HH:mm" format
        location: {
          address: faker.location.streetAddress(), // Updated API change
          latitude: faker.location.latitude(),
          longitude: faker.location.longitude(),
        },
        images: [
          faker.helpers.arrayElement([
            "event-1.jpg",
            "event-2.jpg",
            "event-3.jpg",
          ]),
          faker.helpers.arrayElement([
            "event-6.jpg",
            "event-7.jpg",
            "event-8.jpg",
            "event-9.jpg",
            "event-10.jpg",
            "event-11.jpg",
          ]),
          faker.helpers.arrayElement([
            "event-4.jpg",
            "event-4.jpg",
            "event-5.jpg",
          ]),
        ], // Updated image URL method
        eventOrganizer: faker.company.name(), // Updated to reflect new API
        notes: faker.lorem.sentence(),
        category: faker.helpers.arrayElement([
          "Rock",
          "Pop",
          "Jazz",
          "Classical",
        ]),
      });
      events.push(event);
    }
    await ConcertEvent.insertMany(events);
    console.log("Seeded Events");

    // Seed Comments
    const comments = [];
    const usersId = await User.find(); // Get seeded users
    const eventsIds = await ConcertEvent.find(); // Get seeded events
    for (let i = 0; i < 50; i++) {
      const comment = new Comment({
        message: faker.lorem.sentence(),
        sender: faker.helpers.arrayElement(usersId)._id,
        event: faker.helpers.arrayElement(eventsIds)._id,
        media: faker.image.url(), // Updated to use new image URL method
      });
      comments.push(comment);
    }
    await Comment.insertMany(comments);
    console.log("Seeded Comments");

    // Add Ups and Likes (After seeding users and events)
    const allUsers = await User.find();
    const allEvents = await ConcertEvent.find();

    // Randomly assign ups and likes (ensure some consistency)
    for (const event of allEvents) {
      // Ups (assume 5-15 users "up" each event)
      const numUps = Math.floor(Math.random() * (15 - 5 + 1)) + 5;
      const randomUsersForUps = faker.helpers
        .shuffle(allUsers)
        .slice(0, numUps);
      event.ups = randomUsersForUps.map((user) => user._id);

      // Likes (assume 10-30 users "like" each event)
      const numLikes = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
      const randomUsersForLikes = faker.helpers
        .shuffle(allUsers)
        .slice(0, numLikes);
      event.likes = randomUsersForLikes.map((user) => user._id);

      await event.save();
    }
    console.log("Ups and Likes added to Events");

    // Add Likes to Users (ensure consistency)
    for (const user of allUsers) {
      // Assume each user likes 2-5 events
      const numLikes = Math.floor(Math.random() * (5 - 3 + 1)) + 5;
      const randomEventsForLikes = faker.helpers
        .shuffle(allEvents)
        .slice(0, numLikes);
      user.likes = randomEventsForLikes.map((event) => event._id);

      await user.save();
    }
    console.log("Likes added to Users");
    console.log("Database seeded successfully!");
  } catch (err) {
    console.error("Error seeding database:", err);
  }
};

seedDatabase();
