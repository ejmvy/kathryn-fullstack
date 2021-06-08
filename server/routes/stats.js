const { Order } = require('../models/order');
const { User } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const date = require('joi/lib/types/date');
const router = express.Router();


router.get('/totalSales', async (req, res) => {
    const orders = await Order.find().sort('orderDate');

    const thisYear = new Date().getFullYear();

    let monthlySales = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
    }

    orders.forEach((order) => {
        if (new Date(order.orderDate).getFullYear() == thisYear) {
            const month = new Date(order.orderDate).getMonth();
            monthlySales[month]++;
        }
    })
    res.send(monthlySales);
})

router.get('/monthlyIncome', async (req, res) => {
    const orders = await Order.find().sort('orderDate');

    let monthlyIncome = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
    }

    const thisYearOrders = orders.filter((order) => new Date(order.orderDate).getFullYear() === new Date().getFullYear());

    thisYearOrders.forEach((order) => {
        const month = new Date(order.orderDate).getMonth();
        const orderTotal = parseFloat(order.cartTotal);
        monthlyIncome[month] += orderTotal;
    })

    for (let key in monthlyIncome) {
        monthlyIncome[key] = monthlyIncome[key].toFixed(2);
    }
    res.send(monthlyIncome);
})

router.get('/newUsers', async (req, res) => {
    const users = await User.find().sort('createdAt');

    const thisYear = new Date().getFullYear();

    let monthlyUsers = {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
        10: 0,
        11: 0,
        12: 0,
    }

    users.forEach((user) => {
        if (new Date(user.createdAt).getFullYear() == thisYear) {
            const month = new Date(user.createdAt).getMonth();
            monthlyUsers[month]++;
        }
    })

    res.send(monthlyUsers);
})

// router.get('/returningUsers/current', async (req, res) => {
//     const orders = await Order.find().sort('orderDate');
//     const users = await User.find().sort('createdAt');

//     const currentDate = new Date();

//     let ordersCurrent = orders.filter((order) => new Date(order.orderDate).getFullYear() == req.params.year && new Date(order.orderDate).getMonth() == req.params.month) 
//     let ordersPrev = orders.filter((order) => new Date(order.orderDate).getFullYear() == req.params.year && new Date(order.orderDate).getMonth() == req.params.month - 1)
// })

router.get('/returningUsers', async (req, res) => {
    const orders = await Order.find().sort('orderDate');
    const users = await User.find().sort('createdAt');

    const currentDate = new Date();


    let returningUsers = {
        0: {
            orders: [],
            users: 0,
        },
        1: {
            orders: [],
            users: 0,
        },
        2: {
            orders: [],
            users: 0,
        },
        3: {
            orders: [],
            users: 0,
        },
        4: {
            orders: [],
            users: 0,
        },
        5: {
            orders: [],
            users: 0,
        },
        6: {
            orders: [],
            users: 0,
        },
        7: {
            orders: [],
            users: 0,
        },
        8: {
            orders: [],
            users: 0,
        },
        9: {
            orders: [],
            users: 0,
        },
        10: {
            orders: [],
            users: 0,
        },
        11: {
            orders: [],
            users: 0,
        },
        12: {
            orders: [],
            users: 0,
        },
    }

    let ordersCurrent = orders.filter((order) => new Date(order.orderDate).getFullYear() == currentDate.getFullYear());

    for (let order of ordersCurrent) {
        const month = new Date(order.orderDate).getMonth();
        returningUsers[month].orders.push(order);
    }
    for (let key in returningUsers) {
        const orders = returningUsers[key].orders;

        orders.forEach((order) => {
            const userId = order.customer._id;

            let user = users.find((user) => user._id == userId.toString());
            if (new Date(order.orderDate) > new Date(user.createdAt)) {
                returningUsers[key].users++;
            }
        })
    }

    for (let key in returningUsers) {
        returningUsers[key] = returningUsers[key].users;
    }

    res.send(returningUsers);
})

router.get('/mostPopular', async (req, res) => {
    const orders = await Order.find().sort('orderDate');

    const currentDate = new Date();

    let topSalesObj = {};

    let ordersCurrent = orders.filter((order) => new Date(order.orderDate).getFullYear() == currentDate.getFullYear() && new Date(order.orderDate).getMonth() == currentDate.getMonth());

    ordersCurrent.forEach((order) => {
        const products = order.products;

        products.forEach((product) => {
            if (topSalesObj[product.name]) {
                topSalesObj[product.name]++;
            } else {
                topSalesObj[product.name] = 1;
            }
        })

    })
    res.send(topSalesObj);
})

