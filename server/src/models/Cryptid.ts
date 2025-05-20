// Mongoose model for Cryptid entries
import { Schema, model, type Document } from 'mongoose';

export interface CryptidDocument extends Document {

}

const cryptidSchema = new Schema<CryptidDocument>({

})

const Cryptid = model<CryptidDocument>('Cryptid', cryptidSchema)

export default Cryptid
