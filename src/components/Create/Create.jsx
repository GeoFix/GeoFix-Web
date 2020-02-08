import React, { Fragment } from 'react'
import { useForm } from 'react-hook-form'

export function Create() {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = data => { console.log(data) };

  return (
    <Fragment>
      <h1>Ajouter une boîte</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">Nom de la boîte</label>
        <input name="name" ref={register} />

        <label htmlFor="lat">Latitude</label>
        <input name="lat" ref={register} defaultValue="-1.6777926" />

        <label htmlFor="long">Longitude</label>
        <input name="long" ref={register} defaultValue="48.117266" />

        {/*{errors.exampleRequired && <span>This field is required</span>}*/}

        <input type="submit" />
      </form>
    </Fragment>
  )
}
