const express = require('express')
const Transactions = require('../models/transactions.js')
const transactions = express.Router()
const isAuthenticated = (req, res, next) => {
    if(req.session.currentUser) {
        return next()
    } else {
        res.redirect('/sessions/new')
    }
}

// NEW
transactions.get('/new', (req, res) => {
    res.render(
        'transactions/new.ejs',
        {currentUser: req.session.currentUser}
    )
})

// EDIT
transactions.get('/:id/edit', (req, res) => {
    Transactions.findById(req.params.id, (error, foundTransaction) => {
        res.render('transactions/edit.ejs', {
            transaction: foundTransaction,
            currentUser: req.session.currentUser
        })
    })
})

// DELETE
transactions.delete('/:id', isAuthenticated, (req, res) => {
    Transactions.findByIdAndRemove(req.params.id, (err, deletedTransaction) => {
        res.redirect('/transactions')
    })
})

// SHOW
transactions.get('/:id', (req, res) => {
    if (req.session.currentUser) {
        Transactions.findById(req.params.id, (error, foundTransaction) => {
            res.render('transactions/show.ejs', {
                transaction: foundTransaction,
                currentUser: req.session.currentUser
            })
        })
    } else {
        res.redirect('/sessions/new')
    }
})

// UPDATE
transactions.put('/:id', (req, res) => {
    Transactions.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
        (error, updatedModel) => {
            res.redirect('/transactions')
        }
    )
})

// CREATE
transactions.post('/', (req, res) => {
    Transactions.create(req.body, (error, createdTransaction) => {
        res.redirect('/transactions')
    })
})

// INDEX
transactions.get('/', (req, res) => {
    Transactions.find({}, (error, allTransactions) => {
        res.render('transactions/index.ejs', {
            transactions: allTransactions,
            currentUser: req.session.currentUser
        })
    })
})
/*
const arr = [{ name: 'alfonso', num: 3}, { name: 'alfonso', num: 3}, { name: 'alfonso', num: 3}, { name: 'alfonso99', num: 5}]
const filtered = arr.filter((item)=> { return item.name === 'alfonso'})
const runningBalance = filtered.reduce((accumulator, item)=> {return accumulator + item.num }, 0)
res.render('index.ejs', {
	transactions: filtered,
	balance: run
})
*/
// Drop DB Route
transactions.get(
    '/dropdatabase/cannotundo/areyoursure/reallysure/okthen',
    (req, res) => {
        Transactions.collection.drop()
        res.send('You did it! You dropped the database!')
    }
)

module.exports = transactions
