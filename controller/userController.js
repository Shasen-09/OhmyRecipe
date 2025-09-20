const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');
const JWT = require("jsonwebtoken");
const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  tls: {
    rejectUnauthorized: false,
  },
})

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};



const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email })
    if (!user) {
      return res.status(500).send({
        success: false,
        message: 'User not found'
      })
    }
    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(401).send({
        success: false,
        message: "Password don't match"
      })
    }
    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' })
    res.status(200).send({
      success: true,
      message: 'Login success',
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        isVerified: user.isVerified
      }

    })

  } catch (error) {
    console.log(error);
    return res.status(500).send({
      success: false,
      message: 'Login API error',
      error: error.message

    })

  }
}


const registerController = async (req, res) => {
  try {
    const { username, email, password, contact, confirmpassword } = req.body;

    if (!username || !email || !password || !contact || !confirmpassword) {
      return res.status(500).send({
        success: false,
        message: 'Please Provide all flieds'
      })
    }
    if (password !== confirmpassword) {
      return res.status(400).send({
        success: false,
        return: "Password don't match"
      })
    }
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
      return res.status(500).send({
        success: false,
        message: 'User already exists'
      })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);



    const newUser = new userModel({ username, email, contact, password: hashedPassword, isVerified: false })
    await newUser.save();

    req.body.email = email;
    return await sendOtpController(req, res);


  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Register API failed",
      error: error.message
    });
  }
};

const sendOtpController = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required"
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found"
      });
    }

    if (user.isVerified) {
      return res.status(400).send({
        success: false,
        message: "User already verified"
      });
    }

    const otp = generateOtp();
    const otpExpires = new Date(Date.now() + 1 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Verify your account",
      text: `Your OTP is ${otp}. It expires in 60 seconds.`
    };

    await transporter.sendMail(mailOptions);

    res.status(200).send({
      success: true,
      message: "OTP sent to your email",
      user: {
        email: user.email
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Failed to send OTP",
      error: error.message
    });
  }
};


const verifyOtpController = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).send({
        success: false,
        message: "Email and OTP are required"
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found"
      });
    }

    if (user.isVerified) {
      return res.status(400).send({
        success: false,
        message: "User already verified"
      });
    }

    if (user.otp !== otp) {
      return res.status(400).send({
        success: false,
        message: "Invalid OTP"
      });
    }


    if (!user.otpExpires || new Date(user.otpExpires).getTime() < Date.now()) {
      return res.status(400).send({
        success: false,
        message: "OTP expired"
      });
    }


    // Update user verification status
    user.isVerified = true;
    user.otp = null;
    user.otpExpires = null; // clear it completely
    await user.save();
    const token = await JWT.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).send({
      success: true,
      message: "OTP verified successfully, account activated!",
      token,
      user: {
        email: user.email,
        isVerified: user.isVerified,
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "OTP verification failed",
      error: error.message
    });
  }
};

const homeController = (req, res) => {
  res.status(200).send({
    success: true,
    message: 'Welcome to home'
  })

}




module.exports = { loginController, registerController, verifyOtpController, homeController, sendOtpController, transporter };