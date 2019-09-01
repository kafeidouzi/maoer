const mongoose = require('../utils/db')


const Model = mongoose.model('positions',{
    // companyName :String,
    // positionName:String,
    // city: String,
    // salary: String,
    // createTime:String,
    // companyLogo:String
    front_cover:String,
    id:String,
    music_count:String,
    title:String,
    user_id:String,
    username:String,
})

module.exports ={
    find({start,count}) {
        return {
            list: Model.find({}).sort({_id: -1}).limit(~~count).skip(~~start),
            total: Model.count({})
        }
    },
    save(data){
        
        let model = new Model(data)
        return model.save()
    },
    findone(id){
        return Model.findById(id)
    },
    patch(data){
        return Model.updateOne({_id:data.id},data)
    },
    delete(id){
        return Model.deleteOne({_id:id})
    },
    search(keywords){
        return Model.find({
            $or:[
                {
                    companyName:new RegExp(keywords,'gi')
                },
                {
                    positionName:new RegExp(keywords,'gi')
                },
                {
                    city:new RegExp(keywords,'gi')
                }
            ]
        }).sort({_id: -1})
    },
    
}