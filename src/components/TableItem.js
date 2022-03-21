import React from "react";

const TableItem = (props) => {

    let baseUrl = 'https://www.youtube.com/watch?v=';
    let fullUrl = baseUrl + props.video

    return (
        <div className="tableItem">
            <img src={props.img}/>
            <p><strong>Flight Name:</strong> {props.name}</p>
            <p><strong>Launch Number:</strong> {props.launchNum}</p>
            <p><a href={fullUrl} target="_blank">Click to Watch</a></p>
        </div>
    );
}

export default TableItem 

