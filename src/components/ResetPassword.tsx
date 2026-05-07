import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { resetPassword } from "../lib/reset-password";

export function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get("token") || "";
  const role = params.get("role") || "student";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Нууц үг таарахгүй байна");
      return;
    }
    const result = await resetPassword(token, role, password);
    if (result.error) {
      setError(result.error);
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="max-w-md mx-auto py-20">
      <h2 className="text-2xl font-bold mb-6">Нууц үг солих</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Шинэ нууц үг"
          className="w-full border p-3 rounded-xl"
          required
        />
        <input
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          placeholder="Нууц үг давтах"
          className="w-full border p-3 rounded-xl"
          required
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button className="w-full py-3 bg-purple-600 text-white rounded-xl font-semibold">
          Хадгалах
        </button>
      </form>
    </div>
  );
}