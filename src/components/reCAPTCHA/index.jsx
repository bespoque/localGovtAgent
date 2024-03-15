import { useRef } from "react"
import ReCAPTCHA from "react-google-recaptcha"
import { verifyCaptcha } from "./ServerActions"
import { useRef, useState } from "react"

const index = () => {
  const recaptchaRef = useRef(null)
  const [isVerified, setIsverified] = useState(false)

  async function handleCaptchaSubmission(token) {
    // Server function to verify captcha
    await verifyCaptcha(token)
      .then(() => setIsverified(true))
      .catch(() => setIsverified(false))
  }
  return (
        <>
          <ReCAPTCHA
            sitekey="p6Lcm5DEoAAAAACu3aMDhOCy-exGdoem7QZ7k-FFq"
            ref={recaptchaRef}
            onChange={handleCaptchaSubmission}
          />
          <Button type="submit" disabled={!isVerified}>
            Submit feedback
          </Button>
        </>
    )
}
export default index;