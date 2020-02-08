import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { InputField } from '../../UIElements/InputField';

export function Create() {
  const { register, handleSubmit } = useForm();
  const onSubmit = data => { console.log(data) };

  return (
    <Fragment>
      <h1>Ajouter une boîte</h1>
      <form onSubmit={handleSubmit(onSubmit)}>

        <InputField label="Nom de la boîte" name="name" inputRef={register} required />

        <fieldset>
          <legend>Outils disponibles</legend>

          <InputField label="Pompe à vélo" name="pump" inputRef={register} type="checkbox" />
        </fieldset>

        {/*{errors.exampleRequired && <span>This field is required</span>}*/}

        <input type="submit" />
      </form>
    </Fragment>
  )
}
