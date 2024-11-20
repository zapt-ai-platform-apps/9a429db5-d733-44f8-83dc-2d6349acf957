# New App

New App is a platform that connects travelers with people who need items delivered between cities. By leveraging travelers who are already flying to a destination, we provide a cost-effective and efficient solution for delivering items.

## User Journeys

### 1. Sender Journey

1. **Sign Up / Log In**: The sender creates an account or logs into their existing account using ZAPT authentication.

2. **Post a Delivery Request**:
   - Clicks on "Create Request".
   - Fills in item details:
     - **Item Description**: Detailed description of the item.
     - **From Airport**: Selects the departure airport.
     - **To Airport**: Selects the destination airport.
     - **Preferred Delivery Date**: Specifies by when the item needs to be delivered.
     - **Reward**: Sets a monetary reward for the traveler.

3. **Manage Requests**:
   - Views a list of their active delivery requests.
   - Can view the status of each request.

4. **Communicate with Traveler**:
   - Once a traveler accepts the delivery request (feature coming soon), the sender can chat with the traveler to arrange handover details.

### 2. Traveler Journey

1. **Sign Up / Log In**: The traveler creates an account or logs into their existing account using ZAPT authentication.

2. **Add Travel Plan**:
   - Clicks on "Add Travel Plan".
   - Enters travel details:
     - **From Airport**: Selects their departure airport.
     - **To Airport**: Selects their destination airport.
     - **Travel Date**: Specifies the date of travel.

3. **Browse Delivery Requests**:
   - Views a list of delivery requests matching their travel route (feature coming soon).
   - Can filter requests by date, reward, or item size (future enhancement).

4. **Accept a Delivery Request**:
   - Selects a delivery request to view more details.
   - Clicks "Accept Delivery" to agree to deliver the item (feature coming soon).
   - The sender is notified of the acceptance.

5. **Communicate with Sender**:
   - Chats with the sender to arrange pickup and drop-off details (feature coming soon).

### 3. Future Features:

- **In-App Chat**: Secure communication between sender and traveler.
- **Notifications**: Real-time updates on request status and messages.
- **Delivery Completion**: Marking deliveries as completed and releasing rewards.

## External APIs Used

- **Airport Data API**: To fetch a list of airports for selection.
  - **Note**: Requires `AIRPORT_API_KEY` to be set in the environment variables.

## Environment Variables

- `VITE_PUBLIC_APP_ID`: Application ID for ZAPT integration.
- `VITE_PUBLIC_SENTRY_DSN`: DSN for Sentry error logging.
- `VITE_PUBLIC_APP_ENV`: Application environment (e.g., production, development).
- `AIRPORT_API_KEY`: API key for accessing the Airport Data API.
- `NEON_DB_URL`: Database connection URL for Neon database.
- `PROJECT_ID`: Project ID for Sentry logging.
- `APP_ID`: Application ID for backend services.
- `SENTRY_DSN`: DSN for Sentry error logging in backend.
- `APP_ENV`: Application environment for backend.

## Notes

- The app is fully responsive and designed with mobile-first principles.
- All API interactions include loading states to enhance user experience.
- The app includes error handling and reporting via Sentry.
- Vercel Analytics is integrated for tracking usage.
- Remember to run database migrations to set up the required tables.
- Ensure environment variables are correctly set for both frontend and backend.
