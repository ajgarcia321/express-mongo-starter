const express = require('express')
const Transaction = require('../models/transactions.js')
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
    'transactions/new.ejs'
    , {currentUser: req.session.currentUser}
  )
})

// EDIT
transactions.get('/:id/edit', (req, res) => {
  Transaction.findById(req.params.id, (error, foundTransaction) => {
    res.render('transactions/edit.ejs', {
      transaction: foundTransaction
      ,currentUser: req.session.currentUser
    })
  })
})

// DELETE
transactions.delete('/:id', isAuthenticated, (req, res) => {
  Transaction.findByIdAndRemove(req.params.id, (err, deletedTransaction) => {
    res.redirect('/transactions')
  })
})

// SHOW
transactions.get('/:id', (req, res) => {
  if (req.session.currentUser) {
  Transaction.findById(req.params.id, (error, foundTransaction) => {
    res.render('transactions/show.ejs', {
      transaction: foundTransaction,
      currentUser: req.session.currentUser
    })
  })
} else {
    res.redirect('/sessions/new')
}
})
