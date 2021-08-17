const router = require("express").Router();
const { Workout } = require("../models/index.js");

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
router.get('/workouts/range', (req, res) => {
    Workout.aggregate([
        {
            $addFields: {
                totalDuration:
                {
                    $sum:
                        '$exercises.duration'
                }
            }
        },
        {
            $sort:
            {
                day: -1
            }
        },
        {
            $limit: 7
        }
    ])
        .then(dbWorkout => {
            dbWorkout = dbWorkout.reverse()
            res.json(dbWorkout)
        })
        .catch(err => {
            res.json(err)
        })
})

// router.post("/workouts", (req, res) => {
//     Workout.create({})
//         .then(dbWorkout => {
//             res.json(dbWorkout);
//         })
//         .catch(err => {
//             res.json(err);
//         });
// });

router.post('/workouts', async (req, res) => {
    var body = req.body;
    try{
      var data = await Workout.create(body)
      res.json(data)
    }
    catch (err) {
      res.json(err)
    }
  })

router.put("/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        params.id,
        { $push: { exercises: body } },
        { new: true }
    )
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});


module.exports = router;