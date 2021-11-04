import React, { useEffect, useState } from 'react';
import logo from '../../assets/img/logo.svg';
import Greetings from '../../containers/Greetings/Greetings';
import './Popup.css';

const Popup = () => {
  const [deals, setDeals] = useState([])
  useEffect(() => {
    fetch("https://arcane-brushlands-23456.herokuapp.com/api/deals", {
      method: 'get',
      headers: {
        'Accept': 'application/vnd.sleek.v1'
      },
    })
      .then(response => response.json())
      .then(data => setDeals(data))
  }, [])
  console.log({ deals })

  return (
    <div className="App">
      {deals.map((deal) => {
        return (
          <p key={deal.id} style={{ color: 'white' }}>{deal.retailer.name}</p>
        )
      })}
    </div>
  );
};

export default Popup;
