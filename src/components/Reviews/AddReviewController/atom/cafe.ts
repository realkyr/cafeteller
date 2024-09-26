import { atom } from 'jotai'
import { Cafe } from '@/types'

export const cafeAtom = atom<Partial<Cafe>>({})
