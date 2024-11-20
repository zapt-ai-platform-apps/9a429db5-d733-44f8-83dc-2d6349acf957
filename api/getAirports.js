import * as Sentry from "@sentry/node";
import fetch from 'node-fetch';

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
  try {
    const response = await fetch(`https://api.airportdata.com/v6/airports?api_key=${process.env.AIRPORT_API_KEY}`);
    const data = await response.json();
    res.status(200).json({ airports: data.airports });
  } catch (error) {
    Sentry.captureException(error);
    res.status(500).json({ error: 'Error fetching airports' });
  }
}