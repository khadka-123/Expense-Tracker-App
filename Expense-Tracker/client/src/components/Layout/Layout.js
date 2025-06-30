import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div className="content">{children}</div> 
      <Footer />
    </>
  );
}

export default Layout;

// Now create a page where Layout will be the tag and the rest will be children.
