import { verifyWebhook } from '@clerk/nextjs/webhooks';
import { NextRequest } from 'next/server';
import { createUser } from '@/lib/actions/user.action';

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const { id } = evt.data;
    const eventType = evt.type;

    if (eventType === "user.created") {
      const {
        id,
        email_addresses,
        image_url,
        first_name,
        last_name,
        username,
      } = evt.data;

      const user = {
        clerkId: id,
        email: email_addresses[0]?.email_address || "",
        username: username || "",
        firstName: first_name || "",
        lastName: last_name || "",
        photo: image_url || "",
      };

      await createUser(user); 
    }

    console.log(` Webhook received: ID ${id}, type ${eventType}`);
    return new Response("Webhook received", { status: 200 });

  } catch (err) {
    console.error(" Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
