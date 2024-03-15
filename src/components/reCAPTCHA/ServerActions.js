// "use server"

import axios from "axios"


export async function verifyCaptcha(recaptchaResponse) {
  try {
    const response = await fetch(`/api/recaptcha`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ recaptchaResponse }),
    });

    if (response.ok) {
      const data = await response.json();
    } else {
      // Handle server errors or invalid reCAPTCHA response
      console.error('Server returned an error:', response.status);
    }
  } catch (error) {
    // Handle network errors or other issues
    console.error('Fetch error:', error);
  }
}
