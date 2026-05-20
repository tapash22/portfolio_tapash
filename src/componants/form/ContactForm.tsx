import { useEffect, useState } from "react";

type FormStatus = "IDLE" | "PENDING" | "SUCCESS" | "ERROR";

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>("IDLE");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  // Handle input change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset alert after few seconds
  useEffect(() => {
    if (status === "SUCCESS" || status === "ERROR") {
      const timer = setTimeout(() => {
        setStatus("IDLE");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [status]);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setStatus("PENDING");

    try {
      const form = e.currentTarget;

      const response = await fetch("https://formspree.io/f/xlgvjwre", {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus("SUCCESS");

        // Reset fields
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          subject: "",
          message: "",
        });

        form.reset();
      } else {
        setStatus("ERROR");
      }
    } catch (error) {
      console.error("Form submit error:", error);
      setStatus("ERROR");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        w-full h-full max-w-4xl flex flex-col
        space-y-2 bg-(--background)
        px-2 py-3 md:p-8
        opacity-90 rounded-lg
      "
    >
      {/* First + Last Name */}
      <div
        className="
          flex flex-col md:flex-row
          items-center justify-center
          w-full gap-4
        "
      >
        <input
          type="text"
          name="firstName"
          required
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className="
            w-full bg-(--sidebar)
            border-b-2 border-(--border)
            focus:border-(--muted)
            focus:outline-none
            px-3 py-2 rounded-sm
            text-(--foreground)
            placeholder:text-(--foreground)
            placeholder:text-sm
            placeholder:font-light
            placeholder:tracking-wider
          "
        />

        <input
          type="text"
          name="lastName"
          required
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className="
            w-full bg-(--sidebar)
            border-b-2 border-(--border)
            focus:border-(--muted)
            focus:outline-none
            px-3 py-2 rounded-sm
            text-(--foreground)
            placeholder:text-(--foreground)
            placeholder:text-sm
            placeholder:font-light
            placeholder:tracking-wider
          "
        />
      </div>

      {/* Email */}
      <input
        type="email"
        name="email"
        required
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        className="
          w-full bg-(--sidebar)
          border-b-2 border-(--border)
          focus:border-(--muted)
          focus:outline-none
          px-3 py-2 rounded-sm
          text-(--foreground)
          placeholder:text-(--foreground)
          placeholder:text-sm
          placeholder:font-light
          placeholder:tracking-wider
        "
      />

      {/* Subject */}
      <input
        type="text"
        name="subject"
        required
        placeholder="Subject"
        value={formData.subject}
        onChange={handleChange}
        className="
          w-full bg-(--sidebar)
          border-b-2 border-(--border)
          focus:border-(--muted)
          focus:outline-none
          px-3 py-2 rounded-sm
          text-(--foreground)
          placeholder:text-(--foreground)
          placeholder:text-sm
          placeholder:font-light
          placeholder:tracking-wider
        "
      />

      {/* Message */}
      <textarea
        name="message"
        required
        rows={6}
        placeholder="Message"
        value={formData.message}
        onChange={handleChange}
        className="
          w-full bg-(--sidebar)
          border-b-2 border-(--border)
          focus:border-(--muted)
          focus:outline-none
          px-3 py-2 rounded-sm
          text-(--foreground)
          placeholder:text-(--foreground)
          placeholder:text-sm
          placeholder:font-light
          placeholder:tracking-wider
          resize-none
        "
      />

      {/* Success Message */}
      {status === "SUCCESS" && (
        <p
          className="
            text-xs text-green-400
            font-light tracking-wide
            text-center my-2
          "
        >
          Your message has been sent successfully.
        </p>
      )}

      {/* Error Message */}
      {status === "ERROR" && (
        <p
          className="
            text-xs text-red-400
            font-light tracking-wide
            text-center my-2
          "
        >
          Something went wrong. Please try again.
        </p>
      )}

      {/* Submit Button */}
      <div className="flex justify-center items-center w-full">
        <button
          type="submit"
          disabled={status === "PENDING"}
          className="
            bg-(--button-color)
            w-full md:w-auto
            px-6 py-2
            rounded-sm
            text-(--foreground)
            hover:shadow-(--box-shadow)
            disabled:opacity-50
            disabled:cursor-not-allowed
            transition
            text-sm font-light
            tracking-wider uppercase
          "
        >
          {status === "PENDING" ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
