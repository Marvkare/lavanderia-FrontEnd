import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Row, Col, Spinner, Image, Modal } from 'react-bootstrap';

import Pedido from '../AdminServicios/Servicio';

const ContenedorServicios = () => {
  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPedidos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get('http://YOUR_API_IP/pedidos');
      setPedidos(response.data);
    } catch (err) {
      setError(err.message || 'Error fetching pedidos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Button variant="primary" onClick={fetchPedidos} disabled={loading}>
        {loading ? (
          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
        ) : (
          'Cargar Pedidos'
        )}
      </Button>

      {error && <p>{error}</p>}

      {!loading && pedidos.length === 0 && (
        <div className="no-pedidos">
          <p>No hay pedidos disponibles.</p>
          <Image src="ruta/a/tu/imagen.png" alt="No pedidos" />
        </div>
      )}

      <Row className="mt-3">
        {pedidos.map((pedido) => (
          <Col key={pedido.id} xs={12} md={6} lg={4} className="mb-3">
            <Pedido pedido={pedido} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ContenedorServicios;

