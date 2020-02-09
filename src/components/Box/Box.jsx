import React from 'react'

const Box = ({boxInformation}) => {
  return (
    <>
      <div className="toolsContent">
        <div className="code">
          <h2>Code:</h2>
          <div>{boxInformation.code}</div>
        </div>
        <div className="tools">
          {boxInformation.tools.map((tool, index) => (
            <div key={`tool-${index}`}>{tool.name}</div>
          ))}
        </div>
      </div>
    </>
  )
};

export {Box};
