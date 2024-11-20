CREATE TABLE "requests" (
  "id" SERIAL PRIMARY KEY,
  "user_id" UUID NOT NULL,
  "item_description" TEXT NOT NULL,
  "from_airport" TEXT NOT NULL,
  "to_airport" TEXT NOT NULL,
  "delivery_date" TIMESTAMP NOT NULL,
  "reward" NUMERIC NOT NULL,
  "created_at" TIMESTAMP DEFAULT NOW()
);