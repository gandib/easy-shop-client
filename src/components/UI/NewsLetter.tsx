"use client";

import { useCreateNewsletter } from "@/src/hooks/newsletter.hook";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { mutate: createNewsletter, isSuccess } = useCreateNewsletter();

  const handleNewsletter = () => {
    const data = {
      email,
    };
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
      setError("Please enter a valid email!");
      toast(error);
    } else {
      setError("");
      createNewsletter({ email });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setEmail("");
    }
  }, [isSuccess]);

  return (
    <div>
      <section className="bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Stay Updated!
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Subscribe to our newsletter and never miss the latest updates and
            offers.
          </p>
          <div className="flex justify-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="px-4 py-2 w-72 rounded-l-md border border-r-0 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleNewsletter}
              disabled={!email}
              className="px-6 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsLetter;
