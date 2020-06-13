if(process.env.NODE_ENV === 'production'){
    module.exports = {
        mongoURL: "mongodb+srv://abby77:J@uravMDB77@cluster0-tdlkf.mongodb.net/<dbname>?retryWrites=true&w=majority",
        secret: 'yoursecret'
    }
}else{
    module.exports = {
        mongoURL: "mongodb://localhost:27017/meven_auth",
        secret: 'yoursecret'
    }
}