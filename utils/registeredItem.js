const {Item} = require("../model/item")
const fs = require("fs")
const path = require("path")

module.exports = class RegisteredItem {
    constructor(category, timeFound, location, description, file, id) {
        this.id = id
        this.category = category
        this.timeFound = timeFound
        this.location = location
        this.description = description
        this.file = file
        this.filePath = "webroot/static/images/" + this.id + ".jpg"
        this.reasonForRequest = ""
    }

    reasonForRequestSetter(val) {
        this.reasonForRequest = val
    }

    registerItem(callback) {
        this.file.mv(this.filePath, (err) => {
            if (err) throw err // TODO clean up
            new Item({
                id: this.id,
                category: this.category,
                timeFound: this.timeFound,
                location: this.location,
                description: this.description,
            }).save((err, response) => {
                if (err) throw err // TODO needs cleaning up
                callback(false)
            })
        })
    }

    selfDelete() {
        // TODO delete from database
        Item.deleteOne({id: this.id}, (err, success) => {
            if(err) throw err
            fs.unlinkSync(path.join(__dirname, "../" + this.filePath))
        })

    }


}