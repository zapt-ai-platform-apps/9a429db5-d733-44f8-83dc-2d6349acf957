# FlightMate

FlightMate is a platform that connects travelers with people who need items delivered between cities. By leveraging travelers who are already flying to a destination, we provide a cost-effective and efficient solution for delivering items.

## User Journeys

### 1. Sender Journey

1. **Sign Up / Log In**: The sender creates an account or logs into their existing account using ZAPT authentication.

2. **Post a Delivery Request**:
   - Clicks on "Create Delivery Request".
   - Fills in item details:
     - **Item Description**: Detailed description of the item.
     - **From Airport**: Selects the departure airport.
     - **To Airport**: Selects the destination airport.
     - **Preferred Delivery Date**: Specifies by when the item needs to be delivered.
     - **Reward**: Sets a monetary reward for the traveler.

3. **Manage Requests**:
   - Views a list of their active delivery requests.
   - Can edit or cancel a delivery request.

4. **Communicate with Traveler**:
   - Once a traveler accepts the delivery request, the sender can chat with the traveler to arrange handover details.

### 2. Traveler Journey

1. **Sign Up / Log In**: The traveler creates an account or logs into their existing account using ZAPT authentication.

2. **Add Travel Itinerary**:
   - Clicks on "Add Travel Plan".
   - Enters travel details:
     - **From Airport**: Selects their departure airport.
     - **To Airport**: Selects their destination airport.
     - **Travel Date**: Specifies the date of travel.

3. **Browse Delivery Requests**:
   - Views a list of delivery requests matching their travel route.
   - Can filter requests by date, reward, or item size.

4. **Accept a Delivery Request**:
   - Selects a delivery request to view more details.
   - Clicks "Accept Delivery" to agree to deliver the item.
   - The sender is notified of the acceptance.

5. **Communicate with Sender**:
   - Chats with the sender to arrange pickup and drop-off details.

### 3. Communication Journey

1. **In-App Chat**:
   - Once a delivery request is accepted, both the sender and traveler can use the in-app chat to communicate securely.

2. **Notifications**:
   - Users receive notifications when:
     - A delivery request is accepted.
     - New messages are received.
     - Delivery status updates occur.

### 4. Delivery Completion

1. **Mark as Delivered**:
   - Traveler marks the delivery as completed once the item is handed over at the destination.

2. **Confirm Delivery**:
   - Sender confirms that they have received the item.

3. **Release Reward**:
   - Once both parties confirm the delivery, the reward is released to the traveler.

## External APIs Used

- **Airport Data API**: To fetch a list of airports for selection.
- **Notifications API**: To send real-time notifications to users.

## Environment Variables

- `VITE_PUBLIC_APP_ID`: Application ID for ZAPT integration.
- `VITE_PUBLIC_SENTRY_DSN`: DSN for Sentry error logging.
- `VITE_PUBLIC_APP_ENV`: Application environment (e.g., production, development).
- `AIRPORT_API_KEY`: API key for accessing the Airport Data API.
