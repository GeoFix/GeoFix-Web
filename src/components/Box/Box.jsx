import React from 'react';
import './Box.scss';
import cross from '../../assets/cross.svg';

const Box = ({boxInformation,onClose}) => {
  console.log(boxInformation)
  return (
    <>
      <div className="toolsContent">
        <div className="absoluteCross" onClick={onClose}><img className="cross" src={cross}></img></div>
        <div className="code">
          <h2>Code:</h2>
          <div>{boxInformation.code}</div>
        </div>
        <div className="tools">
          {boxInformation.tools.map((tool, index) => {
            return (
            <div key={`tool-${index}`}>
              {/*<p>Tool icon: {tool.icon}</p>*/}
              <p> {tool.name}: {tool.count}</p></div>
          )})}
        </div>
      </div>
    </>
  )
};

export {Box};
