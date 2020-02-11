import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Loading } from '../../assets/illustrations'

import './BoxLayout.scss'

import useBox from '../../hooks/useBox'
import { Box } from '../../components/Box'

import SplashScreen from '../../components/SplashScreen'

/**
 * BoxLayout Component
 */
const BoxLayout = ()  => {
  const { id } = useParams()
  const { isLoading, box } = useBox(id)
  const history = useHistory()


  if (isLoading) {
    return <SplashScreen image={Loading} message="Ouverture de la boîte..." blink />
  }

  const onCloseEvent = () => {
    history.push('/')
  }

  return (
    <div className="box-layout">
      <Box boxInformation={box} onClose={onCloseEvent} />
    </div>
  )
}

BoxLayout.propTypes = {}

BoxLayout.defaultProps = {}

export default BoxLayout
