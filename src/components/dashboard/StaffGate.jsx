import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../common/Button";

export default function StaffGate({ children }) {
  const { user, loading, signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSubmitting(true);
    try {
      await signIn(email, password);
    } catch {
      setError("Email or password is incorrect.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="px-5 py-24 text-center text-sm text-espresso-700/60">
        Checking staff session…
      </div>
    );
  }

  if (user) return children;

  return (
    <div className="mx-auto flex max-w-sm flex-col items-center px-5 py-24 text-center">
      <h1 className="font-display text-3xl text-espresso-900">Staff Login</h1>
      <p className="mt-2 text-sm text-espresso-700/70">
        This area is for Noevia Cafe staff only.
      </p>
      <form onSubmit={handleSubmit} className="mt-8 w-full space-y-3">
        <input
          type="email"
          autoFocus
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-espresso-800/20 bg-latte-100 px-4 py-2.5 text-center outline-none focus:border-clay"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-espresso-800/20 bg-latte-100 px-4 py-2.5 text-center outline-none focus:border-clay"
        />
        {error && <p className="text-sm text-clay">{error}</p>}
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Signing in…" : "Sign In"}
        </Button>
      </form>
      <p className="mt-6 text-xs text-espresso-700/50">
        Staff accounts are created in the Firebase console under
        Authentication → Users — see README.
      </p>
    </div>
  );
}
