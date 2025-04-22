import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import './pageStyling.css';

export default function OrderHistory() {
  const { accessToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!accessToken) {
        navigate("/sign-in", { state: { message: "Please sign in to view your order history." } });
      return;
    }

    // Simulated data toggle
    const SIMULATE_ORDERS = false;

    const allOrders = SIMULATE_ORDERS
      ? [{ id: 1, date: new Date('2025-03-15'), item: 'Sweater' }]
      : [];

    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

    const recentOrders = allOrders.filter(order => new Date(order.date) >= threeMonthsAgo);
    console.log("Filtered recent orders:", recentOrders); // debug log
    setOrders(recentOrders);
  }, [accessToken, navigate]);

  return (
    <div className="content-container order-history-container">
      <h2>Order History</h2>
      {orders.length === 0 ? (
        <p className="no-orders-message">
          You have no order history in the past 3 months.
        </p>
      ) : (
        <ul className="order-list">
          {orders.map(order => (
            <li key={order.id}>
              <strong>{order.item}</strong> — {new Date(order.date).toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
