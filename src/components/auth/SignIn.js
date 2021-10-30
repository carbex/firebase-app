import FirebaseContext from "../../contexts/FirebaseContext";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiFillEye } from "react-icons/ai";
import Button from "react-bootstrap/Button";
import { Redirect } from 'react-router-dom'

const SignIn = (props) => {
  const [inputType, setInputType] = useState("password");
  const { user, firebase } = useContext(FirebaseContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
  } = useForm({
    mode: "onSubmit",
  });

  const onSubmit = async (data) => {
    const response = await firebase.emailLogin(data.email, data.password);
    if (response) {
      setError("firebase", {
        type: "manual",
        message: `${response.message}`,
      });
      const timer = setTimeout(() => {
        clearErrors("firebase");
      }, 5000);
      return () => {
        clearTimeout(timer);
      };
    }
  };
  if (user) return <Redirect to="/" />;
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "start",
        padding: "30px 30px 10px 30px",
        backgroundColor: "#f6f7fb",
        borderRadius: "0px 0px 10px 10px",
      }}
    >
      <Button
        variant="outline-primary"
        onClick={() => firebase.login("google")}
        style={{
          width: "100%",
          cursor: "pointer",
          marginBottom: "20px",
          padding: "5px",
        }}
      >
        Se connecter avec Google
      </Button>

      <Button
        variant="outline-primary"
        onClick={() => firebase.login("facebook")}
        style={{
          width: "100%",
          cursor: "pointer",
          marginBottom: "20px",
          padding: "5px",
        }}
      >
        Se connecter avec Facebook
      </Button>
      <p style={{ textAlign: "center", margin: "0 0 10px 0", width: "100%" }}>
        ----- ou -----
      </p>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <label style={{ fontSize: "12px" }}>E-mail</label>
        <input
          style={{ marginBottom: "10px" }}
          type="text"
          placeholder="john@doe.com"
          {...register("email", {
            required: "Veuillez saisir votre email.",
          })}
        />
        {errors.email && (
          <p style={{ color: "lightcoral", fontSize: "12px" }}>
            {errors.email.message}
          </p>
        )}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <label style={{ fontSize: "12px", marginTop: "10px" }}>
            Mot de passe
          </label>
          {inputType === "password" ? (
            <AiOutlineEye
              style={{ position: "absolute", top: "35px", right: "10px" }}
              onClick={() => setInputType("text")}
            />
          ) : (
            <AiFillEye
              style={{ position: "absolute", top: "35px", right: "10px" }}
              onClick={() => setInputType("password")}
            />
          )}
        </div>

        <input
          style={{ marginBottom: "10px" }}
          type={inputType}
          placeholder="********"
          {...register("password", {
            required: "Veuillez saisir votre mot de passe.",
          })}
        />
        {errors.password && (
          <p style={{ color: "lightcoral", fontSize: "12px" }}>
            {errors.password.message}
          </p>
        )}
        <Button
          variant="outline-primary"
          type="submit"
          disabled={isSubmitting}
          style={{
            width: "100%",
            cursor: "pointer",
            margin: "10px 0 20px 0",
            padding: "5px",
          }}
        >
          Connexion
        </Button>
      </form>
      {errors.firebase && (
        <p style={{ color: "lightcoral" }}>{errors.firebase.message}</p>
      )}
      <p>
        Vous n'avez pas encore de compte ?{" "}
        <span style={{ cursor: "pointer" }} onClick={props.handleSubmit}>
          S'inscrire
        </span>
      </p>
    </div>
  );
};

export default SignIn;
