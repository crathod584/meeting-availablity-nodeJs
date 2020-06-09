const AddAvailabilityModel = require('./model/addAvailability.model').Availability;
const moment = require('moment');

/**
* @method addUserAvailability
* @param req
* @param res
* @desc Add User Availablity 
*/
exports.addUserAvailability = (req,res) => {
    if(req.body){
        const add = new AddAvailabilityModel(req.body);
        return add.save().then((result) => {
            res.status(201).send(result);
        },err => res.send(err.message));    
    }else{
        res.json({ status: "failed", message: "no data found" });
    }    
};

/**
* @method getUserAvailability
* @param req
* @param res
* @desc get User Availablity By userId
*/
exports.getUserAvailability = (req, res) => {
  let userId = req.query.userId;
  if(userId){
    AddAvailabilityModel.find({userId:userId}).exec((err, result) => {
        if (err){
          res.status(err.status).send(err);
        }else{
           mergeRanges(result).then(data => {
             res.status(200).send(data);
            }).catch(err => {
              res.send(err);
            });
        }
      });
  }else{
    res.json({status: "failed", message: "failed to get User Availability"});
  }
};

/**
* @method mergeRanges
* @param availability (array of meeting - availablity)
* @desc return single and merged availablity
*/
const mergeRanges = (availability) => {
  return new Promise((resolve, reject) => {
    // variable to split continuous availablity in to days 
    let splitBydate = [];

    // sort by start times
    let sortedAvailability = availability.slice().sort((a, b) => {
      return a.startTime > b.startTime ? 1 : -1;
    });
    
    // initialize mergedAvailability
    let mergedAvailability = [sortedAvailability[0]];

    for (let i = 1; i < sortedAvailability.length; i++) {

        let currentMeeting    = sortedAvailability[i];
        let lastMergedMeeting = mergedAvailability[mergedAvailability.length - 1];

        // if the last Availability and current overlap, we will use the latest end time
        if (currentMeeting.startTime <= lastMergedMeeting.endTime)
            lastMergedMeeting.endTime = Math.max(lastMergedMeeting.endTime, currentMeeting.endTime);
        else
            mergedAvailability.push(currentMeeting);//add the current meeting because it is not overlaping
        
     }
    
    // each day availablity insted of single availablity  
    for (let i = 0; i < mergedAvailability.length; i++) {
     let dayDiff = moment(mergedAvailability[i].endTime).diff(moment(mergedAvailability[i].startTime), 'days'),
         start = new Date(mergedAvailability[i].startTime),
         end = new Date(mergedAvailability[i].endTime),
         j= 0;

      while(start < end && dayDiff > 1){
        let date = moment(start).startOf('day'), tempObj;
       
        if(j == 0){
          mergedAvailability.splice(i, 1);
          tempObj = { 
            endTime: date,
            startTime:moment(start),
            userId: mergedAvailability[i].userId
          }
        }else if(j == dayDiff){
          tempObj = { 
            endTime: moment(start),
            startTime:date,
            userId: mergedAvailability[i].userId
          }
        }else{
          tempObj = { 
            endTime: date,
            startTime:date,
            userId: mergedAvailability[i].userId
          }
        }
        j++;
        splitBydate.push(tempObj);
        let newDate = start.setDate(start.getDate() + 1);
        start = new Date(newDate);  
      }
    }
    
    // sort array by startTime
    let userAvailability = [...mergedAvailability,...splitBydate].slice().sort((a, b) => {
      return a.startTime > b.startTime ? 1 : -1;
    });
       
     resolve(userAvailability);
  });
}
