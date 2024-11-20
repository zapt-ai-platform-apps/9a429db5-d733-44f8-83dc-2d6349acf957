import * as Sentry from "@sentry/node";
import { requests } from '../drizzle/schema.js';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { desc } from 'drizzle-orm';

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
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  try {
    const sql = neon(process.env.NEON_DB_URL);
    const db = drizzle(sql);

    const deliveryRequests = await db
      .select()
      .from(requests)
      .orderBy(desc(requests.createdAt));

    res.status(200).json(deliveryRequests);
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Error fetching delivery requests' });
  }
}