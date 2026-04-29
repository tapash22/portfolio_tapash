import { useState } from "react";

export function ContactForm() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });

  //   handle input field
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  //   handle submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Get existing data
    const existingData = JSON.parse(localStorage.getItem("contacts") || "[]");

    // Add new form data
    const updatedData = [...existingData, formData];

    // Save back to localStorage
    localStorage.setItem("contacts", JSON.stringify(updatedData));

    console.log("Saved:", formData);

    // Reset form
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-full max-w-4xl flex flex-col
                  space-y-0 sm:space-y-0 md:space-y-2 bg-(--background) 
                  px-1 py-2 sm:px-1 sm:py-2 md:p-8  opacity-90 rounded-lg"
    >
      <div
        className="flex flex-col md:flex-row 
          items-center justify-center w-full h-auto p-1 
          gap-4 md:gap-4"
      >
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          className=" placeholder:text-(--foreground) 
            placeholder:text-sm placeholder:font-light placeholder:tracking-wider 
            border-b-2 border-(--border) focus:border-(--muted) focus:outline-none focus:ring-0 
            px-3 py-2 rounded-sm text-(--foreground) w-full bg-(--sidebar)"
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          className=" placeholder:text-(--foreground) 
            placeholder:text-sm placeholder:font-light placeholder:tracking-wider 
            border-b-2 border-(--border) focus:border-(--muted) focus:outline-none focus:ring-0 
            px-3 py-2 rounded-sm text-(--foreground) w-full bg-(--sidebar)"
        />
      </div>

      <div className="flex justify-between items-center w-full h-auto p-1 ">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className=" placeholder:text-(--foreground) 
            placeholder:text-sm placeholder:font-light placeholder:tracking-wider 
            border-b-2 border-(--border) focus:border-(--muted) focus:outline-none focus:ring-0 
            px-3 py-2 rounded-sm text-(--foreground) w-full bg-(--sidebar)"
        />
      </div>
      <div className="flex justify-between items-center w-full h-auto p-1 ">
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={formData.subject}
          onChange={handleChange}
          className=" placeholder:text-(--foreground) 
            placeholder:text-sm placeholder:font-light placeholder:tracking-wider 
            border-b-2 border-(--border) focus:border-(--muted) focus:outline-none focus:ring-0 
            px-3 py-2 rounded-sm text-(--foreground) w-full bg-(--sidebar)"
        />
      </div>
      <div className="flex items-center w-full h-auto p-1 ">
        <textarea
          name="message"
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
      <div className="flex justify-center items-center w-full h-auto p-1">
        <button
          type="submit"
          className="
              bg-(--button-color) w-full sm:w-full md:w-auto px-0 md:px-5 py-2 
              rounded-sm text-(--foreground) shadow-none hover:shadow-(--box-shadow) 
              transition text-sm font-light tracking-wider uppercase"
        >
          Send Message
        </button>
      </div>
    </form>
  );
}
