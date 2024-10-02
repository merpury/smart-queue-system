import mongoose, { Schema, Document } from 'mongoose';

interface IOrderItem {
  menu: string;
  img: string; // This will store the image URL
  quantities: number;
  price: number;
}

interface IOrder extends Document {
  name: string;
  queue: number;
  status: string;
  totalPrice: number;
  note: string;
  items: IOrderItem[];
  createdAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>({
  menu: { type: String, required: true },
  img: { type: String, required: true },
  quantities: { type: Number, required: true },
  price: { type: Number, required: true },
});

const OrderSchema = new Schema<IOrder>({
  name: { type: String, required: true },
  queue: { type: Number, default: 1 },
  status: { 
    type: String, 
    enum: ['Incomplete', 'complete'], 
    default: 'Incomplete' 
  },
  totalPrice: { type: Number, required: true },
  note: { type: String },
  items: { type: [OrderItemSchema], required: true },
  createdAt: { type: Date, default: Date.now },
});

OrderSchema.index({ createdAt: -1 }); // Ensure indexing for sorting by createdAt

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);