import {useEffect, useState} from "react";

import firebase from "../utils/firebase";

export const useBox = (id) => {
  const [isLoading, setIsLoading] = useState(true);
  const [box, setBox] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    firebase
      .firestore()
      .doc(`/boxes/${id}`)
      .get()
      .then((doc) => {
        setBox({
          id: doc.id,
          ...doc.data(),
        });

        setIsLoading(false);
      }, console.error.bind(console));
  }, [id]);

  return {isLoading, box};
};
