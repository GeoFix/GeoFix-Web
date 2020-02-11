import { useEffect, useState } from 'react'

import firebase from '../utils/firebase'

export const useTools = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [tools, setTools] = useState([])

  useEffect(() => {
    setIsLoading(true)

    const unsubscribe = firebase
      .firestore()
      .collection('/tools')
      .onSnapshot(snap => {
        const boxes = snap.docs
          .map(doc => ({
            id: doc.id,
            ...doc.data(),
          }))

        setTools(boxes)

        setIsLoading(false)
      }, console.error.bind(console))

    return () => unsubscribe()
  }, [])

  return { isLoading, tools }
}
