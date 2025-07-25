const Listing = require("../models/listing");
const Review = require("../models/review");
module.exports.createReview = async(req,res)=>{ // validatereview passed as a middleware 
    let listing= await Listing.findById(req.params.id);
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
    listing.reviews.push(newReview);
    await newReview.save();
    if (!listing.owner) {
    listing.owner = req.user._id; // or fetch from DB if needed
}
await listing.save();

    req.flash("success","New Review Created!");
    res.redirect(`/listings/${listing._id}`);

};

module.exports.destroyReview = async(req,res)=>{
    let{id, reviewId}= req.params;
    await Listing.findByIdAndUpdate(id,{$pull: {reviews : reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash("success","review deleted!");
    res.redirect(`/listings/${id}`);
};