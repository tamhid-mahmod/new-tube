import { db } from "@/db";
import { categories } from "@/db/schema";

// ----------------------------------------------------------------------

const CATEGORY_NAMES = [
  "Cars and vehicles",
  "Comedy",
  "Education",
  "Gaming",
  "Entertainmnet",
  "Film and animation",
  "How-to and style",
  "Music",
  "News and politics",
  "People and blogs",
  "Pets and animals",
  "Science and technolgy",
  "Sports",
  "Travel and events",
];

async function main() {
  console.log("Seeding categories...");

  try {
    const values = CATEGORY_NAMES.map((name) => ({
      name,
      description: `Videos ralated to ${name.toLowerCase()}`,
    }));

    await db.insert(categories).values(values);

    console.log("Categories seeded successfully!");
  } catch (error) {
    console.error("Error seeding categories:", error);
    process.exit(1);
  }
}

main();
