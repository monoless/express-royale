/**
 * return user Model
 * @param mongoose
 * @returns {Model<T>}
 */
module.exports = function(mongoose){
    var passportLocalMongoose = require('passport-local-mongoose');
    var Schema = mongoose.Schema;

    var User = new Schema({
        userGender: Boolean,
        userIcon: String,       // icon2

        // message
        message: String,        // msg2
        messageDying: String,   // dmes2
        messageComment: String, // com2

        // character stats
        attack: Number,     // att
        defence: Number,    // def
        health: Number,     // hit
        maxHealth: Number,  // mhit
        stamina: Number,    // sta
        killCount: Number,  // kill
        level: Number,      // level
        requireExp: Number, // exp (minus 되는 구조)
        injured: Array,     // inf
        place: Number,      // pls
        status: Number,     // sts

        // battle
        prevAttacker: String,   // bid 공격자 ID (중복공격 방지)
        prevLog: String,        // 이전 Log
        deathCause: String,     // death
        deathAt: Number,        // endtime

        // character extends
        groupName: String,  // cl
        studentNo: String,  // no
        clubName: String,   // club
        tactics: Number,    // tactics


        // skills
        shotSkill: Number,   // wg
        cutSkill: Number,    // wn
        throwSkill: Number,  // wc
        fistSkill: Number,   // wp
        bowSkill: Number,    // wa
        meleeSkill: Number,  // wb
        bombSkill: Number,   // wd
        pokeSkill: Number,   // ws

        // equip
        weapon:{
            idx: String,
            endurance: Number,
            point: Number
        },
        armor:{
            head:{
                idx: String,
                endurance: Number,
                point: Number
            },
            body:{
                idx: String,
                endurance: Number,
                point: Number
            },
            arm:{
                idx: String,
                endurance: Number,
                point: Number
            },
            foot:{
                idx: String,
                endurance: Number,
                point: Number
            }
        },

        // game items
        item0:{
            idx: String,
            endurance: Number,
            point: Number
        },
        item1:{
            idx: String,
            endurance: Number,
            point: Number
        },
        item2:{
            idx: String,
            endurance: Number,
            point: Number
        },
        item3:{
            idx: String,
            endurance: Number,
            point: Number
        },
        item4:{
            idx: String,
            endurance: Number,
            point: Number
        },
        item5:{
            idx: String,
            endurance: Number,
            point: Number
        },

        // passport properties
        username: {type:String, unique:true, required:true, dropDups:true},
        password: {type:String, required:true},
        last: Number,       // last-login attempt
        attempts: Number    // login attempt
    });

    User.plugin(passportLocalMongoose, require('../config/passport'));
    return mongoose.model('User', User);
};