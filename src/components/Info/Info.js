import React from 'react';
import './Info.css';
import { useParams } from 'react-router-dom';
 
export const Info = () => {

    const {id} = useParams()
 return (
<div>Info {id}</div>
 );
};