import * as Sentry from "@sentry/node";
import { authenticateUser } from './_apiUtils.js';
import { requests } from '../drizzle/schema.js';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.PROJECT_ID
    }
  }
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const user = await authenticateUser(req);
    const { itemDescription, fromAirport, toAirport, deliveryDate, reward } = req.body;

    if (!itemDescription || !fromAirport || !toAirport || !deliveryDate || !reward) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const sql = neon(process.env.NEON_DB_URL);
    const db = drizzle(sql);

    const result = await db.insert(requests).values({
      userId: user.id,
      itemDescription,
      fromAirport,
      toAirport,
      deliveryDate: new Date(deliveryDate),
      reward: parseFloat(reward)
    }).returning();

    res.status(201).json(result[0]);
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Error creating delivery request' });
  }
}