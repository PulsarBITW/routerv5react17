import { useState } from "react";

import { Bob, John, MILFHunter, currentUserStore } from "@entities/currentUser";
import { authenticateByCredentials, Credentials } from "@features/auth";

export const LoginPage = () => {
  const [form, setForm] = useState<Credentials>({ login: "", password: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const user = await authenticateByCredentials(form);
      setError(null);
      setIsLoading(false);
      currentUserStore.setState(user);
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("error");
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="input-group">
          <label>Login</label>
          <input
            type="text"
            name="login"
            value={form.login}
            onChange={handleChange}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            autoComplete="on"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        {error && <div className="error-text">{error}</div>}
        <button type="submit" disabled={isLoading}>
          Submit
        </button>
      </form>

      <div className="test-credentials">
        <p>For testing, you can use the following credentials:</p>
        <p>
          Login: <strong>{Bob.login}</strong> | Password:
          <strong>{Bob.password}</strong>
        </p>
        <p>
          Login: <strong>{John.login}</strong> | Password:
          <strong>{John.password}</strong>
        </p>
        <p>
          Login: <strong>{MILFHunter.login}</strong> | Password:
          <strong>{MILFHunter.password}</strong>
        </p>
      </div>
    </div>
  );
};
