import express from "express";
import cors from "cors";
import authRouter from "./auth/authRouter";
import videoRouter from "./videoFile/videoRoute"

import path from "path";
import bodyParser from "body-parser";
// import likeRouter from "./like/likeRoute";
import historyRoutes from "./history/historyRoute"
import watchLaterRoutes from "./watchLater/watchLaterRoute";
import commentRoutes from "./comment/commentRoute";
import VideolikeRoute from "./VideoLike/route";





const app = express();

app.use(cors());
app.use(express.json());
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb"}));
app.use("/uploads", express.static(path.join("uploads")));

app.use(bodyParser.json()); 



app.use("/api/user", authRouter)
app.use("/api/video", videoRouter)
// app.use("/api/like", likeRouter )
app.use("/api/history", historyRoutes)
app.use("/api/watchlater", watchLaterRoutes)
app.use("/api/comment", commentRoutes)
app.use("/api/reaction", VideolikeRoute)



export default app;
