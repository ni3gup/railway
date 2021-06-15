import React, { useState } from 'react';
import { Card, Form, Button, Row, Col, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { getPNRStatus } from '../services/railway';
import Loader from '../components/Loader';

const PNRStatus = () => {
    const [pnr, setPnr] = useState('');
    const [loading, setLoading] = useState(false);
    const [tripDetails, setTripDetails] = useState(null);

    const checkValidPNR = (e) => {
        const re = /^[0-9\b]+$/;

        if (e.target.value === '' || re.test(e.target.value)) {
            setPnr(e.target.value);
        }
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        if (!pnr) {
            alert('Please enter a valid PNR');
            return false;
        }

        // make an api call

        setLoading(true);

        const pnrData = await getPNRStatus(pnr);

        console.log(pnrData);

        if (!pnrData) {
            alert('Invalid PNR');
        }

        setTripDetails(pnrData);
        setLoading(false);
    }

    const getTripTime = (departureTime, arrivalTime) => {
        departureTime = moment(departureTime);
        arrivalTime = moment(arrivalTime);

        const totalTime = arrivalTime.diff(departureTime);

        const total_seconds = parseInt(Math.floor(totalTime / 1000));
        const total_minutes = parseInt(Math.floor(total_seconds / 60));
        const total_hours = parseInt(Math.floor(total_minutes / 60));

        // const seconds = parseInt(total_seconds % 60);
        const minutes = parseInt(total_minutes % 60);
        const hours = parseInt(total_hours);

        return { hours, minutes };
    }

    return (
        <>
            {
                loading && <Loader />
            }
            {
                !loading &&
                <>
                    <Card style={{ margin: '66px 16px 10px 16px', background: '#AD2E41', color: '#fff' }}>
                        <Card.Body>
                            <Form onSubmit={submitHandler}>
                                <Row>
                                    <Col>
                                        <Form.Label>Enter 10 digit PNR Number</Form.Label>
                                        <Form.Control type="text" placeholder="Enter your 10 digit pnr number" value={pnr} minLength={10} maxLength={10} onChange={checkValidPNR} />
                                    </Col>
                                    <Col>
                                        <Button variant="primary" type="submit" style={{ color: '#fff', marginTop: '32px' }}>SEARCH</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </Card.Body>
                    </Card>

                    {/* Trip Overview */}
                    {
                        tripDetails && <Card style={{ margin: '10px 16px 10px 16px' }}>
                            <Card.Body>
                                <div style={{ fontSize: '24px', fontWeight: '600' }}>
                                    <h2>Trip overview</h2>
                                    <h3 style={{ marginTop: '20px', marginBottom: '10px', fontSize: '20px' }}>{tripDetails.trainName} - {tripDetails.trainNumber} | {tripDetails.fareClass === 'SL' ? 'Sleeper' : ''} Class</h3>
                                </div>

                                <div className="col d-flex">
                                    <div style={{ display: 'inline-block', marginTop: '30px', marginLeft: '-15px', paddingBottom: '20px', verticalAlign: 'middle' }}>
                                        <div style={{ fontSize: '24px', fontWeight: '600' }}>{tripDetails.boardingStationName}</div>
                                        <div style={{ fontSize: '32px', textTransform: 'uppercase' }}>{tripDetails.boardingCity}</div>
                                        <div style={{ fontSize: '18px', fontWeight: '600' }}>Expected Platform: {tripDetails.boardingPlatformArray.length > 0 ? tripDetails.boardingPlatformArray[0] !== '0' ? tripDetails.boardingPlatformArray[0] : 'NA' : 'NA'}</div>
                                        <div style={{ fontSize: '18px', marginTop: '10px' }}>{moment(tripDetails.scheduledBoardTime).format('D MMM | HH:mm')}</div>
                                    </div>
                                    <div style={{ textAlign: 'center', margin: '0px 30px' }}>
                                        <span className="right-arrow" style={{ display: 'block', fontSize: '56px', color: '#7cca5e', margin: '48px 30px 21px' }}>
                                            <i className="fas fa-arrow-right"></i>
                                        </span>
                                        <span style={{ fontSize: '16px', color: '#aaa', marginLeft: '8px' }}>{getTripTime(tripDetails.scheduledDepartTime, tripDetails.scheduledArriveTime).hours}hr {getTripTime(tripDetails.scheduledDepartTime, tripDetails.scheduledArriveTime).minutes}min</span>
                                    </div>
                                    <div style={{ marginTop: '30px', paddingBottom: '20px', verticalAlign: 'middle', marginLeft: '40px' }}>
                                        <div style={{ fontSize: '24px', fontWeight: '600' }}>{tripDetails.deboardingStationName}</div>
                                        <div style={{ fontSize: '32px', textTransform: 'uppercase' }}>{tripDetails.deboardingCity}</div>
                                        <div style={{ fontSize: '18px', fontWeight: '600' }}>Expected Platform: {tripDetails.deboardingPlatformArray.length > 0 ? tripDetails.deboardingPlatformArray[0] !== '0' ? tripDetails.deboardingPlatformArray[0] : 'NA' : 'NA'}</div>
                                        <div style={{ fontSize: '18px', marginTop: '10px' }}>{moment(tripDetails.scheduledDeboardTime).format('D MMM | HH:mm')}</div>
                                    </div>
                                </div>

                                <div style={{ marginTop: '15px' }}>
                                    <div>
                                        <span></span>
                                        <span>
                                            <i className="fas fa-wifi" style={{ marginRight: '5px' }}></i>
                                            <Link to="/">Free WiFi</Link> available at {tripDetails.boardingStationName} and {tripDetails.deboardingStationName}
                                        </span>
                                    </div>
                                </div>

                                <div className="border-bottom"></div>

                                <div style={{ fontSize: '14px' }}>
                                    <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Traveller info</h2>
                                    <Table striped bordered hover size="sm" style={{ marginTop: '20px' }}>
                                        <thead>
                                            <tr>
                                                <th>S.No</th>
                                                <th>Booking Status</th>
                                                <th>Current Status</th>
                                                <th>Coach</th>
                                                <th>Berth</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                tripDetails.passengers.map((passenger, index) => (
                                                    <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{passenger.bookingStatus.type} {', '} {passenger.bookingBerthNo}</td>
                                                        <td>{passenger.currentBookingStatus.type} { passenger.currentBerthNo ? `, ${passenger.currentBerthNo}` : ''}</td>
                                                        <td>{passenger.bookingCoachId || 'NA'}</td>
                                                        <td>{passenger.currentBookingStatus.type === 'CNF' ? passenger.bookingBerthNo : 'NA'}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </Table>
                                    <div><b>{ !tripDetails.chartPrepared ? 'chart not prepared' : 'chart prepared' }</b></div>

                                    <div className="border-bottom"></div>

                                    <div>
                                        <h2 style={{ fontSize: '24px', fontWeight: 600 }}>Fare details</h2>
                                        <div style={{ fontSize: '16px', padding: '18px 30px 18px 0' }}>
                                            Fare charges :
                                        <div style={{ display: 'inline', fontWeight: 'bold' }}> ₹ {parseInt(tripDetails.fare)}</div>
                                        </div>
                                    </div>
                                </div>
                            </Card.Body>
                        </Card>
                    }

                    <div className="pnr-section">
                        <section>
                            <div>
                                <div style={{ fontSize: '14px', textAlign: 'left' }}>
                                    <h1>PNR Status</h1>
                                    <p style={{ textAlign: 'left' }}>
                                        PNR is a 10-digit number which stands for Passenger Name Record. It is a unique number that is assigned to every booked train ticket by Indian Railways. PNR Status means the current status of booked train ticket i.e. whether it is confirmed, waitlisted or RAC (Reservation Against Cancellation). It provides passenger's basic information like name, age &amp; sex, date of the journey, train details and ticket booking status. Some other travel details like coach number, berth number and berth type are provided only if the booked ticket status is CNF (Confirmed). There are limited seats available in a train so its not possible to provide confirm ticket for every booking. <Link to="/">Indian Railway train ticket booking</Link> system provides CNF (Confirmed) and RAC (Reservation Against Cancellation) status when tickets are available and the bookings made after that are provided waitlisted status. Waitlisted tickets gets confirmed in order only if any of CNF/RAC ticket gets cancelled. Especially when you have a waitlisted ticket, tracking the indian railway pnr status live becomes even more necessary. At ixigo, you can easily check PNR Status to access the latest information of your booked ticket. It saves you a lot of hassles, indeed.</p>
                                </div>
                            </div>
                        </section>

                        <section>
                            <div>
                                <div style={{ fontSize: '14px', textAlign: 'left' }}>
                                    <h2>PNR Status Check</h2>
                                    <p style={{ textAlign: 'left' }}>Enter 10-digit PNR number in above search box and enter "Search PNR". It will provide the current PNR status of your booked train ticket with passenger and train details. For the tickets booked via Indian Railways reservation counters you could find the pnr number at top left corner of the ticket. PNR of the tickets booked online(e-tickets) could be seen at top center of your ticket.</p>
                                </div>
                                <div style={{ fontSize: '14px', textAlign: 'left' }}>
                                    <h2>PNR Status Enquiry Via App</h2>
                                    <p style={{ textAlign: 'left' }}>Download ixigo's Indian Rail Train PNR Status App, and get real time updates about your PNR Status Enquiry. Along with this, you also get access to your reservation booking status, platform number, coach position, and more.</p>
                                </div>
                                <div style={{ fontSize: '14px', textAlign: 'left' }}>
                                    <h2>Train PNR Status Check Via SMS</h2>
                                    <p>You can send a text to Indian Railways number 139 for PNR Enquiry. Just type the 10 digits (without hyphen) and send it to 139. You can also send the sms to 5676747. You would get the updated PNR information in your phone inbox. Please note that the text you send costs you Rs. 3 per sms.</p>
                                </div>
                            </div>
                        </section>
                    </div>
                </>
            }
        </>
    )
}

export default PNRStatus;
