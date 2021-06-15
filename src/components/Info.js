import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Info = () => {
    return (
        <Card style={{ margin: '15px' }}>
            <Card.Body>
                <h1 style={{ fontSize: '22px', fontWeight: 'bold' }}>IRCTC Ticket Booking</h1>

                <p>Book IRCTC train tickets quick and easily on our train app or website using your IRCTC login. You can also check the&nbsp;<Link to="/">latest state-wise COVID-19 guidelines</Link>&nbsp;and confirm the running status of your train or the special COVID-19 train. Find trains according to your travel destination and preferred date, check seat availability, and complete your ticket booking, since online railway reservation is now easy, swift and secure at ixigo. You will be paying ₹0 as service charge on your first IRCTC train booking. You can also check your <Link to="/">PNR status</Link> and know the chances of your ticket confirmation.</p>

                <p>The confirmation prediction feature also assists in deciding whether to book train tickets or not. If the seat is on the waitlist and you book a waitlisted IRCTC ticket, the PNR auto update feature keeps you updated about availability till your journey date/ticket gets confirmed. Along with online train reservations, an IRCTC <Link to="/">Tatkal ticket booking</Link> service is also available on the ixigo app and website.</p>

                <div>
                    <div>
                        <table border="1" style={{ margin: '20px 0', borderCollapse: 'collapse' }}>
                            <tbody>
                                <tr>
                                    <th style={{ padding: '0 20px' }}>IRCTC Running Train Stats</th>
                                    <th style={{ padding: '0 20px' }}>Counts</th>
                                </tr>
                                <tr>
                                    <td style={{ padding: '0 20px' }}>Number of Live Running Trains</td>
                                    <td style={{ padding: '0 20px' }}>1618+</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Card.Body>
        </Card>
    )
}

export default Info
