const Hotel = require('../models/hotel');

exports.getHotels = (req, res) => {
  Hotel.find()
  .then(hotel=>{
    res.render('index/hotels', {
      title_name: 'Hotels',
      hotels: hotel
    });
  }).catch(err => {
    console.log(err)
    return  res.redirect("/")
  })
};

exports.getAddHotel = (req, res) => {
    res.render('index/add_hotel', {
      title_name: 'Add Hotel'
    });
};


exports.getSingleHotel = (req, res) => {
    Hotel.findById(req.params.hotelId)
    .then(hotel=>{
      if(!hotel){
          return res.redirect('/404')
      }  
      res.render('index/hotel_detail', {
        title_name:hotel.firstName,
        hotel: hotel
      });
    }).catch(err => {
      console.log(err)
      return  res.redirect("/")
    })
  };


  exports.deleteSingleHotel = (req, res) => {
    Hotel.findByIdAndRemove(req.body.hotelId)
    .then(()=>{
        return res.redirect("/");
      }).catch(err=>{
        console.log(err)
        return res.redirect("/404")
      })
  };


  exports.postNewHotel = (req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const roomType = req.body.roomType;
    const comment = req.body.comment;
    const dinner = req.body.dinner === "yes"? true : false;
    const paymentMethod = req.body.paymentMethod
    
    const hotel = new Hotel({firstName,lastName,roomType,comment,dinner,paymentMethod})

    hotel.save().then(()=>{
       return res.redirect("/");
    }).catch(err=>{
        console.log(err)
        return res.redirect("/404")
    })
  }  


  exports.getEditHotel = (req, res) => {
    const hotelId = req.params.hotelId;
    Hotel.findById(hotelId)
      .then(hotel => {
        if (!hotel) {
          return res.redirect('/404');
        }
        res.render('index/edit_hotel', {
          title_name: 'Edit reserved room',
          hotel: hotel
        });
      })
      .catch(err => {
         console.log(err)
         return res.redirect('/404');
      });
  };
  


  exports.postEditHotel = (req, res) => {

    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const roomType = req.body.roomType;
    const comment = req.body.comment;
    const dinner = req.body.dinner === "yes"? true : false;
    const paymentMethod = req.body.paymentMethod
  
    Hotel.findById(req.params.hotelId)
      .then(hotel => {
        if (!hotel) {
          return res.redirect('/404');
        }
        hotel.firstName = firstName;
        hotel.lastName = lastName;
        hotel.roomType = roomType;
        hotel.comment = comment;
        hotel.dinner = dinner;
        hotel.paymentMethod = paymentMethod;
  
        return hotel.save().then(result => {
          res.redirect('/');
        });
      })
      .catch(err =>{
          console.log(err);
        return res.redirect('/404');
      });
  };

