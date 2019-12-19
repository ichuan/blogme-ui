import React from 'react';
import bg from '../../assets/images/header-bg.jpg';


const styles = {
  header: {
    backgroundImage: `url(${bg})`,
    padding: '80px 100px',
  },
}


export default function Header() {
  return (
    <div style={styles.header}>
      <p>Hello, world</p>
    </div>
  )
}
