import React from 'react';

import { Container, Row, Col } from 'react-bootstrap';

function AboutUs() {
  return (
    <div className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
      <Container>
        <div className="text-center mb-5">
          <h1 className="display-4 mb-4" style={{ color: '#007bff', textShadow: '2px 2px 4px rgba(0,0,0,0.3)' }}>Welcome to Ishop</h1>
          
        </div>

        <section className="mb-5">
          <h2 className="section-header text-center mb-5" style={{ color: '#333' }}>Why Choose Us?</h2>
          <Row>
            <Col md={6} className="mb-4">
              <h4 style={{ color: '#007bff', textShadow: '1px 1px 2px rgba(0,0,0,0.3)', fontSize: '1.5rem' }}>Wide Selection</h4>
              <p style={{ fontSize: '1.1rem' }}>Discover thousands of products across multiple categories, ensuring that you find exactly what you're looking for.</p>
            </Col>
            <Col md={6} className="mb-4">
              <h4 style={{ color: '#007bff', textShadow: '1px 1px 2px rgba(0,0,0,0.3)', fontSize: '1.5rem' }}>Quality Assurance</h4>
              <p style={{ fontSize: '1.1rem' }}>We source our products from trusted suppliers, guaranteeing quality and authenticity with every purchase.</p>
            </Col>
            <Col md={6} className="mb-4">
              <h4 style={{ color: '#007bff', textShadow: '1px 1px 2px rgba(0,0,0,0.3)', fontSize: '1.5rem' }}>Convenience</h4>
              <p style={{ fontSize: '1.1rem' }}>Shop from the comfort of your own home, at any time that suits you. Our user-friendly interface makes browsing and purchasing a breeze.</p>
            </Col>
            <Col md={6} className="mb-4">
              <h4 style={{ color: '#007bff', textShadow: '1px 1px 2px rgba(0,0,0,0.3)', fontSize: '1.5rem' }}>Secure Transactions</h4>
              <p style={{ fontSize: '1.1rem' }}>Rest assured that your personal information is safe with us. We utilize state-of-the-art security measures to protect your data.</p>
            </Col>
          </Row>
        </section>
      </Container>
    </div>
  );
}

export default AboutUs;
