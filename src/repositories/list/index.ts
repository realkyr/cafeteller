import axios from '@/utils/axios'
import { AxiosResponse } from 'axios'
import { Cafe, Review } from '@/types'

export const getReviewsListRepo = async (
  update_date?: string
): Promise<
  AxiosResponse<{
    reviews: Review[]
  }>
> => {
  return axios.get('/reviews', {
    params: {
      update_date
    }
  })
}

export const getReviewsBannerRepo = async (): Promise<
  AxiosResponse<{
    recommend_cafes: Cafe[]
    latest_cafes: Cafe[]
  }>
> => {
  return axios.get('/banner')
}
