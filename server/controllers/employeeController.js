
const Bokking = require("../dev-stubs/Booking");

const todayRange =()=>{
    const start = new Date();
    start.setHours(0,0,0,0);
    const end = new Date(start);
    end.setDate(end.getDate()+1);
    return{start,end};
};

exports.getMyBookings = async (req,res)=>{
    try{
        const filter = req.query.filter||"today";
        
        if(!["today", "upcimming", "all"] .includes(filter)){
            return res.status(400).json({message:"filter must be today, upcoming or all"});
        }

        const {start, end} = todayRange();

        const  query ={
            assignedEmployee:req.user._id,
            status:{$in:["Assingned","In Progress","Completed"]},
        };

        if(filter ==="today") query.sheduledAt={$gte:start, $lt:end};

        if (filter === "upcoming") query.scheduledAt = { $gte: end };


        const bookings = await Booking.find(query)
        .populate("customer","name phone")
        .sort({sheduledAt:1});

        const completed = bookings.filter((b)=> b.status ==="Completed").length;
        const inProgress = bookings.filter((b)=> b.status ==="In progress").length;

        res.json({
            filter,
            summary:{
                total:bookings.length,completed,inProgress,
                remaining:booking.length - completed,

            },
            bookings,
        });
    } catch(err){
        console.error(err);
        res.status(500),json({message:"server error"});
    }
};