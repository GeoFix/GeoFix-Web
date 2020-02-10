import {useEffect, useState} from "react";

import firebase from "../utils/firebase";

export const useBoxes = (tools) => {
  const [isLoading, setIsLoading] = useState(true);
  const [boxes, setBoxes] = useState([]);

  useEffect(() => {
    setIsLoading(true);

    firebase
      .firestore()
      .collection('/boxes')
      .get()
      .then((snap) => {
        let boxes = snap.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data()
          }));

        if (tools.length > 0) {
          boxes = boxes.filter(box => {
            return box.tools.find(tool => {
              return tools.includes(tool.tool.id);
            });
          });
        }

        setBoxes(boxes);

        setIsLoading(false);
      }, console.error.bind(console));
  }, [tools]);

  return {isLoading, boxes};
};
