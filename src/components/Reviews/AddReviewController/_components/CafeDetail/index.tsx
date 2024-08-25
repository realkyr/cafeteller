import React from 'react'
import { Input, Select } from 'antd'
import { Cafe } from '@/types'
import { ContactInfo } from '@/components/Reviews/AddReviewController/_components/AddReview.style' // Replace with your actual imports

const { TextArea } = Input
const { Option } = Select

type ContactItem = {
  name: string
  icon: string
  input: React.ReactNode
}

type Props = {
  cafe: Partial<Cafe>
  setCafe: (data: Partial<Cafe>) => void
  tags: { key: number; value: string }[]
}

const CafeDetail = ({ cafe, setCafe, tags }: Props) => {
  const handleChange = (key: keyof Cafe, value: any) => {
    setCafe({ [key]: value })
  }

  const contact: ContactItem[] = [
    {
      name: 'Open Hour',
      icon: '/assets/Images/icon/Open hours.png',
      input: (
        <Input
          placeholder='10.00 - 12.00 น. ทุกวัน'
          value={cafe.openhour}
          onChange={(e) => handleChange('openhour', e.target.value)}
        />
      )
    },
    {
      name: 'parking',
      icon: '/assets/Images/icon/Parking.png',
      input: (
        <TextArea
          value={cafe.parking}
          placeholder='จอดรถได้หน้าร้าน 10 คัน'
          onChange={(e) => handleChange('parking', e.target.value)}
        />
      )
    },
    {
      name: 'call',
      icon: '/assets/Images/icon/Call.png',
      input: (
        <Input
          value={cafe.phone}
          placeholder='0945587588'
          onChange={(e) => handleChange('phone', e.target.value)}
        />
      )
    },
    {
      name: 'address detail',
      icon: '/assets/Images/icon/Address.png',
      input: (
        <TextArea
          value={cafe.details}
          placeholder='32/98 หมู่บ้านแกรนด์วิลล์ กรุงเทพ 10250'
          onChange={(e) => handleChange('details', e.target.value)}
        />
      )
    },
    {
      name: 'landmark',
      icon: '/assets/Images/icon/Location.png',
      input: (
        <Input
          value={cafe.landmark}
          placeholder='หอนาฬิกาหน้าหมู่บ้าน'
          onChange={(e) => handleChange('landmark', e.target.value)}
        />
      )
    },
    {
      name: 'tags',
      icon: '/assets/Images/icon/Tag-info.png',
      input: (
        <Select
          style={{ width: '100%' }}
          showSearch
          allowClear
          value={cafe.tags}
          mode='multiple'
          onChange={(tags) => handleChange('tags', tags)}
        >
          {tags.map((type) => (
            <Option key={type.key} value={type.value}>
              {type.value}
            </Option>
          ))}
        </Select>
      )
    },
    {
      name: 'ig',
      icon: '/assets/Images/icon/Social/IG.png',
      input: (
        <Input
          value={cafe.ig}
          placeholder='https://www.instagram.com/cafeteller'
          onChange={(e) => handleChange('ig', e.target.value)}
        />
      )
    },
    {
      name: 'fb',
      icon: '/assets/Images/icon/Social/FB.png',
      input: (
        <Input
          value={cafe.fb}
          placeholder='https://www.facebook.com/cafeteller'
          onChange={(e) => handleChange('fb', e.target.value)}
        />
      )
    },
    {
      name: 'tw',
      icon: '/assets/Images/icon/Social/Twitter.png',
      input: (
        <Input
          value={cafe.tw}
          placeholder='https://twitter.com/CAFETELLER'
          onChange={(e) => handleChange('tw', e.target.value)}
        />
      )
    },
    {
      name: 'description',
      icon: '/assets/Images/icon/description.png',
      input: (
        <TextArea
          value={cafe.description}
          placeholder='ไคเชน คาเฟ่ใหม่ ย่านเกษตรนวมินทร์ที่มาพร้อมกับสโลว์แกน Rich & Tasty ซึ่งตัวร้าน การนำเสนอทุกๆอย่างสอดคล้องกับสโลแกนนี้ทั้งหมด ตั้งแต่ก้าวเข้าร้านเลย ต้องบอกว่าร้านสวยมาก ดีไซน์ การเล่นสี ดีเทลยืนหนึ่งเลยจริงๆ'
          onChange={(e) => handleChange('description', e.target.value)}
        />
      )
    }
  ]

  return (
    <ContactInfo>
      {contact.map((item) => (
        <div className='flex my-2 items-center gap-2' key={item.name}>
          <img className='w-8 h-8' src={item.icon} alt={item.name} />
          {item.input}
        </div>
      ))}
    </ContactInfo>
  )
}

export default CafeDetail
