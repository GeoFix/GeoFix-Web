import React from 'react';
import './Box.scss';
import cross from '../../assets/cross.svg';

const Box = ({boxInformation}) => {
  return (
    <>
      <div className="toolsContent">
        <div className="absoluteCross"><img className="cross" src={cross}></img></div>
        <div className="code">
          <h2>Code:</h2>
          <div>{boxInformation.code}</div>
        </div>
        <div className="tools">
          {boxInformation.tools.map((tool, index) => (
            <div key={`tool-${index}`}><p>Tool icon: {tool.icon}</p><p>Tool: {tool.name}</p></div>
          ))}
        </div>
      </div>
    </>
  )
};

export {Box};
