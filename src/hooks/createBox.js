import {useEffect, useState} from "react";

import firebase from "../utils/firebase";
import {slugify} from "../utils/format";

export const createBox = (data) => {
  // const [isLoading, setIsLoading] = useState(true);
  const id = slugify(data.name);
  const position = {
    coords: {
      latitude: 48.110182,
      longitude: -1.678994,
    }
  };

  useEffect(() => {
    // setIsLoading(true);

    firebase
      .ref(`/boxes/${id}`)
      .set({
        id,
        name: data.name,
        geopoint: {
          lat: position.coords.latitude,
          long: position.coords.longitude,
        },
        tools: data.tools,
      })
      .then(test => console.log(test), console.error.bind(console));
  }, []);

  // return {isLoading, boxes};
};