router.get('/averageOrder', async (req, res) => {
    const orders = await Order.find().sort('orderDate');

    let monthlyAverageData = {
        0: {
            amount: 0,
            sales: 0,
        },
        1: {
            amount: 0,
            sales: 0,
        },
        2: {
            amount: 0,
            sales: 0,
        },
        3: {
            amount: 0,
            sales: 0,
        },
        4: {
            amount: 0,
            sales: 0,
        },
        5: {
            amount: 0,
            sales: 0,
        },
        6: {
            amount: 0,
            sales: 0,
        },
        7: {
            amount: 0,
            sales: 0,
        },
        8: {
            amount: 0,
            sales: 0,
        },
        9: {
            amount: 0,
            sales: 0,
        },
        10: {
            amount: 0,
            sales: 0,
        },
        11: {
            amount: 0,
            sales: 0,
        },
        12: {
            amount: 0,
            sales: 0,
        },
    }

    const thisYearOrders = orders.filter((order) => new Date(order.orderDate).getFullYear() === new Date().getFullYear());

    thisYearOrders.forEach((order) => {
        const month = new Date(order.orderDate).getMonth();

        monthlyAverageData[month].amount += parseFloat(order.cartTotal);
        monthlyAverageData[month].sales++;

    })

    for (var key in monthlyAverageData) {
        monthlyAverageData[key] = (monthlyAverageData[key].amount / monthlyAverageData[key].sales).toFixed(2);
    }

    res.send(monthlyAverageData);
})


router.get('/orders/:year/:month', async (req, res) => {
    const orders = await Order.find().sort('orderDate');
    const users = await User.find().sort('createdAt');

    let orderStats = {}

    let ordersCurrent = orders.filter((order) => new Date(order.orderDate).getFullYear() == req.params.year && new Date(order.orderDate).getMonth() == req.params.month)
    let ordersPrev = orders.filter((order) => new Date(order.orderDate).getFullYear() == req.params.year && new Date(order.orderDate).getMonth() == req.params.month - 1)

    let currentMonthSales = ordersCurrent.reduce((a, b) => a + parseFloat(b.cartTotal), 0)
    let prevMonthSales = ordersPrev.reduce((a, b) => a + parseFloat(b.cartTotal), 0)

    let currentAverageSale = currentMonthSales / ordersCurrent.length;
    let prevAverageSale = prevMonthSales / ordersPrev.length;

    let topSalesObj = {};
    let topSales = [];

    let currentReturningUsers = 0;
    let prevReturningUsers = 0;
    ordersCurrent.forEach((order) => {
        const products = order.products;

        const userId = order.customer._id;

        let user = users.find((user) => user._id == userId.toString());
        if (new Date(order.orderDate) > new Date(user.createdAt)) {
            currentReturningUsers++;
        }
        products.forEach((product) => {

            if (topSalesObj[product.name]) {
                topSalesObj[product.name]++;
            } else {
                topSalesObj[product.name] = 1;
            }
        })
    })

    ordersPrev.forEach((order) => {
        const userId = order.customer._id;

        let user = users.find((user) => user._id == userId.toString());
        if (new Date(order.orderDate) > new Date(user.createdAt)) {
            prevReturningUsers++;
        }
    })

    for (var key in topSalesObj) {
        topSales.push({
            name: key,
            amount: topSalesObj[key]
        })
    }

    orderStats.current = ordersCurrent.length;
    orderStats.prev = ordersPrev.length;
    orderStats.orderDifference = ((orderStats.current - orderStats.prev) / ((orderStats.current + orderStats.prev) / 2)) * 100;
    orderStats.currentSales = currentMonthSales;
    orderStats.prevSales = prevMonthSales;
    orderStats.salesDifference = ((orderStats.currentSales - orderStats.prevSales) / ((orderStats.currentSales + orderStats.prevSales) / 2)) * 100;
    orderStats.topSales = topSales.sort((a, b) => b.amount - a.amount).slice(0, 3);
    orderStats.currentAverage = currentAverageSale ? currentAverageSale : 0;
    orderStats.prevAverage = prevAverageSale;
    orderStats.averageSalesDifference = ((currentAverageSale - prevAverageSale) / ((currentAverageSale + prevAverageSale) / 2)) * 100;
    orderStats.currentReturningUsers = currentReturningUsers;
    orderStats.prevReturningUsers = prevReturningUsers;
    orderStats.returningUserDifference = ((currentReturningUsers - prevReturningUsers) / ((currentReturningUsers + prevReturningUsers) / 2)) * 100;
    res.send(orderStats);
})



router.get('/newUsers/:year/:month', async (req, res) => {
    const users = await User.find().sort('createdAt');

    let userStats = {}

    let usersCurrent = users.filter((user) => new Date(user.createdAt).getFullYear() == req.params.year && new Date(user.createdAt).getMonth() == req.params.month)
    let usersPrev = users.filter((user) => new Date(user.createdAt).getFullYear() == req.params.year && new Date(user.createdAt).getMonth() == req.params.month - 1)

    userStats.current = usersCurrent.length;
    userStats.prev = usersPrev.length;
    userStats.difference = ((userStats.current - userStats.prev) / ((userStats.current + userStats.prev) / 2)) * 100;
    res.send(userStats);
})

router.get('/categoryStats', async (req, res) => {
    const orders = await Order.find().sort('orderDate');

    const categoryObj = {
        Bowls: {},
        Plates: {},
        Dishes: {},
        Mugs: {},
        Misc: {},
    }

    const thisMonthOrders = orders.filter((order) => new Date(order.orderDate).getFullYear() === new Date().getFullYear() && new Date(order.orderDate).getMonth() === new Date().getMonth());

    thisMonthOrders.forEach((order) => {
        order.products.forEach((product) => {
            if (product.category) {
                if (categoryObj[product.category.name][product.name]) {
                    categoryObj[product.category.name][product.name]++;
                } else {
                    categoryObj[product.category.name][product.name] = 1;
                }
            }
        })
    })

    res.send(categoryObj);
})

module.exports = router;