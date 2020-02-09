import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from "react-router-dom";
import firebase from "../../utils/firebase";
import { Button, ButtonLink, InputField } from '../../UIElements';
import { useTools } from "../../hooks/useTools";
import { createBox } from "../../hooks/createBox";
import { Map } from "../Map";

import './Create.css'

export function Create() {
  const { register, handleSubmit, errors } = useForm();
  const { tools, isLoading } = useTools();
  const history = useHistory();

  const position = {
    coords: {
      latitude: 48.110182,
      longitude: -1.678994,
    }
  };

  const onSubmit = data => {
    const newTools = tools.map(({ id }) => (
      {
        tool: firebase.firestore().collection('tools').doc(id),
        count: data[id],
      }
    ));

    createBox({ name: data.name, tools: newTools })
    history.push('/')
  };

  return (
    <Fragment>
      <h1>Ajouter une boîte</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        <fieldset>
          <legend>Informations</legend>

          <InputField label="Nom de la boîte" name="name" inputRef={register({ required: true })} error={errors.name} />

          <p>Position</p>
          <div className="map-container">
            <Map
              className="create-box-map"
              position={position}
              markers={[{
                lat: position.coords.latitude,
                long: position.coords.longitude,
                id: '1234',
              }]}
              center={[position.coords.longitude, position.coords.latitude]}
              controls={false}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Outils disponibles</legend>

          {tools.map(({ id, name }) => (
            <InputField
              label={name}
              name={id}
              inputRef={register}
              error={errors[name]}
              type="number"
              defaultValue={0}
              key={id}
            />
          ))}
        </fieldset>

        <span className="button-field">
          <ButtonLink label="Annuler" link="/" />
          <Button label="Valider" type="submit" />
        </span>
      </form>
    </Fragment>
  )
}
