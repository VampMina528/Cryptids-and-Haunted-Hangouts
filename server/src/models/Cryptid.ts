// Mongoose model for Cryptid entries
import { Schema, model, type Document } from 'mongoose';


const cryptidSchema = new Schema({
    name: {
        type: String
    },
    location: {
        type: String
    },
    description: {
        type: String
    }

})

const Cryptid = model('Cryptid', cryptidSchema)

export default Cryptid
