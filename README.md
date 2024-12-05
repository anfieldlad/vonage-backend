# Vonage Video Call Backend

This is the backend for managing video calls using the [Vonage Video API](https://www.vonage.com/communications-apis/video/). Built with **Node.js** and **TypeScript**, this backend provides APIs for session creation, token generation, and other server-side processes required for managing video calls.

This backend works together with the [Vonage Video Call Frontend](https://github.com/anfieldlad/vonage-frontend) to create a full video calling solution.

## Features

- **API for Joining Rooms**: Create or join video rooms dynamically.
- **Session and Token Management**: Generate and manage Vonage session IDs and tokens.
- **Room Management**: Handle participant data and room lifecycle.

## Getting Started

### Prerequisites

- **Node.js** (version 14 or above)
- **npm** or **yarn** for package management
- **Vonage API Key, Secret, Private Key, and Application ID**

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/vonage-video-backend.git
   cd vonage-video-backend
   ```

2. **Install dependencies**:

   Using npm:

   ```bash
   npm install
   ```

   Or using yarn:

   ```bash
   yarn install
   ```

3. **Configure Environment Variables**:

   Create a `.env` file in the root directory with your Vonage credentials:

   ```
   VONAGE_PRIVATE_KEY=YOUR_PRIVATE_KEY
   VONAGE_APPLICATION_ID=YOUR_APPLICATION_ID
   ```

### Running the Application

To run the application in development mode:

```bash
npm run dev
```

Or with yarn:

```bash
yarn dev
```

The backend server will be available at [http://localhost:4000](http://localhost:4000).

## API Endpoints

- **`GET /api/hello`**: A simple endpoint to check if the server is running.
- **`POST /api/join-room`**: Create or join a video call room by generating a session ID and token.

### Example Request and Response

#### `POST /api/join-room`

**Request Body**:

```json
{
  "roomName": "example-room",
  "userName": "john_doe",
  "role": "publisher"
}
```

**Response**:

```json
{
  "sessionId": "2_MX40NTYy...",
  "token": "T1==cGFydG5lcl9idF9pZD02NT...",
  "roomName": "example-room"
}
```

- **roomName** (string): Name of the room to join or create.

- **userName** (string): The user's name to be used in the session.

- **role** (string): Role of the user, can be `publisher`, `subscriber`, or `moderator`.

- **sessionId** (string): The Vonage session ID for the video call.

- **token** (string): The token to authenticate the user into the session.

- **roomName** (string): The name of the room.

## Project Structure

- **`/api`**: Contains the main API routes.

  - **`hello.ts`**: A simple health check endpoint to verify the backend is running.
  - **`join-room.ts`**: Endpoint to handle requests to join or create a room.

- **`/lib`**: Contains utility functions and services.

  - **`room-manager.ts`**: Logic for managing room sessions and participant tracking.
  - **`vonage.ts`**: Interfaces with the Vonage SDK to handle session and token generation.

- **`.idx`**: Indexed directory for managing local dependencies (specific to your setup).

- **`dev.nix`**: Development environment setup file.

## Usage

- **Hello Endpoint**: To verify that the server is running, you can send a GET request to `/api/hello`. You should receive a simple response confirming that the server is active.
- **Join Room Endpoint**: Use the `/api/join-room` endpoint to obtain a session ID and token to participate in a video call. The frontend will use these credentials to connect to the Vonage video room.

## Development Notes

- **TypeScript**: The backend is built using TypeScript for type safety and better maintainability.
- **Vonage SDK**: The backend uses the Vonage Node SDK to interact with the Vonage Video API for session management and token generation.

## Contributions

Contributions are welcome! If you find any bugs or have suggestions for new features:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch-name`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch-name`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For further questions or issues, please contact [Bobby Ananta Dioriza](https://github.com/anfieldlad).

---

Happy coding! 😊

