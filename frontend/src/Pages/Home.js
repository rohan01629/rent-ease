import React from 'react'
import { Link } from "react-router-dom";
import Footer from '../components/Footer'
import Cards from '../components/cards';

export default function Home() {
  return (
    <div>
        <div>
            <Cards />
      <Footer />
      </div>
    </div>
  )
}
