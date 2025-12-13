import React from "react";

import Navbar from '../components/navbar/NavBar';
import Hero from '../components/hero/Hero';
import "./Home.css"
import AuctionsList from './auctions/AuctionsList';


export default function Home() {
  return (
    
      <><Navbar /><Hero /><AuctionsList /></>
    
  );
}
