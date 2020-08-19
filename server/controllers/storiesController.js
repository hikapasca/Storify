const { Story } = require('../models')
const doMail = require('../helpers/mailGun')


class StoriesController{
    static add( req, res, next ){
        const newStory = {
            title: req.body.title,
            content: req.body.content,
            qrCode: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${req.body.content}`,
            UserId : req.userData
        }
        Story.create(newStory)
        .then( data => {
            console.log('asdasdas')
            doMail(data)
            res.status(201).json(data)
        })
        .catch( err => {
            console.log(err)
            next(err)
        })
    }

    static view( req, res, next ){
        Story.findAll()
        .then( data => {
            res.status(201).json(data)
        })
        .catch( err => {
            next(err)
        })
    }

    static viewById( req, res, next ){
        const selectedId = req.params.id
        Story.findByPk(selectedId)
        .then( data => {
            res.status(201).json(data)
        })
        .catch( err => {
            next(err)
        })
    }
}

module.exports = StoriesController