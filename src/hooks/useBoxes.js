import {useEffect, useState} from "react";

import firebase from "../utils/firebase";

export const useBoxes = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    const unsubscribe = firebase
      .firestore()
      .collection('/boxes')
      .onSnapshot((snap) => {
        const boxes = snap.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));

        setBoxes(boxes);

        setIsLoading(false);
      }, console.error.bind(console));

    return () => unsubscribe();
  }, []);

  return {isLoading, boxes};
};
