import prisma from "../../app/lib/prisma";

// Function to get the Auth0 Management token (client_credentials grant)
const getAuth0ManagementToken = async () => {
  try {
    const response = await fetch(
      `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: process.env.AUTH0_CLIENT_ID,
          client_secret: process.env.AUTH0_CLIENT_SECRET,
          audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
          grant_type: "client_credentials",
        }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      return data.access_token;
    } else {
      throw new Error(data.error_description || "Failed to fetch Auth0 token");
    }
  } catch (error) {
    throw new Error(`Error getting Auth0 token: ${error.message}`);
  }
};

// Function to update a specific field for a user in Auth0 using the Management API
const updateAuth0UserField = async (auth0UserId, fieldToUpdate) => {
  try {
    const token = await getAuth0ManagementToken();
    const response = await fetch(
      `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${auth0UserId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fieldToUpdate), // Only update the specific field
      }
    );

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || "Failed to update user in Auth0");
    }
  } catch (error) {
    throw new Error(`Error updating Auth0 user: ${error.message}`);
  }
};

// API handler to manage the update request
export default async function handler(req, res) {
  if (req.method === "PUT") {
    const { auth_id, email, username, phone } = req.body;

    // Validate that the Auth0 user ID is provided
    if (!auth_id) {
      return res.status(400).json({ message: "Auth0 user ID is required" });
    }

    // Validate required fields
    if (!email && !username && !phone) {
      return res.status(400).json({
        message:
          "At least one field (email, username, or phone) must be provided.",
      });
    }

    // Define `updatedDbUserData` to store updated fields for the local database
    const updatedDbUserData = {};

    try {
      // Update fields one by one to avoid conflicts (email, username, phone)
      let updatedUser;

      // Update email separately
      if (email) {
        updatedUser = await updateAuth0UserField(auth_id, { email });
        updatedDbUserData.email = email;
      }

      // Update username separately
      if (username) {
        updatedUser = await updateAuth0UserField(auth_id, { username });
        updatedDbUserData.name = username; // Assuming `name` maps to `username` in the DB
      }

      // Update phone number separately
      if (phone) {
        updatedUser = await updateAuth0UserField(auth_id, {
          phone_number: phone,
        });
        updatedDbUserData.phone = phone;
      }

      // Update the user in your local PostgreSQL database
      await prisma.user.update({
        where: { email }, // Assuming email is the identifier for the user in your local DB
        data: updatedDbUserData,
      });

      // Fetch the latest updated user from the local DB
      const updatedDbUser = await prisma.user.findUnique({
        where: { email }, // Fetching by the email used during the update
      });

      res.status(200).json({
        auth0User: updatedUser,
        localUser: updatedDbUser, // Return the latest user data from the DB
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
