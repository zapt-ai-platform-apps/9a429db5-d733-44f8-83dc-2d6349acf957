import * as Sentry from "@sentry/node";
import { authenticateUser } from './_apiUtils.js';
import { requests } from '../drizzle/schema.js';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq, desc } from 'drizzle-orm';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.APP_ENV,
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
    const user = await authenticateUser(req);

    const sql = neon(process.env.NEON_DB_URL);
    const db = drizzle(sql);

    const myRequests = await db
      .select()
      .from(requests)
      .where(eq(requests.userId, user.id))
      .orderBy(desc(requests.createdAt));

    res.status(200).json(myRequests);
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Error fetching your delivery requests' });
  }
}