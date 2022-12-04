import React from 'react'
import propTypes from "prop-types";
import { Link } from "react-router-dom";

function Buttons(props) {

    const onClick = () => {
        // cek dulu props yang dikirim, jika ada baru eksekusi
        if (props.onClick) props.onClick();
    }

    if (props.isDisabled || props.isLoading) {
        return (
            <span className={props.className} style={props.style}>
                {props.isLoading ? (
                    <span>Loading ...</span>
                ) : (props.children)}
            </span>
        )
    }

    if (props.type === 'link') {
        if (props.isExternal) {
            return (
                <a href={props.href} className={props.className} style={props.style} >{props.children}</a>
            )
        }else{
            return (
                <Link to={props.href} className={props.className} style={props.style} onClick={onClick} >{props.children}</Link>
            )
        }
    }


  return (
    <button className={props.className} style={props.style} onClick={onClick} >{props.children}</button>
  )
}

export default Buttons

Buttons.propTypes = {
    type : propTypes.oneOf(['button','link']),
    onClick : propTypes.func,
    isExternal : propTypes.bool,
    href : propTypes.string,
    target : propTypes.string,
    className : propTypes.string,
    isDisabled : propTypes.bool,
    isLoading : propTypes.bool,
}