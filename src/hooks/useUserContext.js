import React, { createContext, useContext, useEffect, useState } from 'react';

import firebase from '../utils/firebase';

export const UserContext = createContext(null);

const UserProvider = (props) => {
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState(false);
  const [uid, setUid] = useState(false);

  const createOrUpdateUserDB = (user) => {
    return firebase
      .firestore()
      .collection('users')
      .doc(user.uid)
      .set(user, { merge: true });
  };

  useEffect(() => {
    if (!uid) {
      return;
    }

    setLoading(true);

    return firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot(snap => {
        if (!snap.exists) {
          return;
        }

        setLoading(false);
        setUser(snap.data());
      });
  }, [uid]);

  useEffect(() => {
    setLoading(true);

    return firebase.auth().onAuthStateChanged(auth => {
      if (auth) {
        if (auth.emailVerified) {
          setUid(auth.uid);
          return;
        }
      }

      setLoading(false);
      setUid(false);
    });
  }, []);

  const logout = () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        setUser(false);
      });
  };

  const login = (email, password) => {
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        if (!response.user) {
          return;
        }

        if (!response.user.emailVerified) {
          alert('Veuillez vérifier votre compte');
          // toast.warn(t('accountNotVerified'));
          return;
        }

        setUid(response.user.uid);
      })
      .catch(e => {
        alert(`Une erreur s'est produite : ${e.code}`);
        // toast.error(t(e.code));

        throw e.code;
      });
  };

  const register = (
    email,
    password,
    newUser
  ) => {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        if (!response.user) {
          return;
        }

        newUser.uid = response.user.uid;
        response.user.sendEmailVerification();

        createOrUpdateUserDB(newUser).then(() => {
          alert('Votre compte a bien été créé');
        });
      })
      .catch(e => {
        alert(`Une erreur s'est produite : ${e.code}`);

        throw e.code;
      });
  };

  const updateUser = (newUser) => {
    return createOrUpdateUserDB(newUser)
      .then(() => {
        alert('Votre compte a bien été modifié');
      })
      .catch(e => {
        alert(`Une erreur s'est produite : ${e.code}`);

        throw e.code;
      });
  };

  const resetPassword = (email) => {
    return firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        alert('Un email vous a été envoyé pour réinitialiser votre mot de passe');
      })
      .catch(e => {
        alert(`Une erreur s'est produite : ${e.code}`);

        throw e.message;
      });
  };

  const userValue = {
    user,
    isLoading,
    login,
    logout,
    updateUser,
    register,
    resetPassword,
  };

  return <UserContext.Provider value={userValue} {...props} />;
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;
