import { db } from "@/db/connections";
import { schema } from "@/db/schemas";
import { randomUUID } from "node:crypto";
import argon2 from "argon2";

export async function ensureAdminUser() {
  const adminEmail = "admin@admin.com";
  
  const existingAdmin = await db.query.users.findFirst({
    where: (data, { eq }) => eq(data.email, adminEmail),
  });

  if (!existingAdmin) {
    const id = randomUUID();
    const hash = await argon2.hash("admin@123");

    await db.insert(schema.users).values({
      id,
      name: "Admin",
      email: adminEmail,
      password: hash,
      role: "admin",
    });

    console.log("Admin user created: admin@admin.com / admin@123");
  }
}