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
          {boxInformation.tools.map(tool => {
            return (<div>{tool.name}</div>)
          })}
        </div>
      </div>
    </>
  )
};

export {Box};
