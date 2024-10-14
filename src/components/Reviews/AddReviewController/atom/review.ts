import { atom } from 'jotai/index'
import { Review } from '@/types'

export const reviewAtom = atom<Partial<Review>>({})
