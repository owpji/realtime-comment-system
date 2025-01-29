import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; // Import authOptions
import validator from 'validator'; // very important to validate the session data as well 
import xss from 'xss'; // strips any harmful html 
import Ably from 'ably';
import { v4 as uuidv4 } from 'uuid';
import { request } from "express";

export async function POST(req) {
  // Retrieve the session using getServerSession
  const session = await getServerSession(authOptions);

  // If no session, return an error response
  if (!session) {
    return new Response(
      JSON.stringify({ message: "Unauthorized" }),
      { status: 401 }
    );
  }

  // If there's a session, you can proceed with your logic
  const requestBody = await req.json(); // Get the body of the POST request
  
  // perform more logic like sanitizing user input from the message body...

  
  const msgtype = 'like';
  const name = session.user.name;
  const picture = session.user.image;
  const idd = uuidv4();
  const replyid = idd+'reply';
  const parentId = requestBody.commentId;


  const comment = {
    type: msgtype,
    id: idd, 
    reply: replyid,
    username: name,
    avi: picture,
    parentId: parentId
}
console.log(comment);
// checks for empty comment..
  
  // checks if all spaces..
  
  // check more stuff like the image links and more session info...

  

  // here we would continue with the logic of inserting to a database..
  // as well as sending it to realtime like ably or socket io 

  const ably = new Ably.Rest({ key: process.env.ABLY_API_KEY });

    // Get the channel you want to publish the message to
    const channel = ably.channels.get('channel1');

    // Publish the message to the channel
    await channel.publish('message', comment);
 
  
  // Example: Log the session info and request body
  console.log("Session:", session);

  // Process your request here (e.g., save data to the database)
  
  return new Response(
    JSON.stringify({ message: "Request processed successfully" }),
    { status: 200 }
  );
}
