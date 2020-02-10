import firebase from "../utils/firebase";

export const createBox = ({ name, tools }) => {
  // const [isLoading, setIsLoading] = useState(true);
  const geopoint = new firebase.firestore.GeoPoint(48.110182, -1.678994);

  return firebase
    .firestore()
    .collection('boxes')
    .add({
      name,
      geopoint,
      tools,
      code: 1234,
    })
};
