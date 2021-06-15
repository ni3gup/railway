import React from 'react';
import { useState } from 'react';
import { Card, Form, Row, Col, Button, Spinner, Table } from 'react-bootstrap';
import moment from 'moment';

import { getRunningStatus, getStations, getTrainByNameOrCode } from '../services/railway';
import Loader from '../components/Loader';

const RunningStatus = () => {
    const [trainNumber, setTrainNumber] = useState('');
    const [train, setTrain] = useState('');
    const [trainDetails, setTrainDetails] = useState(null);
    const [trainDetailsLoaded, setTrainDetailsLoaded] = useState(false);
    const [trains, setTrains] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectLoading, setSelectLoading] = useState(false);
    const [stations, setStations] = useState([]);
    const [selectedStation, setSelectedStation] = useState('');
    const [dates, setDates] = useState([
        {
            date: moment().subtract('1', 'day').format('DD MMM'),
            active: false,
            id: +moment().subtract('1', 'day').format('YYYYMMDD'),
            fullDate: moment().subtract('1', 'day').format('DD-MMM-YYYY')
        },
        {
            date: moment().format('DD MMM'),
            active: true,
            id: +moment().format('YYYYMMDD'),
            fullDate: moment().format('DD-MMM-YYYY')
        },
        {
            date: moment().add('1', 'day').format('DD MMM'),
            active: false,
            id: +moment().add('1', 'day').format('YYYYMMDD'),
            fullDate: moment().add('1', 'day').format('DD-MMM-YYYY')
        }
    ]);
    const [journeyDate, setJourneyDate] = useState('');
    const [runningDetails, setRunningDetails] = useState(null);

    const checkTrainValidity = async (e) => {
        setTrainNumber(e.target.value);

        const data = await getTrainByNameOrCode(e.target.value);

        setTrains(data);
    }

    const selectStation = (e) => {
        setSelectedStation(e.target.value);
    }

    const setTrainInfo = async (train) => {
        setSelectLoading(true);

        setTrains([]);
        setTrain(trainNumber);
        setTrainNumber(`${train.n} - ${train.c} (${train.origin}/${train.originName} to ${train.destination}/${train.destinationName})`);
        
        const stations = await getStations(trainNumber);
        setTrainDetails({
            trainName: `${train.n} - ${train.c}`,
            startStationCode: train.origin,
            endStationCode: train.destination,
            startStationName: stations[0],
            endStationName: stations[stations.length - 1]
        });

        setStations(stations);
        setSelectLoading(false);
    }

    const journeyDateHandler = (activeDate) => {
        const updatedDates = [];

        [...dates].forEach(date => {
            if (date.id === activeDate.id) {
                date.active = true;
            } else {
                date.active = false;
            }

            updatedDates.push(date);
        });

        setDates(updatedDates);
        setJourneyDate(activeDate);
    }

    const submitHandler = async (e) => {
        e.preventDefault();

        setLoading(true);

        const date = dates.find(date => date.active).id;

        const data = await getRunningStatus(train, selectedStation, date);

        console.log(data);

        const runningDetails = {
            ...trainDetails,
            journeyStation: selectedStation,
            journeyDate: journeyDate
        }

        console.log(runningDetails);

        setTrainDetailsLoaded(true);
        setRunningDetails(runningDetails);
        setLoading(false);
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
                            Spot your Train
                        </Card.Body>
                    </Card>

                    <Card style={{ margin: '16px 16px 10px 16px' }}>
                        <Card.Body>
                            <Form onSubmit={submitHandler}>
                                <Row>
                                    <Col>
                                        <Form.Label>Train No./Name</Form.Label>
                                        <Form.Control type="text" placeholder="Train No./Name" value={trainNumber} onChange={checkTrainValidity} />
                                        {
                                            trains.length > 0 &&
                                            <div aria-label="menu-options" className="rbt-menu dropdown-menu show" id="train-no" role="listbox" style={{ position: 'absolute', maxHeight: '300px', overflow: 'auto', willChange: 'transform', width: '1292px', top: '67px', left: '14px' }}>
                                                {
                                                    trains.map((train, index) => (
                                                        <button style={{ cursor: 'pointer' }} onClick={() => setTrainInfo(train)} key={index} className="dropdown-item">{train.n} - { train.c} ({ train.origin}/{ train.originName} to { train.destination}/{ train.destinationName})</button>
                                                    ))
                                                }
                                            </div>

                                        }
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '10px' }}>
                                    <Col>
                                        <Form.Label>Journey Station</Form.Label> <br />
                                        {
                                            selectLoading ?
                                                <Spinner animation='border' role='status' style={{ width: '20px', height: '20px', display: 'block' }}>
                                                    <span className="sr-only">Loading...</span>
                                                </Spinner> :
                                                <select className="form-select" onChange={selectStation}>
                                                    <option defaultValue>Select</option>
                                                    {
                                                        stations.length > 0 && stations.map((station) => (
                                                            <option key={station} value={station}>{station}</option>
                                                        ))
                                                    }
                                                </select>
                                        }
                                    </Col>
                                </Row>
                                <Row style={{ marginTop: '10px' }}>
                                    <Col>
                                        <Form.Label>Journey Date</Form.Label>
                                        <div style={{ display: 'flex' }}>
                                            {
                                                dates.map((date) => (
                                                    <div key={date.id} onClick={() => journeyDateHandler(date)} className={`date ${date.active ? 'is-primary' : ''}`}>{date.date}</div>
                                                ))
                                            }
                                        </div>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <Button variant="primary" type="submit" style={{ color: '#fff', marginTop: '10px' }}>SEARCH</Button>
                                    </Col>
                                </Row>
                            </Form>

                            {
                                trainDetailsLoaded &&
                                <Table striped bordered hover size="sm" style={{ marginTop: '20px' }}>
                                    <thead>
                                        <tr className="running-status">
                                            <th style={{ border: 'none', verticalAlign: 'top' }}>Train Name/No.</th>
                                            <th style={{ border: 'none' }}>
                                                {trainDetails.trainName} <br />
                                                {trainDetails.startStationName} - {trainDetails.endStationName}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Journey Station</td>
                                            <td>{ runningDetails ? runningDetails.journeyStation : '' }</td>
                                        </tr>
                                        <tr>
                                            <td>Journey Date</td>
                                            <td>{ runningDetails ? runningDetails.journeyDate.fullDate : '' }</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            }
                        </Card.Body>
                    </Card>
                </>
            }
        </>
    )
}

export default RunningStatus
