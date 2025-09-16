
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { transporter } = require("./userController");


const forgotPasswordController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).send({ success: false, message: "Email is required" });

    const user = await userModel.findOne({ email });
    if (!user) return res.status(404).send({ success: false, message: "User not found" });

    // Generate original reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash the token before saving in DB
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;

    // Send email with original token
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `Click here to reset your password: ${resetLink}`,
    });

    res.status(200).send({ success: true, message: "Reset link sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, message: "Failed to send reset link", error: error.message });
  }
};


const resetPasswordController = async (req, res) => {
  try {
    const { token } = req.params;
    const { password, confirmPassword } = req.body;

    if (!password || !confirmPassword)
      return res.status(400).json({ success: false, message: "Password required" });

    if (password !== confirmPassword)
      return res.status(400).json({ success: false, message: "Passwords do not match" });

    if (password.length < 6)
      return res.status(400).json({ success: false, message: "Password must be at least 6 characters" });

    // Hash the incoming token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find user with hashed token and valid expiration
    const user = await userModel.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ success: false, message: "Invalid or expired token" });

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Clear token fields
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;

    await user.save();

    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ success: false, message: "Reset password failed", error: error.message });
  }
};

module.exports = { forgotPasswordController, resetPasswordController };
