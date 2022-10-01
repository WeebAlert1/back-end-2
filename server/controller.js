/* const { raw } = require('body-parser'); */
const houses = require('./db.json');
const globalId = 4;

module.exports = {
    // Sends houses to the front end
    getHouses: (req, res) => {
        res.status(200).send(houses);
    },
// Uses .findIndex to find the id, then deletes that using the .splice methood. 
    deleteHouse: (req, res) => {
        //Uses the Index to find houses
        let index = houses.findIndex(elem => elem.id === +req.params.id);
        houses.splice(index, 1);
        res.status(200).send(houses);
    },
// Adds new house, uses diffrient methood than solution though
    createHouse: (req, res) => {
        const {id, address, price, imageURL} = req.body;
        houses.push({
            id,
            address,
            price,
            imageURL,
            id: globalId,
        });
        globalId++;
        res.status(200).send(houses);
    },

    updateHouse: (req, res) => {
        const { id } = req.params;
        const { type } = req.body;
        let index = houses.findIndex(elem => +elem.id === +id);

        if (houses[index].price <= 10000 && type === 'minus'){
            houses[index].price = 0;
            res.status(200).send(houses);
        } else if (type === 'plus') {
            houses[index].price =+ 10000;
            res.status(200).send(houses);
        } else if (type === 'minus') {
            houses[index].price =- 10000
            res.status(200).send(houses);
        } else {
            res.status(400);
        }
    }
}