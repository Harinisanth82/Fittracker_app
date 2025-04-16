import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createError } from "../error.js";
import User from "../Models/User.js";
import Workout from "../Models/Workout.js";

dotenv.config();

export const UserRegister=async(req,res,next)=>{
    try{
        const {email,password,name,img}=req.body;
        const existingUser=await User.findOne({email}).exec();
        if(existingUser){
            return next(createError(409,"Email is already in use"));
        }
        
        const salt=bcrypt.genSaltSync(10);
        const hashedPassword=bcrypt.hashSync(password,salt);
        const user = new User({
            name,
            email,
            password:hashedPassword,
            img,
        });
        const createdUser=await user.save();
        const token = jwt.sign({ id: createdUser._id }, process.env.JWT, {
            expiresIn: "9999 years",
        });
        return res.status(200).json({token,user});
    }
    catch(err){
        next(err);
    }
}
export const UserLogin=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email}).exec();
        if(!user){
            return next(createError(404,"User is Not Found"));
        }
        const isPasswordCorrect=bcrypt.compareSync(password,user.password);
        if(!isPasswordCorrect){
            return next(createError(403,"Incorrect Password"));
        }
        
        const token = jwt.sign({ id: user._id }, process.env.JWT, {
            expiresIn: "9999 years",
        });
        return res.status(200).json({token,user});
    }
    catch(err){
        next(err);
    }
}

export const getUserDashboard = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const currentDateFormatted = new Date();
    const startToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate()
    );
    const endToday = new Date(
      currentDateFormatted.getFullYear(),
      currentDateFormatted.getMonth(),
      currentDateFormatted.getDate() + 1
    );

    const totalCaloriesBurnt = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      {
        $group: {
          _id: null,
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    const totalWorkouts = await Workout.countDocuments({
      user: userId,
      date: { $gte: startToday, $lt: endToday },
    });

    const avgCaloriesBurntPerWorkout =
      totalCaloriesBurnt.length > 0
        ? totalCaloriesBurnt[0].totalCaloriesBurnt / totalWorkouts
        : 0;

    const categoryCalories = await Workout.aggregate([
      { $match: { user: user._id, date: { $gte: startToday, $lt: endToday } } },
      {
        $group: {
          _id: "$category",
          totalCaloriesBurnt: { $sum: "$caloriesBurned" },
        },
      },
    ]);

    const pieChartData = categoryCalories.map((category, index) => ({
      id: index,
      value: category.totalCaloriesBurnt,
      label: category._id,
    }));

    const weeks = [];
    const caloriesBurnt = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(
        currentDateFormatted.getTime() - i * 24 * 60 * 60 * 1000
      );
      weeks.push(`${date.getDate()}th`);

      const startOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
      );
      const endOfDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1
      );

      const weekData = await Workout.aggregate([
        {
          $match: {
            user: user._id,
            date: { $gte: startOfDay, $lt: endOfDay },
          },
        },
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
            totalCaloriesBurnt: { $sum: "$caloriesBurned" },
          },
        },
        {
          $sort: { _id: 1 }, 
        },
      ]);

      caloriesBurnt.push(
        weekData[0]?.totalCaloriesBurnt ? weekData[0]?.totalCaloriesBurnt : 0
      );
    }

    return res.status(200).json({
      totalCaloriesBurnt:
        totalCaloriesBurnt.length > 0
          ? totalCaloriesBurnt[0].totalCaloriesBurnt
          : 0,
      totalWorkouts: totalWorkouts,
      avgCaloriesBurntPerWorkout: avgCaloriesBurntPerWorkout,
      totalWeeksCaloriesBurnt: {
        weeks: weeks,
        caloriesBurned: caloriesBurnt,
      },
      pieChartData: pieChartData,
    });
  } catch (err) {
    next(err);
  }
};
export const getWorkoutsByDate = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const user = await User.findById(userId);
    let date = req.query.date ? new Date(req.query.date) : new Date();
    if (!user) {
      return next(createError(404, "User not found"));
    }
    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    const todaysWorkouts = await Workout.find({
      user: userId,
      date: { $gte: startOfDay, $lt: endOfDay },
    });
    const totalCaloriesBurnt = todaysWorkouts.reduce(
      (total, workout) => total + workout.caloriesBurned,
      0
    );

    return res.status(200).json({ todaysWorkouts, totalCaloriesBurnt });
  } catch (err) {
    next(err);
  }
};
export const addWorkout = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    const { workoutString } = req.body;

    if (!workoutString || !workoutString.trim()) {
      return next(createError(400, "Workout string is missing"));
    }
    const lines = workoutString
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    const workouts = [];
    let i = 0;

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);

    while (i < lines.length) {
      if (!lines[i].startsWith("#")) {
        return next(createError(400, `Workout at line ${i + 1} must start with '#'`));
      }

      if (i + 4 >= lines.length) {
        return next(createError(400, `Workout block starting at line ${i + 1} is incomplete`));
      }
      const category = lines[i].substring(1).trim();
      const workoutName = lines[i + 1];
      const setsReps = lines[i + 2];
      const weightRaw = lines[i + 3];
      const durationRaw = lines[i + 4];

      const [setsStr, repsStr] = setsReps.split("X").map((s) => s.trim());
      const sets = parseInt(setsStr);
      const reps = parseInt(repsStr);
      const weight = parseFloat(weightRaw.replace("kg", "").trim());
      const duration = parseFloat(durationRaw.replace("min", "").trim());

      if (isNaN(sets) || isNaN(reps) || isNaN(weight) || isNaN(duration)) {
        return next(createError(400, `Invalid numbers in workout starting at line ${i + 1}`));
      }
      const existingWorkout = await Workout.findOne({
        user: userId,
        workoutName,
        date: { $gte: startOfDay, $lt: endOfDay },
      });

      if (existingWorkout) {
        i += 5;
        continue;
      }
      const caloriesBurned = duration * 5 * weight;
      const workout = new Workout({
        user: userId,
        category,
        workoutName,
        sets,
        reps,
        weight,
        duration,
        caloriesBurned,
        date: now,
      });
      await workout.save();
      workouts.push(workout);
      i += 5;
    }
    return res.status(201).json({
      message: "Workouts added successfully",
      workouts,
    });
  } catch (err) {
    next(err);
  }
};