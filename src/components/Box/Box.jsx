import React from 'react';
import './Box.scss';
import cross from '../../assets/cross.svg';
import {Map} from "../Map";
import {InputField} from "../../UIElements/InputField";

const Box = ({boxInformation,onClose}) => {
  console.log(boxInformation)
  return (
    <>
      <div className="absoluteCross" onClick={onClose}><img className="cross" src={cross}></img></div>
      <h1>Boîte</h1>
      <form action="">
        <fieldset>
          <legend>Informations</legend>
          <div className="map-container">
            <Map
              className="create-box-map"
              markers={[{
                lat: boxInformation.geopoint.latitude,
                long: boxInformation.geopoint.longitude,
                id: '1234',
              }]}
              center={[boxInformation.geopoint.longitude, boxInformation.geopoint.latitude]}
              controls={false}
            />
          </div>

          <p>Code : {boxInformation.code}</p>
        </fieldset>

        <fieldset>
          <legend>Outils disponibles</legend>

          {boxInformation.tools.map(({ id, name, count }) => (
            <InputField
              label={name+'(s)'}
              name={id}
              disabled={true}
              type="number"
              defaultValue={count}
              key={id}
            />
          ))}
        </fieldset>
      </form>
    </>
  )
};

export {Box};
