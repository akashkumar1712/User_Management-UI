import React from "react"

const Logo = () => {
  return (
    <>
      <section className='head'>
        <div className='container flexSB'>
          <div className='logo'>
            {/* Use the correct path for the image */}
            <img src="/images/Main-logo.jpg" alt="Your Logo" style={{ width: 'auto', height: '50px' }} />
            <span style={{marginLeft: '10px',marginBottom: '2px' , color: "black"}}>ONLINE EXAMINATION PLATFORM</span>
          </div>

          <div className='social'>
            <i className='fab fa-facebook-f icon'></i>
            <i className='fab fa-instagram icon'></i>
            <i className='fab fa-twitter icon'></i>
            <i className='fab fa-youtube icon'></i>
          </div>
        </div>
      </section>
    </>
  )
}

export default Logo