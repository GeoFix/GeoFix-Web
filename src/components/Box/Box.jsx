    import React, { Component } from 'react'
    
    const Box = ({boxInformation}) =>{
        return (
            <>
                <div class="toolsContent">
                    <div class="code">
                        <h2>Code:</h2>
                        <div>{boxInformation.code}</div>
                    </div>
                    <div class="tools">
                        {boxInformation.tools.map(tool => {
                            return ( <div>{tool.name}</div>)
                        })}
                    </div>
                </div>
            </>
        )
    }
    