import React, { useState } from 'react'
import { Button, Col, Row, Skeleton } from 'antd'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'
import { IGPost, InstagramPostsResponse } from '@/components/Reviews/types'
import axios from 'axios'
import dynamic from 'next/dynamic'
import useSWR from 'swr'

const Card = dynamic(
  () => import('core_cafeteller/components').then((mod) => mod.Card),
  { ssr: false }
)

interface IgPostsProps {
  onSelect: (data: IGPost) => void
}

const IgPosts = ({ onSelect }: IgPostsProps) => {
  const [path, setPath] = useState('')
  const { data: posts, isLoading } = useSWR(['getIGPosts', path], () =>
    path
      ? getIGPosts(path)
      : getIGPosts(
          'https://graph.instagram.com/me/media?fields=thumbnail_url,id,caption,media_url,media_type,permalink&access_token=' +
            localStorage.getItem('access_token')
        )
  )
  const getIGPosts = async (path: string): Promise<InstagramPostsResponse> => {
    const posts = await axios.get(path)
    return posts.data
  }

  return (
    <Row>
      <Col
        xs={24}
        md={22}
        style={{ display: 'flex', justifyContent: 'flex-end' }}
      >
        <Button
          disabled={!posts || !posts.paging.previous}
          onClick={() =>
            posts?.paging.previous && setPath(posts.paging.previous)
          }
          icon={<LeftOutlined />}
        />
        <Button
          disabled={!posts || !posts.paging.next}
          onClick={() => posts?.paging.next && setPath(posts.paging.next)}
          icon={<RightOutlined />}
        />
      </Col>
      <Col span={24}>
        {isLoading || !posts ? (
          <Skeleton active paragraph={false} />
        ) : (
          <Row gutter={[16, 16]} style={{ marginTop: 10 }}>
            {posts.data.map((post: IGPost, i) => (
              <Col className='th' key={post.id} xs={12} md={6} lg={4}>
                <div onClick={() => onSelect(post)}>
                  <Card
                    className='cursor-pointer h-72'
                    src={
                      post.media_type === 'VIDEO'
                        ? post.thumbnail_url
                        : post.media_url
                    }
                    title={
                      post.caption && post.caption.split('\n')[0].slice(0, 15)
                    }
                    description={post.caption && post.caption.slice(0, 40)}
                  />
                </div>
              </Col>
            ))}
          </Row>
        )}
      </Col>
    </Row>
  )
}

export default IgPosts
