import React from 'react'
import { Image, Typography } from 'antd'
import styled from 'styled-components'

const { Title } = Typography

const TitlePattern = styled.div<{ img: string }>`
  border-bottom: 0;
  height: 100px;
  background-image: url(${(props) => props.img});
  background-size: 100%;
  width: 30%;
  @media (min-width: 768px) {
    display: none;
  }
`
const TitleBox = styled.div`
  display: flex;
  height: 40px;
  align-items: center;
  place-content: space-between;
  margin: 0 0 30px 0;
`

interface BlockData {
  text?: string
  file?: {
    url: string
  }
  caption?: string
}

interface Block {
  type: 'header' | 'paragraph' | 'image' | string
  data: BlockData
}

interface GenerateContentProps {
  cafetellerVersion?: string
  blocks: Block[]
}

const useGenerateContent = ({
  cafetellerVersion = 'v1',
  blocks
}: GenerateContentProps) => {
  const [content, setContent] = React.useState<React.ReactNode[]>([])

  React.useEffect(() => {
    setContent(generateContent(blocks))
  }, [])

  const generateContent = (blocks: Block[]): React.ReactNode[] => {
    let raw: React.ReactNode[] = []
    let consecImage = 0

    blocks.forEach((block, index) => {
      switch (block.type) {
        case 'header':
          const headerContent = generateHeader(block, index)
          raw = [...raw, ...headerContent]
          consecImage = 0
          break
        case 'paragraph':
          raw.push(<p key={index}>{block.data.text || ''}</p>)
          consecImage = 0
          break
        case 'image':
          const imageContent = generateImage(block, index, raw, consecImage)
          raw = imageContent.raw
          consecImage = imageContent.consecImage
          break
        default:
          raw.push(<p key={index}>{block.data.text || ''}</p>)
          consecImage = 0
      }
    })

    return raw
  }

  const generateHeader = (block: Block, index: number): React.ReactNode[] => {
    const fullCafeName = block.data.text || ''
    const [cafeName, cafeArea] = fullCafeName.split('—')
    return [
      <Title key={index} level={2} className='article-header'>
        {cafeName}
      </Title>,
      <TitleBox key={index + 'l'}>
        <TitlePattern key={0} img={'/assets/Images/pattern4.jpg'} />
        <Title level={4} className='article-header'>
          {cafeArea}
        </Title>
        <TitlePattern key={1} img={'/assets/Images/pattern4.jpg'} />
      </TitleBox>
    ]
  }

  const generateImage = (
    block: Block,
    index: number,
    raw: React.ReactNode[],
    consecImage: number
  ): { raw: React.ReactNode[]; consecImage: number } => {
    const image = (
      <Image
        key={consecImage + 'img'}
        height={'100%'}
        width={'100%'}
        className='res-img'
        onError={(e) => {
          ;(e.target as HTMLImageElement).onerror = null
          ;(e.target as HTMLImageElement).src = '/assets/Images/placeholder.png'
        }}
        src={block.data.file?.url || ''}
        fallback='/assets/Images/placeholder.png'
        preview={false}
        placeholder={
          <Image
            key={consecImage}
            height={'100%'}
            width={'100%'}
            className='res-img'
            src={'/assets/Images/placeholder.png'}
            preview={false}
          />
        }
      />
    )

    let caption: React.ReactNode = ''
    if (block.data.caption) {
      caption = <div className='caption'>{block.data.caption}</div>
    }
    consecImage++

    if (consecImage < 2) {
      raw.push(
        <div className='image-container' key={index}>
          <div className='content-wrap'>
            <div className='image-container-img'>
              <div className='caption-border'>{[image]}</div>
            </div>
            <div className='caption-wrap'>{[caption]}</div>
          </div>
        </div>
      )
    } else {
      raw[raw.length - 1] = (
        <div className='image-container-2' key={index}>
          {(raw[raw.length - 1] as React.ReactElement).props.children}
          <div className='divide-image'></div>
          <div className='content-wrap'>
            <div className='image-container-img'>
              <div className='caption-border'>{[image]}</div>
            </div>
            <div className='caption-wrap'>{[caption]}</div>
          </div>
        </div>
      )
      consecImage = 0
    }

    return { raw, consecImage }
  }

  return { content }
}

export default useGenerateContent
