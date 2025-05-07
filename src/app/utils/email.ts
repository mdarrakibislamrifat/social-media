import emailjs from "@emailjs/browser";

const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const sendResetCodeEmail = async (email: string) => {
  try {
    const passcode = generateOTP();
    const time = new Date(Date.now() + 15 * 60000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const result = await emailjs.send(
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
      {
        passcode,
        time,
        email,
      },
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
    );

    // Store the generated OTP in localStorage
    localStorage.setItem("resetCode", passcode);

    console.log("Email sent successfully:", result.text);
    return passcode;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
