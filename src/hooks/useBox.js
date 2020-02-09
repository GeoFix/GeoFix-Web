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
        const data = doc.data();

        const promises = data.tools.map((item)=> {
          return item.tool.get()
            .then(doc => ({
              ...doc.data(), 
              count: item.count,
            }));
          });

        Promise
          .all(promises)
          .then(
            tools => {
              setBox({
                id: doc.id,
                ...doc.data(),
                tools
              });
              setIsLoading(false);
            }
          )
      }, console.error.bind(console));
  }, [id]);

  return {isLoading, box};
};
