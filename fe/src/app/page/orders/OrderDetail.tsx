import React from 'react'
import { useLocation } from 'react-router-dom';

export default function OrderDetail(props: any) {
    const location = useLocation();
    const { order } = location.state as { order: any};
    console.log(order);
  return (
    <div>OrderDetail</div>
  )
}
