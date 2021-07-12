import React from 'react'
import './headerStyle.css'

function header(props) {
    return (
        <div>
          <ul>
              <li id={"title"}>Search Photos</li>
              <li>
                  
                  <input type="search" id={props.id} autoComplete="on" onChange={props.onSearchInputChange}></input>
                    <ul className="srch" id="recent">
                       {/* { props.lsData && <li>1{props.lsData[0]}</li>}
                       {props.lsData && <li>2{props.lsData[1]}</li>}
                        { props.lsData && <li>3{props.lsData[2]}</li>} */}
                    </ul>
                  </li>
              </ul>  
        </div>
    )
}

export default header
