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
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col space-y-4 w-full h-full max-w-4xl bg-(--background) p-8 my-2 opacity-90 "
      >
        <div className="flex justify-between items-center w-full h-auto p-2 space-x-3 ">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className=" placeholder:text-(--foreground) 
            placeholder:text-sm placeholder:font-light placeholder:tracking-wider 
            ring-1 ring-(--border) px-3 py-2 rounded-lg text-(--foreground) w-full bg-(--sidebar)"
          />

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className=" placeholder:text-(--foreground) 
            placeholder:text-sm placeholder:font-light placeholder:tracking-wider 
            ring-1 ring-(--border) px-3 py-2 rounded-lg text-(--foreground) w-full bg-(--sidebar)"
          />
        </div>

        <div className="flex justify-between items-center w-full h-auto p-2 ">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className=" placeholder:text-(--foreground) 
            placeholder:text-sm placeholder:font-light placeholder:tracking-wider 
            ring-1 ring-(--border) px-3 py-2 rounded-lg text-(--foreground) w-full bg-(--sidebar)"
          />
        </div>
        <div className="flex justify-between items-center w-full h-auto p-2 ">
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className=" placeholder:text-(--foreground) 
            placeholder:text-sm placeholder:font-light placeholder:tracking-wider 
            ring-1 ring-(--border) px-3 py-2 rounded-lg text-(--foreground) w-full bg-(--sidebar)"
          />
        </div>
        <div className="flex items-center w-full h-auto p-2 ">
          <textarea
            name="message"
            placeholder="Message"
            value={formData.message}
            onChange={handleChange}
            className=" placeholder:text-(--foreground) 
            placeholder:text-sm placeholder:font-light placeholder:tracking-wider 
            ring-1 ring-(--border) px-3 py-2 rounded-lg text-(--foreground) w-full bg-(--sidebar)"
          />
        </div>
        <div className="flex justify-center items-center w-full h-auto p-2 ">
          <button
            type="submit"
            className="
            bg-(--button-color) px-5 py-3 
            rounded-xl text-(--foreground) shadow-none hover:shadow-(--box-shadow) 
            transition text-sm font-light tracking-widest uppercase"
          >
            Send Message
          </button>
        </div>
      </form>
    </>
  );
}
