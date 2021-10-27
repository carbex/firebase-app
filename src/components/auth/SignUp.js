import FirebaseContext from "../../contexts/FirebaseContext";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiFillEye } from "react-icons/ai";
import { Redirect } from "react-router-dom";
import Button from "react-bootstrap/Button";

const SignUp = (props) => {
  const { user, firebase } = useContext(FirebaseContext);
  const [inputType, setInputType] = useState({
    password: "password",
    confirmPassword: "password",
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
    clearErrors,
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    const response = await firebase.emailInscription(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
      data.confirmPassword
    );
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
    // <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     width: "100%",
    //     height: "100vh",
    //   }}
    // >
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
        // border: "1px solid lightgrey",
        backgroundColor: "lightgrey",
        // boxShadow: "5px 5px 5px grey",
        // maxWidth: "300px",
        // borderRadius: "10px",
      }}
    >
      <h2>Inscription</h2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          marginBottom: "20px",
          padding: "10px",
        }}
      >
        <form
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
          onSubmit={handleSubmit(onSubmit)}
        >
          <label style={{ fontSize: "12px", marginTop: "10px" }}>Prénom</label>
          <input
            style={{ marginBottom: "20px" }}
            type="text"
            placeholder="Votre prénom *"
            {...register("firstName", {
              required: "Veuillez saisir votre prénom.",
            })}
          />
          {errors.firstName && (
            <p style={{ color: "lightcoral", fontSize: "12px" }}>
              {errors.firstName.message}
            </p>
          )}
          <label style={{ fontSize: "12px", marginTop: "10px" }}>Nom</label>
          <input
            style={{ marginBottom: "20px" }}
            type="text"
            placeholder="Votre nom *"
            {...register("lastName", {
              required: "Veuillez saisir votre prénom.",
            })}
          />
          {errors.lastName && (
            <p style={{ color: "lightcoral", fontSize: "12px" }}>
              {errors.lastName.message}
            </p>
          )}
          <label style={{ fontSize: "12px", marginTop: "10px" }}>Email</label>
          <input
            style={{ marginBottom: "20px" }}
            type="text"
            placeholder="Votre email *"
            {...register("email", {
              required: "Veuillez saisir votre email.",
              pattern: {
                value:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "L'email n'est pas formaté correctement",
              },
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
            {inputType.password === "password" ? (
              <AiOutlineEye
                style={{ position: "absolute", top: "35px", right: "10px" }}
                onClick={() => setInputType({ ...inputType, password: "text" })}
              />
            ) : (
              <AiFillEye
                style={{ position: "absolute", top: "35px", right: "10px" }}
                onClick={() =>
                  setInputType({ ...inputType, password: "password" })
                }
              />
            )}
          </div>
          <input
            style={{ marginBottom: "20px" }}
            type={inputType.password}
            placeholder="*********"
            {...register("password", {
              required: "Veuillez saisir votre mot de passe.",
              minLength: {
                value: 8,
                message: "Vous devez entrer au moins 8 caractères",
              },
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  "Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial",
              },
            })}
          />
          {errors.password && (
            <p style={{ color: "lightcoral", fontSize: "12px" }}>
              {errors.password.message}
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
              Confirmation du mot de passe
            </label>
            {inputType.confirmPassword === "password" ? (
              <AiOutlineEye
                style={{ position: "absolute", top: "35px", right: "10px" }}
                onClick={() =>
                  setInputType({ ...inputType, confirmPassword: "text" })
                }
              />
            ) : (
              <AiFillEye
                style={{ position: "absolute", top: "35px", right: "10px" }}
                onClick={() =>
                  setInputType({
                    ...inputType,
                    confirmPassword: "password",
                  })
                }
              />
            )}
          </div>
          <input
            style={{ marginBottom: "20px" }}
            type={inputType.confirmPassword}
            placeholder="*********"
            {...register("confirmPassword", {
              required: "Veuillez confirmer votre mot de passe.",
              minLength: {
                value: 8,
                message: "Vous devez entrer au moins 8 caractères",
              },
              pattern: {
                value:
                  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
                message:
                  "Le mot de passe doit contenir au minimum une majuscule, une minuscule, un chiffre et un caractère spécial",
              },
            })}
          />
          {errors.confirmPassword && (
            <p style={{ color: "lightcoral", fontSize: "12px" }}>
              {errors.confirmPassword.message}
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
            S'inscrire
          </Button>
          <p>
            Vous avez déjà un compte ?{" "}
            <span style={{ cursor: "pointer" }} onClick={props.handleSubmit}>
              Se connecter
            </span>
          </p>
        </form>
        {errors.firebase && (
          <p style={{ color: "lightcoral" }}>{errors.firebase.message}</p>
        )}
      </div>
    </div>
    // </div>
  );
};

export default SignUp;
