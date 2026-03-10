import config from "@payload-config"
import { getPayload as _getPayload } from "payload"

let payloadInstance: Awaited<ReturnType<typeof _getPayload>> | null = null

export const getPayload = async () => {
  if (payloadInstance) return payloadInstance
  payloadInstance = await _getPayload({ config })
  return payloadInstance
}
