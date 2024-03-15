// "use server"


import axios from 'axios';

export default async (req, res) => {
  if (req.method === 'POST') {
    const { recaptchaResponse } = req.body;

    // Forward the reCAPTCHA verification request to the reCAPTCHA server
    const secretKey = '6Lcm5DEoAAAAACeSbqSGfy84qosMF5CIuPLadxXn';
    const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;

    try {
      const recaptchaResponse = await axios.post(verificationUrl);
      res.json(recaptchaResponse.data);
    } catch (error) {
      console.error('reCAPTCHA verification error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};