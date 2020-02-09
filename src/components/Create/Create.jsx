import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { Button, ButtonLink, InputField } from '../../UIElements';
import { Map } from "../Map";

import './Create.css'

export function Create() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => { console.log(data) };
  const position = {
    coords: {
      latitude: 48.110182,
      longitude: -1.678994,
    }
  };

  return (
    <Fragment>
      <h1>Ajouter une boîte</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        <fieldset>
          <legend>Informations</legend>

          <InputField label="Nom de la boîte" name="name" inputRef={register({ required: true })} error={errors.name} />

          <Map
            position={position}
            markers={{
              lat: position.coords.latitude,
              long: position.coords.longitude,
              id: '1234',
            }}
          />
        </fieldset>

        <fieldset>
          <legend>Outils disponibles</legend>

          <InputField label="Pompe à vélo" name="pump" inputRef={register} error={errors.pump} type="checkbox" />
        </fieldset>

        <span className="button-field">
          <ButtonLink label="Annuler" link="/" />
          <Button label="Valider" type="submit" />
        </span>
      </form>
    </Fragment>
  )
}
