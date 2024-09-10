export const generateToken = (user, message, statusCode, res) => {
  const token = user.generateJsonWebToken();
  console.log("process.env.COOKIE_EXPIRE", process.env.COOKIE_EXPIRE);
  // Determine the cookie name based on the user's role
  const cookieName = user.role === "Admin" ? "adminToken" : "studentToken";

  res.status(statusCode).json({
    success: true,
    message,
    user,
    token,
  });
};
