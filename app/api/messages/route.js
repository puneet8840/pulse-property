import connectDb from "../../../config/database";
import { getUserSession } from "../../../utils/getUserSession";
import Message from "../../../models/Messages";
import propertymodel from "../../../models/Property";

export const dynamic = "force-dynamic";

export const GET = async (request) => {
  try {
    await connectDb();
    const sessionUser = await getUserSession();
    if (!sessionUser || !sessionUser.user)
      return new Response(JSON.stringify({ message: "you must logged in" }), {
        status: 401,
      });
    const unread_messages = await Message.find({
      receipient: sessionUser.userId,
      read: false,
    })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");
    const read_messages = await Message.find({
      receipient: sessionUser.userId,
      read: true,
    })
      .sort({ createdAt: -1 })
      .populate("sender", "username")
      .populate("property", "name");

    const session_messages = [...unread_messages, ...read_messages];
    return new Response(JSON.stringify(session_messages), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    });
  }
};

export const POST = async (request) => {
  try {
    await connectDb();
    const sessionUser = await getUserSession();
    if (!sessionUser || !sessionUser.user)
      return new Response(JSON.stringify({ message: "you must logged in" }), {
        status: 401,
      });
    const { name, email, phone, recepient, property, message } =
      await request.json();
    if(sessionUser.user.id.toString()===recepient.toString()) return new Response(JSON.stringify({message:'cannot send message to self'}),{status:400})
    const newMessage = new Message({
      sender: sessionUser.user.id,
      name,
      email,
      phone,
      recepient,
      body: message,
      property,
    });
    await newMessage.save();

    return new Response(
      JSON.stringify({ message: "message sent successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ message: "internal server error" }), {
      status: 500,
    });
  }
};
