import mongoose, { Schema, Document } from 'mongoose';

interface IOrderItem {
  menu: string;
  img: string; // This will store the image URL
  quantities: number;
  price: number;
}

export interface IOrder extends Document {
  name: string;
  items: IOrderItem[];
  totalPrice: number;
  note: string;
  createdAt: Date;
  status: string; // New field for status
}

const OrderItemSchema = new Schema<IOrderItem>({
  menu: { type: String, required: true },
  img: { type: String, required: true },
  quantities: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>({
  name: { type: String, required: true },
  items: { type: [OrderItemSchema], required: true },
  totalPrice: { type: Number, required: true },
  note: { type: String },
  createdAt: { type: Date, default: Date.now },
  status: { 
    type: String, 
    enum: ['ACTIVE', 'COMPLETED'], 
    default: 'ACTIVE' 
  }, // New field for status with default value
});

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);


// import mongoose from 'mongoose';

// const orderItemSchema = new mongoose.Schema({
//   menu: { type: String, required: true },
//   img: { type: String, required: true },
//   quantities: { type: Number, required: true, min: 1 },
//   price: { type: Number, required: true, min: 0 }
// });

// const orderSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   items: { type: [orderItemSchema], required: true },
//   totalPrice: { type: Number, required: true, min: 0 },
//   note: { type: String, default: '' },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// export default mongoose.models.Order || mongoose.model('Order', orderSchema);

// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//   name: { type: String, required: true }, // New field for the order name
//   menu: { type: [String], required: true },
//   img: { type: [String], required: true },
//   quantities: { type: Number, required: true },
//   totalPrice: { type: Number, required: true },
//   note: { type: String, default: '' },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// export default mongoose.models.Order || mongoose.model('Order', orderSchema);

// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//   menu: [String],        // หลายเมนู
//   img: [String],         // หลายรูป
//   quantities: Number,
//   totalPrice: Number,
//   note: String,
//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// export default mongoose.models.Order || mongoose.model('Order', orderSchema);



// import mongoose from 'mongoose';

// const orderSchema = new mongoose.Schema({
//     menu: [String],
//     img: [String],
//     quantities: Number,
//     totalPrice: Number,
//     note: String,
//     createdAt: {
//       type: Date,
//       default: Date.now
//     }
//   });
// export default mongoose.models.Order || mongoose.model('Order', orderSchema);