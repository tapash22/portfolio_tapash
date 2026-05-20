import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  // Track the submission states visually
  const [status, setStatus] = useState<
    "IDLE" | "PENDING" | "SUCCESS" | "ERROR"
  >("IDLE");

  // handle input field
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      ...prev,
      [name]: value,
    }));
  };

  // handle submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("PENDING");

    try {
      // 🎯 FORMSPREE INTEGRATION:
      // Replace 'YOUR_FORMSPREE_FORM_ID' with the hash id Formspree provides you.
      // (e.g., https://formspree.io/f/mqkvwenz)
      const response = await fetch("https://formspree.io/f/mbdbgyzo", {
        method: "POST",
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        }),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("SUCCESS");
        // Reset form fields on success
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setStatus("ERROR");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      setStatus("ERROR");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full max-w-4xl flex flex-col
                 space-y-0 sm:space-y-0 md:space-y-2 bg-(--background) 
                 px-1 py-2 sm:px-1 sm:py-2 md:p-8 opacity-90 rounded-lg"
    >
      <div
        className="flex flex-col md:flex-row 
          items-center justify-center w-full h-auto p-1 
          gap-4 md:gap-4"
      >
        <input
          type="text"
          name="firstName"
          required
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="placeholder:text-(--foreground) 
            placeholder:text-sm placeholder:font-light placeholder:tracking-wider 
            border-b-2 border-(--border) focus:border-(--muted) focus:outline-none focus:ring-0 
            px-3 py-2 rounded-sm text-(--foreground) w-full bg-(--sidebar)"
        />

        <input
          type="text"
          name="lastName"
          required
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="placeholder:text-(--foreground) 
            placeholder:text-sm placeholder:font-light placeholder:tracking-wider 
            border-b-2 border-(--border) focus:border-(--muted) focus:outline-none focus:ring-0 
            px-3 py-2 rounded-sm text-(--foreground) w-full bg-(--sidebar)"
        />
      </div>

      <div className="flex justify-between items-center w-full h-auto p-1 ">
        <input
          type="email"
          name="email"
          required
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="placeholder:text-(--foreground) 
            placeholder:text-sm placeholder:font-light placeholder:tracking-wider 
            border-b-2 border-(--border) focus:border-(--muted) focus:outline-none focus:ring-0 
            px-3 py-2 rounded-sm text-(--foreground) w-full bg-(--sidebar)"
        />
      </div>
      <div className="flex justify-between items-center w-full h-auto p-1 ">
        <input
          type="text"
          name="subject"
          required
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className="placeholder:text-(--foreground) 
            placeholder:text-sm placeholder:font-light placeholder:tracking-wider 
            border-b-2 border-(--border) focus:border-(--muted) focus:outline-none focus:ring-0 
            px-3 py-2 rounded-sm text-(--foreground) w-full bg-(--sidebar)"
        />
      </div>
      <div className="flex items-center w-full h-auto p-1 ">
        <textarea
          name="message"
          required
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
          className="
                placeholder:text-(--foreground)
                placeholder:text-sm placeholder:font-light placeholder:tracking-wider
                border-b-2 border-(--border)
                focus:border-(--muted)
                focus:outline-none
                focus:ring-0
                px-3 py-2
                rounded-sm
                text-(--foreground)
                w-full
                bg-(--sidebar)
              "
        />
      </div>

      {/* 🎯 CONTEXT STATUS NOTIFIER ALERTS */}
      {status === "SUCCESS" && (
        <p className="text-xs text-green-400 font-light tracking-wide text-center my-2">
          Your message has been sent successfully! I will get back to you
          shortly.
        </p>
      )}
      {status === "ERROR" && (
        <p className="text-xs text-red-400 font-light tracking-wide text-center my-2">
          Something went wrong. Please check your network connection and try
          again.
        </p>
      )}

      <div className="flex justify-center items-center w-full h-auto p-1">
        <button
          type="submit"
          disabled={
            status === "PENDING"
          } /* 🎯 FIXED: Only blocks double clicks while transmitting */
          className="
              bg-(--button-color) w-full sm:w-full md:w-auto px-0 md:px-5 py-2 
              rounded-sm text-(--foreground) shadow-none hover:shadow-(--box-shadow) 
              disabled:opacity-50 disabled:cursor-not-allowed
              transition text-sm font-light tracking-wider uppercase"
        >
          {status === "PENDING" ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
