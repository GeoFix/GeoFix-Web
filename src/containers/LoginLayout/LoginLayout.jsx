import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {Redirect} from 'react-router-dom';

import { InputField } from "../../UIElements/InputField";
import { Button } from "../../UIElements/Button";
import { useUserContext } from "../../hooks/useUserContext";

/**
 * LoginLayout Component
 */
const LoginLayout = () => {
  const { register: formRegister, handleSubmit, errors } = useForm({
    mode: "onBlur"
  });
  const [isLoading, setLoading] = useState(false);

  const { login, user } = useUserContext();

  if (user.uid) {
    return <Redirect to={{ pathname: '/' }} />
  }

  const onSubmit = ({ email, password }) => {
    if (isLoading) {
      return;
    }

    setLoading(true);

    login(email, password)
      .then(data => {
        console.log(data);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="login-layout">
      <h1>Connexion</h1>
      <form noValidate onSubmit={handleSubmit(onSubmit)}>
        <InputField
          label="Email"
          name="email"
          type="email"
          inputRef={formRegister({
            required: "Veuillez renseigner ce champ"
          })}
          error={errors.email}
        />
        <InputField
          label="Mot de passe"
          name="password"
          type="password"
          inputRef={formRegister({
            required: "Veuillez renseigner ce champ"
          })}
          error={errors.password}
        />

        <Button type="submit" label="Connexion" />
      </form>
    </div>
  );
};

LoginLayout.propTypes = {};

LoginLayout.defaultProps = {};

export default LoginLayout;
