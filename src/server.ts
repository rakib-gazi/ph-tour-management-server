/* eslint-disable no-console */
import { Server } from "http";
import app from "./app";
import mongoose from "mongoose";
import { envVars } from "./app/config/env";
let server: Server;
const port = envVars.PORT || 5000;
async function bootstrap() {
  try {
    await mongoose.connect(
      `mongodb+srv://${envVars.DB_USER}:${envVars.DB_PASS}@cluster0.whnyl.mongodb.net/${envVars.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`
    );
    console.log(`mongodb+srv://${envVars.DB_USER}:${envVars.DB_PASS}@cluster0.whnyl.mongodb.net/${envVars.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`);
    server = app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
bootstrap();
process.on("unhandledRejection", (err)=>{
  console.log("unhandeled Rejection . server shutting down", err);
  if(server){
    server.close(()=>{
      process.exit(1);
    });
    
  }
  process.exit(1);
})
process.on("uncaughtException", (err)=>{
  console.log("unCaught  Rejection . server shutting down", err);
  if(server){
    server.close(()=>{
      process.exit(1);
    });
    
  }
  process.exit(1);
})

// Promise.reject(new Error ("uncaut from reject"))
// throw new Error ("i fot throw")
process.on("SIGTERM", (err)=>{
  console.log("Sigterm signal . server shutting down", err);
  if(server){
    server.close(()=>{
      process.exit(1);
    });
    
  }
  process.exit(1);
})



