
const mongoos = require("mongoose");

const bookingSchema = new mongoose.Schema(
    {
        bookingCode:{type:String, required:true, unique:true},

        customer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

        serviceName: { type: String, required: true },

        category: { type: String, required: true },

        address: { type: String, required: true },

        location: { lat: Number, lng: Number },

        scheduledAt: { type: Date, required: true },

        estimatedHours: { type: Number, default: 1 },
        status: {
      type: String,
      enum: ["Pending", "Confirmed", "Assigned", "In Progress", "Completed"],
      default: "Pending",
    },
    assignedEmployee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    customerNote: { type: String },
  },

{ timestamps: true }
    
)

module.exports = mongoose.models.Booking || mongoose.model("Booking", bookingSchema);