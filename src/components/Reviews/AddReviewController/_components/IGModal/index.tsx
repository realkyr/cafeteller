import React from 'react'
import { Instagram } from '@/icons'
import { Button } from '@/components/ui/MF'
import { Modal } from 'antd'
import IGPosts from '@/components/Reviews/AddReviewController/_components/IGModal/IGPosts'
import { IGPost } from '@/components/Reviews/types'

interface IgModalProps {
  onSelect: (data: IGPost) => void
}

const IGModal = ({ onSelect }: IgModalProps) => {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        className='bg-pink-600 hover:bg-pink-700 text-white inline-flex items-center'
      >
        <Instagram className='mr-2' />
        Load Post From Instagram
      </Button>

      <Modal
        footer={null}
        width='90vw'
        open={open}
        onCancel={() => setOpen(false)}
        onClose={() => setOpen(false)}
      >
        <IGPosts
          onSelect={(select) => {
            onSelect(select)
            setOpen(false)
          }}
        />
      </Modal>
    </>
  )
}

export default IGModal
