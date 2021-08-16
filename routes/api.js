const router = require("express").Router();
const {Workout} = require("../models/index.js");

router.get("/workouts", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration:
                {
                    $sum:
                        "$exercises.duration"
                }
            }
        }
    ])
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
})

router.get("/workouts/range", (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration:
                {
                    $sum:
                        "$exercises.duration"
                }
            }
        }
    ])
        .limit(7)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
})

  router.post("/workouts", ({ body }, res) => {
    Workout.create(body)
      .then(dbWorkout => {
        res.json(dbWorkout);
      })
      .catch(err => {
        res.json(err);
      });
  });

  router.put('/workouts/:id', (req, res) => {
    var id = req.params.id
    var body = req.body
    Workout.create({exercises: body})
    .then(data => {
      // console.log(data)
      res.json(data)
    })
    .catch(err => {
      // console.log(err)
      res.json(err)
    })
  })


//   router.put("/workouts/:id", function({body,params}, res) {
//       console.log("inside the put route")
//     db.findOneAndUpdate({ _id: params.id },{$push: { exercises: body }})
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.json(err);
//     });

// });


  module.exports = router;