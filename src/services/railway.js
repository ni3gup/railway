export const getPNRStatus = (pnr) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(`https://www.ixigo.com/v2/pnr?pnr=${pnr}`);

            const data = await res.json();

            resolve(data.data);
        } catch (error) {
            console.error(error);

            reject(error);
        }
    });
}

export const getTrainByNameOrCode = (nameOrCode) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(`https://www.ixigo.com/action/content/trainstation?searchFor=getTrainByNameOrCode&nameOrCode=${nameOrCode}`);

            const data = await res.json();

            resolve(data);
        } catch (error) {
            console.error(error);

            reject(error);
        }
    });
}

export const getStations = (nameOrCode) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(`http://localhost:5000/api/stations`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ train: nameOrCode })
            });

            const data = await res.json();

            resolve(data);
        } catch (error) {
            console.error(error);

            reject(error);
        }
    });
}

export const getRunningStatus = (train, station, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(`http://localhost:5000/api/railway/route`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ train, station, date: date.toString() })
            });

            const data = await res.json();

            resolve(data);
        } catch (error) {
            console.error(error);

            reject(error);
        }
    });
}