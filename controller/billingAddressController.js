const { BillingAddress } = require('../models/billingAddress');
const { User } = require('../models/user');

const createBillingAddress = async (req, res) => {
    const {  address_line1, address_line2, city, state, postal_code, country } = req.body;
    try {
        const uid  =  req.user.id ;
        const billingAddress = await BillingAddress.create({ uid, address_line1, address_line2, city, state, postal_code, country });
        res.status(201).json({ error: 0, data: billingAddress, message: 'Billing address created successfully' });
    } catch (error) {
        res.status(500).json({ error: 1, data: null, message: error.message });
    }
};

const getAllBillingAddresses = async (req, res) => {
    try {
        const billingAddresses = await BillingAddress.findAll({
            where : { uid : req.user.id } ,
            include: { model: User, as: 'user' }
        });
        res.status(200).json({ error: 0, data: billingAddresses, message: 'Success' });
    } catch (error) {
        res.status(500).json({ error: 1, data: null, message: error.message });
    }
};

const getBillingAddressById = async (req, res) => {
    const { id } = req.body;
    try {
        const billingAddress = await BillingAddress.findByPk(id, {
            include: { model: User, as: 'user' }
        });
        if (billingAddress) {
            res.status(200).json({ error: 0, data: billingAddress, message: 'Success' });
        } else {
            res.status(404).json({ error: 1, data: null, message: 'Billing address not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 1, data: null, message: error.message });
    }
};

const updateBillingAddress = async (req, res) => {
    const { id , address_line1, address_line2, city, state, postal_code, country } = req.body;
    try {
        const billingAddress = await BillingAddress.findByPk(id);
        if (billingAddress) {
            billingAddress.address_line1 = address_line1;
            billingAddress.address_line2 = address_line2;
            billingAddress.city = city;
            billingAddress.state = state;
            billingAddress.postal_code = postal_code;
            billingAddress.country = country;
            await billingAddress.save();
            res.status(200).json({ error: 0, data: billingAddress, message: 'Billing address updated successfully' });
        } else {
            res.status(404).json({ error: 1, data: null, message: 'Billing address not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 1, data: null, message: error.message });
    }
};

const deleteBillingAddress = async (req, res) => {
    const { id } = req.body;
    try {
        const billingAddress = await BillingAddress.findByPk(id);
        if (billingAddress) {
            await billingAddress.destroy();
            res.status(200).json({ error: 0, data: null, message: 'Billing address deleted successfully' });
        } else {
            res.status(404).json({ error: 1, data: null, message: 'Billing address not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 1, data: null, message: error.message });
    }
};

module.exports = {
    createBillingAddress,
    getAllBillingAddresses,
    getBillingAddressById,
    updateBillingAddress,
    deleteBillingAddress
};
