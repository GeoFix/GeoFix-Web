import React from 'react';
import {
  useParams
} from "react-router-dom";

import './BoxLayout.scss';
import illustration_loading from '../../assets/undraw_loading_frh4.svg';

import {useBox} from "../../hooks/useBox";
import {Box} from "../../components/Box";
import {SplashScreen} from "../../components/SplashScreen/SplashScreen";

/**
 * BoxLayout Component
 */
const BoxLayout = ({children}) => {
  const {id} = useParams();
  const {isLoading, box} = useBox(id);

  if (isLoading) {
    return <SplashScreen image={illustration_loading} message="Ouverture de la boîte..." blink />
  }

  return (
    <div className="box-layout">
      <Box boxInformation={box} />
    </div>
  );
};

BoxLayout.propTypes = {};

BoxLayout.defaultProps = {};

export default BoxLayout;
