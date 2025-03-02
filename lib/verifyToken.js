import jwt from "jsonwebtoken";

export function verifyToken(req) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return { valid: false, message: "No token provided" };
    }

    const token = authHeader.split(" ")[1]; // Get the token from the header
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token using your secret
    return { valid: true, decoded };
  } catch (error) {
    console.error("JWT verification failed:", error);
    return { valid: false, message: "Token is invalid or expired" };
  }
}
