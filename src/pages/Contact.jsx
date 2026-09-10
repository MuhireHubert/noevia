import { useState } from "react";
import Button from "../components/common/Button";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="mx-auto max-w-5xl px-5 py-16">
      <h1 className="font-display text-4xl text-espresso-900">
        Contact &amp; Reservations
      </h1>
      <p className="mt-2 text-espresso-700/80">
        Booking a table for a group, or just have a question? Send us a note.
      </p>

      <div className="mt-10 grid gap-10 md:grid-cols-2">
        <div>
          {submitted ? (
            <div className="rounded-2xl border border-sage/30 bg-sage/10 p-6 text-espresso-900">
              <p className="font-semibold">Thanks — we got your message!</p>
              <p className="mt-1 text-sm text-espresso-800/80">
                We'll get back to you shortly to confirm.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-espresso-800">
                  Name
                </label>
                <input
                  required
                  type="text"
                  className="w-full rounded-xl border border-espresso-800/20 bg-latte-100 px-4 py-2.5 outline-none focus:border-clay"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-espresso-800">
                  Email
                </label>
                <input
                  required
                  type="email"
                  className="w-full rounded-xl border border-espresso-800/20 bg-latte-100 px-4 py-2.5 outline-none focus:border-clay"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-espresso-800">
                    Date
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-xl border border-espresso-800/20 bg-latte-100 px-4 py-2.5 outline-none focus:border-clay"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-espresso-800">
                    Party size
                  </label>
                  <input
                    type="number"
                    min="1"
                    defaultValue={2}
                    className="w-full rounded-xl border border-espresso-800/20 bg-latte-100 px-4 py-2.5 outline-none focus:border-clay"
                  />
                </div>
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-espresso-800">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-xl border border-espresso-800/20 bg-latte-100 px-4 py-2.5 outline-none focus:border-clay"
                />
              </div>
              <Button type="submit">Send Message</Button>
            </form>
          )}
        </div>

        <div className="space-y-4">
          <div className="overflow-hidden rounded-2xl border border-espresso-800/10">
            <iframe
              title="Noevia Cafe location"
              src="https://www.google.com/maps?q=Kigali,Rwanda&output=embed"
              className="h-72 w-full"
              loading="lazy"
            />
          </div>
          <div className="rounded-2xl bg-latte-100 p-6 text-sm text-espresso-800/90">
            <p>12 Kiyovu Road, Kigali, Rwanda</p>
            <p className="mt-1">+250 788 000 000</p>
            <p className="mt-1">hello@noeviacafe.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
