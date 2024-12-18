import { useState } from "react";
import { NavLink } from "react-router";
import styles from "./Auth.module.scss";
import "@styles/fonts.scss";

type Props = {
  isRegistering: boolean;
};

type FormData = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export default function Auth({ isRegistering = true }: Props) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  return (
    <main className={styles.main}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h1 className={styles.title}>{isRegistering ? "Register" : "Login"}</h1>
        <fieldset className={styles.fieldset}>
          {isRegistering && (
            <input
              className={styles.input}
              placeholder="Name"
              type="Name"
              value={styles.email}
              name="name"
              id="name"
              onChange={handleChange}
            />
          )}

          <input
            className={styles.input}
            placeholder="Email"
            type="email"
            value={styles.email}
            name="email"
            id="email"
            onChange={handleChange}
          />
          <input
            className={styles.input}
            placeholder="Password"
            type="password"
            value={formData.password}
            name="password"
            id="password"
            onChange={handleChange}
          />
          {isRegistering && (
            <input
              className={styles.input}
              placeholder="Confirm your password"
              type="password"
              value={formData.passwordConfirm}
              name="password-confirm"
              id="password-confirm"
              onChange={handleChange}
            />
          )}
          <button className={styles.btnSubmit} type={"submit"}>
            {isRegistering ? "Register" : "Login"}
          </button>
        </fieldset>

        <footer className={styles.footer}>
          {!isRegistering ? (
            <>
              Don't have an account?{" "}
              <NavLink className={styles.link} to="/register" end>
                Sign up
              </NavLink>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <NavLink className={styles.link} to="/login" end>
                Login
              </NavLink>
            </>
          )}
        </footer>
      </form>
    </main>
  );
}
