import { PORTAL_BASE_URL, TSOFT_BASE_URL, AUTH_HEADER } from 'config'

const services: { [index: string]: string } = {
  portal: PORTAL_BASE_URL,
  tsoft: TSOFT_BASE_URL,
}

export const fetchAction = async (
  method: string,
  url: string,
  body: any = null,
  service = 'portal'
): Promise<any> => {
  let requestOptions: any = {
    method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'auth': AUTH_HEADER,
    },
  }
  if (body) {
    requestOptions = { ...requestOptions, body: JSON.stringify(body) }
  }

  try {
    const response = await fetch(`${services[service]}${url}`, requestOptions)
    const resp =
      response.status < 500
        ? await response.json()
        : { error: response.statusText }

    return resp
  } catch (error) {
    return null
  }
}

export default fetchAction
