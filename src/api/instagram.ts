import { fetchAction } from './'

export const getInstagramFeedAction = async (token: string) => {
  const response = await fetchAction(
    'GET',
    `/media?fields=media_url,thumbnail_url,permalink,media_type&access_token=${token}`,
    null,
    'instagram'
  )
  return response
}
