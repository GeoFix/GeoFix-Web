import { useEffect, useState } from 'react'

import firebase from '../utils/firebase'

export const useBoxes = tools => {
  const [isLoading, setIsLoading] = useState(true)
  const [boxes, setBoxes] = useState([])

  useEffect(() => {
    setIsLoading(true)

    firebase
      .firestore()
      .collection('/boxes')
      .get()
      .then(snap => {
        let newBoxes = snap.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))

        if (tools.length > 0) {
          newBoxes = boxes.filter(box => box.tools.find(tool => tools.includes(tool.tool.id)))
        }

        setBoxes(newBoxes)

        setIsLoading(false)
      }, console.error.bind(console))
  }, [tools])

  return { isLoading, boxes }
}
