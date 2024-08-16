import { Cafe, Review } from '@/types'
import { getReviewsBannerRepo, getReviewsListRepo } from '@/repositories/list'

export const getReviewsService = async (
  update_date?: string
): Promise<Review[]> => {
  const { data } = await getReviewsListRepo(update_date)

  return data.reviews
}

export const getReviewsBanner = async (): Promise<Cafe[]> => {
  const response = await getReviewsBannerRepo()
  const recommendedCafes = response.data.recommend_cafes || []
  const latestCafes = response.data.latest_cafes || []

  return [...recommendedCafes, ...latestCafes]
}
