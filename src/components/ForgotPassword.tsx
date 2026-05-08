import { useState } from "react";
import { sendPasswordReset } from "../lib/reset-password";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await sendPasswordReset(email);
    if (result.error) {
      setError(result.error);
    } else {
      setSent(true);
    }
  };

  if (sent) return (
    <div className="max-w-md mx-auto py-20 text-center">
      <h2 className="text-2xl font-bold mb-4">Имэйл илгээгдлээ!</h2>
      <p className="text-gray-600">Нууц үг сэргээх холбоосыг имэйлээр илгээлээ. 30 минутын дотор ашиглана уу.</p>
    </div>
  );

  return (
    <div className="max-w-md mx-auto py-20">
      <h2 className="text-2xl font-bold mb-6">Нууц үг мартсан</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Имэйл хаяг"
          className="w-full border p-3 rounded-xl"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="w-full py-3 bg-purple-600 text-white rounded-xl font-semibold">
          Холбоос илгээх
        </button>
      </form>
    </div>
  );
}