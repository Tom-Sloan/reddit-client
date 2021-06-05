import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Posts } from '../features/Posts/Posts'


export function BodySection() {
  
  return (
    <div className='bodySection'>
      <Posts />
    </div>
  );
}
