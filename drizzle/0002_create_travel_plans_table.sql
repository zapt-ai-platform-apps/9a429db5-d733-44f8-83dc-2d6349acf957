CREATE TABLE "travel_plans" (
  "id" SERIAL PRIMARY KEY,
  "user_id" UUID NOT NULL,
  "from_airport" TEXT NOT NULL,
  "to_airport" TEXT NOT NULL,
  "travel_date" TIMESTAMP NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW()
);