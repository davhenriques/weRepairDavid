import React from 'react'
import { Link } from 'react-router-dom'
import GetRequests from '../components/GetRequests'

export default function Home() {
  return (
    <div>
      <section className='homeBg'>
        <h1>Have a brokent laptop?</h1>  
        <h1><span>weRepair</span> it</h1>  
        <div className='sendResquestWrapper'>
          <p>Broken screen, Broken keyboard, Physical damage, Laptop crassing,... weRepair it all</p>
          <Link to="/repair"><span>Send a request</span></Link>
        </div>
      </section>
      <section id="sectionListRequests">
        <GetRequests />
      </section>
    </div>
  )
}
