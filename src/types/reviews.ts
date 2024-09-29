import { Cafe } from './index'
import { DocumentReference, FieldValue } from '@firebase/firestore'

export interface Review {
  cafe: Cafe
  createDate: string
  id: string
  review: ReviewBlog
  updateDate: string
}

export interface ReviewBlog {
  blocks: Block[]
  time: number
  version: string
}

export interface Block {
  data: Data
  type: string
}

export interface Data {
  level?: number
  text?: string
  caption?: string
  file?: File
  stretched?: boolean
  withBackground?: boolean
  withBorder?: boolean
}

export interface File {
  url: string
  date?: string
  name?: string
}

export interface ReviewsPayload
  extends Omit<Review, 'id' | 'cafe' | 'createDate' | 'updateDate'> {
  createDate?: FieldValue
  updateDate: FieldValue
  cafe: DocumentReference
}
