// References: https://github.com/kentcdodds/kentcdodds.com/blob/024b966a43fbe1aebdfaa36e89d178ca5d6813aa/app/convertkit/convertkit.server.ts
const CONVERT_KIT_API_KEY = process.env.CONVERT_KIT_API_KEY

export type ConvertKitSubscriber = {
  id: number
  first_name: string
  email_address: string
  state: "active" | "inactive"
  created_at: string
  fields: Record<string, string | null>
}

async function addSubscriberToForm({
  email,
  firstName,
  phone,
  brand,
  websiteOrFanpage,
  convertKitFormId,
}: {
  email: string
  firstName: string
  phone: string
  brand: string
  websiteOrFanpage: string
  convertKitFormId: string
}) {
  const subscriberData = {
    api_key: CONVERT_KIT_API_KEY,
    first_name: firstName,
    email,
    fields: {
      phone,
      brand,
      website_fanpage: websiteOrFanpage,
    },
  }

  // this is a basic form that doesn't really do anything. It's just a way to
  // get the users on the mailing list
  const response = await fetch(
    `https://api.convertkit.com/v3/forms/${convertKitFormId}/subscribe`,
    {
      method: "post",
      body: JSON.stringify(subscriberData),
      headers: { "Content-Type": "application/json" },
    },
  )
  const json = (await response.json()) as {
    subscription: { subscriber: ConvertKitSubscriber }
  }
  return json.subscription.subscriber
}

export { addSubscriberToForm }
